<script lang="ts">
    // Chaster OAuth callback and standalone authorization page.
    import { onMount } from 'svelte';
    import chasterLogo from '$lib/resources/logo.png';
    import {
        beginChasterAuthorization, consumeOAuthState, getChasterAuthorizationPageURL, getOAuthReturnURL,
        invokeChasterOAuth, returnFromChasterAuthorization,
    } from '$lib/scripts/chaster-oauth';

    let message = 'Connect your Chaster account to authorize this application.';
    let error = '';
    let busy = false;
    let complete = false;
    let redirect: string | undefined;
    let embedded = false;
    let authorizationURL = '';

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
        embedded = window.self !== window.top;
        const url = new URL(window.location.href);
        try {
            redirect = getOAuthReturnURL(url.searchParams.get('redirect'));
            authorizationURL = getChasterAuthorizationPageURL(redirect);
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
        } else if (url.searchParams.get('connect') === '1' && !embedded) { void connect(); }
    });
</script>

<svelte:head>
    <title>Connect Chaster</title>
    <meta name="referrer" content="no-referrer">
</svelte:head>

<main class="container-bg min-h-screen p-6 flex flex-col items-center justify-center">
    <img src={chasterLogo} alt="Chaster logo">
    <h1 class="text-xl mt-4">Chaster connection</h1>
    <div class="max-w-xl text-center" aria-live="polite">
        {#if message}<p role="status">{message}</p>{/if}
        {#if error}<p class="text-red-400" role="alert">{error}</p>{/if}
    </div>
    {#if embedded}
        <a class="btn btn-primary mt-3" href={authorizationURL} target="_top">Connect Chaster</a>
    {:else}
        <button type="button" class="btn btn-primary mt-3" disabled={busy} on:click={connect}>
            {complete ? 'Connect another account' : 'Connect Chaster'}
        </button>
    {/if}
</main>
