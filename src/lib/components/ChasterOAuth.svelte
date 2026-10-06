<script lang="ts">
    import { onMount } from 'svelte';
    import type { ChasterOAuthConnection } from '$lib/scripts/signature-backend';
    import { getChasterAuthorizationPageURL, invokeChasterOAuth, openChasterAuthorization,
        statusCredentials, type SessionTokenKind } from '$lib/scripts/chaster-oauth';

    export let token = '';
    export let kind: SessionTokenKind = 'main';
    export let autoCheck = true;

    export let connection: ChasterOAuthConnection | null = null;
    let error = '';
    let checking = false;
    let mounted = false;
    let checkedToken = '';
    let checkedKind: SessionTokenKind = kind;
    let authorizationURL = '';

    $: if (autoCheck && mounted && token && !checking && (checkedToken !== token || checkedKind !== kind)) {
        checkedToken = token;
        checkedKind = kind;
        connection = null;
        void checkConnection();
    }

    async function checkConnection() {
        if (checking || !token) return;
        const currentToken = token;
        const currentKind = kind;
        checking = true;
        error = '';
        try {
            const result = await invokeChasterOAuth('chaster_access-check', statusCredentials(currentToken, currentKind));
            if (token === currentToken && kind === currentKind) connection = result;
        } catch (failure) {
            if (token === currentToken && kind === currentKind) error = (failure as Error).message;
        } finally {
            checking = false;
            if (mounted && (token !== currentToken || kind !== currentKind)) checkedToken = '';
        }
    }

    function connect() {
        error = '';
        try { openChasterAuthorization(window.location.href); }
        catch (failure) { error = (failure as Error).message; }
    }

    onMount(() => {
        mounted = true;
        authorizationURL = getChasterAuthorizationPageURL(window.location.href);
        return () => { mounted = false; };
    });
</script>

<section class="shrink-0 rounded border border-gray-600 p-3 mb-2" aria-label="Chaster connection">
    <div class="flex flex-wrap items-center justify-between gap-2">
        <div aria-live="polite" role="status">
            {#if checking}
                Checking Chaster connection…
            {:else if connection?.status === 'connected'}
                <span class="text-green-400">Chaster connected</span>
            {:else if connection?.status === 'reauthorization_required'}
                <span class="text-yellow-400">Reconnect your Chaster account</span>
            {:else if connection?.status === 'not_connected'}
                Chaster not connected
            {:else if token}
                Connection status unavailable
            {:else}
                Connect your Chaster account
            {/if}
        </div>
        <div class="flex flex-wrap gap-2">
            <button type="button" class="btn btn-primary btn-sm" on:click={connect}>
                {connection?.status === 'reauthorization_required' ? 'Reconnect Chaster' : 'Connect Chaster'}
            </button>
            {#if token}
                <button type="button" class="btn btn-secondary btn-sm" disabled={checking} on:click={checkConnection}>Check connection</button>
            {/if}
            <a class="text-sm self-center" href={authorizationURL} target="_self">Open connection page</a>
        </div>
    </div>
    {#if error}<p class="text-sm text-red-400 mt-2 mb-0" role="alert">{error}</p>{/if}
</section>
