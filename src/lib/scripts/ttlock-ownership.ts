import type { BackendRequestSignature, BackendResponseSignature } from './signature-backend';

const endpoint = import.meta.env.VITE_CHASTER_UTILITIES_URL ?? 'https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities';
// Public API key; every operation authenticates its Chaster main token server-side.
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4';
type Action = Extract<keyof BackendRequestSignature['chaster_utilities'], `ttlock_ownership-${string}`>;

export async function invokeTTLock<A extends Action>(action: A, parameters: BackendRequestSignature['chaster_utilities'][A])
        : Promise<BackendResponseSignature['chaster_utilities'][A]> {
    let response: Response;
    try {
        response = await fetch(endpoint, { method: 'POST',
            headers: { Authorization: `Bearer ${anonKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, ...parameters }), cache: 'no-store', signal: AbortSignal.timeout(50_000) });
    } catch { throw new Error('Unable to reach TTLock Ownership. Please try again.'); }
    let result;
    try { result = await response.json(); } catch { throw new Error('Unable to load TTLock Ownership. Please try again.'); }
    if (!response.ok) throw new Error(typeof result?.error === 'string' ? result.error : 'Unable to complete this request. Please try again.');
    return result;
}
