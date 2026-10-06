import { base } from '$app/paths';
import type {
    BackendRequestSignature, BackendResponseSignature, ChasterOAuthConnection, ChasterOAuthCredentials,
} from './signature-backend';

const databaseUtilitiesURL = 'https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/database_utilities';
// Public anon key, never a service-role key or OAuth client secret.
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4';
const oauthStateKey = 'chaster-oauth-state';
type OAuthAction = keyof BackendRequestSignature['database_utilities'];
export type SessionTokenKind = 'main' | 'configuration';

// Credentials are only for an extension's authenticated status lookup.
export function statusCredentials(token: string, kind: SessionTokenKind): ChasterOAuthCredentials {
    if (!token) throw new Error('No extension session is available for checking connection status.');
    return kind === 'main' ? { mainToken: token } : { configToken: token };
}

export async function invokeChasterOAuth<Action extends OAuthAction>(action: Action,
        parameters: BackendRequestSignature['database_utilities'][Action]): Promise<BackendResponseSignature['database_utilities'][Action]> {
    let response: Response;
    try {
        response = await fetch(databaseUtilitiesURL, {
            method: 'POST', headers: { Authorization: `Bearer ${anonKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...parameters, action }), signal: AbortSignal.timeout(50_000),
        });
    } catch {
        throw new Error('Unable to reach Chaster authorization. Please try again.');
    }
    let result;
    try { result = await response.json(); } catch {
        throw new Error(`The authorization service returned an unreadable response (HTTP ${response.status}).`);
    }
    if (!response.ok) throw new Error(typeof result?.error === 'string' ? result.error : `Authorization failed (HTTP ${response.status}).`);
    return result;
}

// Normal extension pages read their current Chaster launch token from the fragment.
export function readChasterSessionToken(kind: SessionTokenKind): string {
    const key = kind === 'main' ? 'mainToken' : 'partnerConfigurationToken';
    const fragment = window.location.hash.slice(1).split('?')[0];
    if (!fragment) return '';
    try {
        const parameters = JSON.parse(decodeURIComponent(fragment));
        return typeof parameters?.[key] === 'string' ? parameters[key] : '';
    } catch { return ''; }
}

export function getOAuthReturnURL(value: string | null | undefined): string | undefined {
    if (!value) return undefined;
    let url: URL;
    try { url = new URL(value, window.location.origin); } catch {
        throw new Error('The return URL is invalid.');
    }
    const path = url.pathname.replace(/\/+$/, '');
    if (url.origin !== window.location.origin || url.username || url.password ||
        path === `${base}/chaster/oauth`) {
        throw new Error('The return URL must point to another page on this site.');
    }
    return url.toString();
}

export function getChasterAuthorizationPageURL(redirect?: string): string {
    const target = getOAuthReturnURL(redirect);
    const url = new URL(`${base}/chaster/oauth/`, window.location.origin);
    url.searchParams.set('connect', '1');
    if (target) url.searchParams.set('redirect', target);
    return url.toString();
}

export function openChasterAuthorization(redirect?: string): void {
    const url = getChasterAuthorizationPageURL(redirect);
    if (window.self !== window.top) {
        try {
            window.top!.location.href = url;
            return;
        } catch {
            // Browsers may require a user click before leaving an embedded page.
        }
    }
    window.location.assign(url);
}

export async function requireConfigAuthorization(configToken: string): Promise<ChasterOAuthConnection | null> {
    if (!configToken) throw new Error('Open this configuration from Chaster to load its settings.');
    const connection = await invokeChasterOAuth('chaster_access-check', { configToken });
    if (connection.status === 'connected') return connection;
    const returnURL = new URL(window.location.href);
    const returnedAt = Number(returnURL.searchParams.get('oauth_returned'));
    if (returnedAt > 0 && Math.abs(Date.now() - returnedAt) < 60_000) {
        throw new Error('This configuration still needs authorization. Connect the Chaster account that owns this configuration, then reload.');
    }
    returnURL.searchParams.delete('oauth_returned');
    openChasterAuthorization(returnURL.toString());
    return null;
}

export function returnFromChasterAuthorization(redirect: string | null | undefined): void {
    const target = getOAuthReturnURL(redirect);
    if (!target) return;
    const url = new URL(target);
    // A recent return stops repeated authorization when a different account was connected.
    url.searchParams.set('oauth_returned', String(Date.now()));
    window.location.replace(url.toString());
}

export async function beginChasterAuthorization(redirect?: string): Promise<void> {
    const target = getOAuthReturnURL(redirect);
    const result = await invokeChasterOAuth('chaster_access-start', target ? { redirect: target } : {});
    const authorizationURL = new URL(result.authorizationURL);
    const callbackURL = `${window.location.origin}${base}/chaster/oauth/`;
    if (authorizationURL.protocol !== 'https:' || authorizationURL.hostname !== 'sso.chaster.app' ||
        authorizationURL.searchParams.get('redirect_uri') !== callbackURL ||
        authorizationURL.searchParams.get('state') !== result.state) {
        throw new Error('Authorization is not configured for this site. Please contact the extension developer.');
    }
    try {
        // Store the one-use OAuth state for callback verification.
        window.sessionStorage.setItem(oauthStateKey, result.state);
    } catch {
        throw new Error('Allow temporary site storage in your browser to complete Chaster authorization.');
    }
    window.location.assign(authorizationURL.toString());
}

export function consumeOAuthState(state: string): void {
    let expectedState: string | null;
    try { expectedState = window.sessionStorage.getItem(oauthStateKey); }
    catch { throw new Error('Unable to verify this authorization response. Please connect again.'); }
    if (!expectedState || expectedState !== state) {
        throw new Error('This authorization response is invalid or already used. Please connect again.');
    }
    window.sessionStorage.removeItem(oauthStateKey);
}
