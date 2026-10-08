<script lang="ts">
    import { onMount } from 'svelte';
    import type { ChasterOAuthConnection } from '$lib/scripts/signature-backend';
    import { getChasterAuthorizationPageURL, requireChasterAuthorization,
        type SessionTokenKind } from '$lib/scripts/chaster-oauth';

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
            const result = await requireChasterAuthorization(currentToken, currentKind);
            if (token === currentToken && kind === currentKind) connection = result;
        } catch (failure) {
            if (token === currentToken && kind === currentKind) error = (failure as Error).message;
        } finally {
            checking = false;
            if (mounted && (token !== currentToken || kind !== currentKind)) checkedToken = '';
        }
    }

    onMount(() => {
        mounted = true;
        authorizationURL = getChasterAuthorizationPageURL(window.location.href);
        return () => { mounted = false; };
    });
</script>

{#if error}
    <div class="shrink-0 p-3 mb-2" role="alert">
        <p class="text-sm text-red-400">{error}</p>
        <button type="button" class="btn btn-secondary btn-sm" disabled={checking} on:click={checkConnection}>Retry</button>
        <a class="text-sm ml-2" href={authorizationURL} target="_self">Authorize Chaster</a>
    </div>
{/if}
