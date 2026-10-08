<script lang="ts">
    // Chaster OAuth callback and standalone authorization page.
    import { onMount } from 'svelte';
    import chasterLogo from '$lib/resources/logo.png';
    import {
        beginChasterAuthorization, consumeOAuthState, getOAuthReturnURL,
        invokeChasterOAuth, returnFromChasterAuthorization,
    } from '$lib/scripts/chaster-oauth';

    let message = 'Connect your Chaster account to authorize this application.';
    let error = '';
    let busy = false;
    let complete = false;
    let redirect: string | undefined;

    async function connect() {
        if (busy) return;
        busy = true;
        error = '';
        message = 'Opening Chaster authorization…';
        try { await beginChasterAuthorization(redirect); }
        catch (failure) {
            error = (failure as Error).message;
            message = '';
            busy = false;
        }
    }

    async function finishAuthorization(state: string, code: string | null, denied: string | null) {
        busy = true;
        message = 'Finishing Chaster connection…';
        try {
            consumeOAuthState(state);
            if (denied) throw new Error('Chaster authorization was canceled or denied. You can connect again.');
            const result = await invokeChasterOAuth('chaster_access-set', { state, authorizationCode: code! });
            if (result.status !== 'connected') throw new Error('The Chaster connection could not be completed. Please connect again.');
            complete = true;
            message = 'Your Chaster account is connected.';
            redirect = getOAuthReturnURL(result.redirect);
            returnFromChasterAuthorization(redirect);
        } catch (failure) {
            error = (failure as Error).message;
            message = '';
        } finally { busy = false; }
    }

    onMount(() => {
        const url = new URL(window.location.href);
        try {
            redirect = getOAuthReturnURL(url.searchParams.get('redirect'));
        }
        catch (failure) {
            message = '';
            error = (failure as Error).message;
            return;
        }
        const state = url.searchParams.get('state');
        const code = url.searchParams.get('code');
        const denied = url.searchParams.get('error');
        if (state || code || denied) {
            if (!state || (!code && !denied)) {
                message = '';
                error = 'The authorization response is incomplete. Please connect again.';
            } else { void finishAuthorization(state, code, denied); }
        } else if (url.searchParams.get('connect') === '1') { void connect(); }
    });
</script>

<svelte:head>
    <title>Connect Chaster</title>
    <meta name="referrer" content="no-referrer">
</svelte:head>

<main class="oauth-page">
    <section class="oauth-content" aria-label="Chaster authorization">
        <img class="oauth-logo" src={chasterLogo} alt="Chaster logo">
        <h1 class="text-xl mt-4">Chaster connection</h1>
        <div aria-live="polite">
            {#if message}<p role="status">{message}</p>{/if}
            {#if error}<p class="text-red-400" role="alert">{error}</p>{/if}
        </div>
        <button type="button" class="btn btn-primary mt-3" disabled={busy} on:click={connect}>
            {complete ? 'Connect another account' : 'Connect Chaster'}
        </button>
    </section>
</main>

<style>
    .oauth-page {
        box-sizing: border-box;
        display: grid;
        place-items: center;
        width: 100%;
        min-height: 100vh;
        min-height: 100dvh;
        padding: 1.5rem;
    }

    .oauth-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 36rem;
        text-align: center;
        overflow-wrap: anywhere;
    }

    .oauth-logo {
        width: 8rem;
        max-width: 100%;
        height: auto;
    }
</style>
