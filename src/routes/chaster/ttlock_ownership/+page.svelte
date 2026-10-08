<script lang="ts">
    import { onMount } from 'svelte';
    import chasterLogo from '$lib/resources/logo.png';
    import { readChasterSessionToken } from '$lib/scripts/chaster-oauth';
    import { invokeTTLock } from '$lib/scripts/ttlock-ownership';
    import type { Page } from '$lib/import/extension-ttlock_ownership';

    let mainToken = '';
    let data: Page | null = null;
    let username = '';
    let identifier = '';
    let accountConfirmed = false;
    let boundAccount = '';
    let transferStatus: boolean | null = null;
    let loading = true;
    let busy = false;
    let error = '';
    let alive = false;
    let now = Date.now();
    let checking = false;
    $: passcode = data?.passcode && Date.parse(data.passcode.expiresAt) > now ? data.passcode : null;

    async function requestCode(refresh: boolean) {
        if (!data || data.state !== 'available' || !data.device?.passcodeEnabled) return;
        await invokeTTLock('ttlock_ownership-passcode', { mainToken, refresh });
        // Recheck access before displaying a response that took time to generate.
        const latest = await invokeTTLock('ttlock_ownership-page', { mainToken });
        if (!alive) return;
        data = latest;
    }
    async function action(work: () => Promise<void>) {
        if (busy) return;
        busy = true;
        error = '';
        try { await work(); } catch (failure) {
            if (alive) {
                error = (failure as Error).message;
                // Fail closed when session checks or code issuance fail.
                if (data) data = { ...data, passcode: null };
            }
        } finally { if (alive) busy = false; }
    }
    async function continueSetup() {
        if (busy || !username.trim()) return;
        username = username.trim();
        accountConfirmed = true;
        error = '';
    }
    async function checkTransfer() {
        transferStatus = null;
        await action(async () => {
            const result = await invokeTTLock('ttlock_ownership-transfer-status', { mainToken, username, identifier });
            if (!alive) return;
            transferStatus = result.transferred;
            if (result.page) {
                data = result.page;
                boundAccount = data.boundAccount ?? '';
                await requestCode(false);
            }
        });
    }
    async function updateAccount() {
        await action(async () => {
            const result = await invokeTTLock('ttlock_ownership-update-account', { mainToken, username: boundAccount });
            if (!alive) return;
            boundAccount = result.boundAccount;
            if (data) data = { ...data, boundAccount: result.boundAccount };
        });
    }
    async function reload(initial = false) {
        if (checking || busy || !mainToken) return;
        checking = true;
        try {
            const result = await invokeTTLock('ttlock_ownership-page', { mainToken });
            if (!alive) return;
            data = result;
            if (initial) {
                boundAccount = data.boundAccount ?? '';
                username = data.username ?? '';
                accountConfirmed = !!username;
                await requestCode(false);
            }
            error = '';
        } catch (failure) {
            if (alive) {
                error = (failure as Error).message;
                if (data) data = { ...data, passcode: null };
            }
        } finally { checking = false; if (alive) loading = false; }
    }
    onMount(() => {
        alive = true;
        mainToken = readChasterSessionToken('main');
        if (!mainToken) { loading = false; error = 'Open this extension from Chaster.'; }
        else void reload(true);
        const clockTimer = window.setInterval(() => { now = Date.now(); }, 1000);
        return () => {
            alive = false;
            window.clearInterval(clockTimer);
        };
    });
</script>

<svelte:head><title>TTLock Ownership</title></svelte:head>
<main class="container-bg w-full min-h-screen p-4">
    {#if loading}
        <div class="loading"><img src={chasterLogo} alt="Chaster" width="64" /><p>Loading extension data...</p></div>
    {:else}
        <section class="lock-card" aria-label="TTLock Ownership">
            <h1>TTLock Ownership</h1>
            {#if error}<p class="error" role="alert">{error}</p>{/if}
            {#if data?.state === 'unbound' && transferStatus !== null}
                <p class:error={!transferStatus} class:success={transferStatus} role="status">
                    {transferStatus ? 'Transfer successful!' : 'Lock not transferred yet'}
                </p>
            {/if}
            {#if !data}
                <button class="btn btn-secondary" disabled={checking || !mainToken} on:click={() => reload(true)}>Retry</button>
            {:else if data.state === 'unbound'}
                {#if data.userRole === 'keyholder'}
                    <p>The wearer has not bound the lock yet.</p>
                {:else}
                    <form on:submit|preventDefault={continueSetup}>
                        <label for="ttlock-username">TTLock email/phone</label>
                        <div class="username-row">
                            <input id="ttlock-username" class="form-control" autocomplete="off" maxlength="254"
                                placeholder="Your TTLock email/phone" bind:value={username} disabled={busy || accountConfirmed} required />
                            <button class="btn btn-primary" type="submit" disabled={busy || accountConfirmed || !username.trim()}>Continue</button>
                        </div>
                    </form>
                    {#if accountConfirmed}
                        <form class="transfer-form" on:submit|preventDefault={checkTransfer}>
                            <label for="ttlock-number">TTLock Lock Number (Settings &gt; Basics)</label>
                            <input id="ttlock-number" class="form-control" autocomplete="off" maxlength="128"
                                placeholder="Lock number or numeric LockID" bind:value={identifier} disabled={busy}
                                on:input={() => transferStatus = null} required />
                            <button class="btn btn-primary w-full" type="submit" disabled={busy || !identifier.trim()}>Check transfer status</button>
                        </form>
                    {/if}
                {/if}
            {:else}
                <form class="bound-account-form" on:submit|preventDefault={updateAccount}>
                    <label for="ttlock-bound-account">Bound TTLock Account</label>
                    <div class="username-row">
                        <input id="ttlock-bound-account" class="form-control" autocomplete="off" maxlength="254"
                            placeholder="TTLock email/phone" bind:value={boundAccount}
                            disabled={busy || checking || data.userRole !== 'wearer' || data.state === 'returning' || data.state === 'returned'} required />
                        {#if data.userRole === 'wearer'}
                            <button class="btn btn-primary" type="submit"
                                disabled={busy || checking || data.state === 'returning' || data.state === 'returned' || !boundAccount.trim() || boundAccount.trim().toLowerCase() === data.boundAccount}>Update</button>
                        {/if}
                    </div>
                </form>
                {#if data.state === 'returned'}
                    <p class="muted">Ownership returned—use the TTLock app.</p>
                {:else if data.state === 'returning'}
                    <p class="muted">Returning ownership to your TTLock account...</p>
                {:else if data.state === 'deserted'}
                    <button class="btn btn-secondary btn-lg w-full" disabled>Session has been deserted.</button>
                {:else if data.state === 'locked'}
                    <button class="btn btn-secondary btn-lg w-full" disabled>Session is not unlocked</button>
                {:else}
                    <button class="btn btn-primary btn-lg w-full" disabled title="Bluetooth unlocking is not available yet">Unlock</button>
                    {#if data.device?.passcodeEnabled}
                        <div class="code-header"><span>One-time passcode</span>
                            <button class="btn btn-secondary btn-sm" disabled={busy || checking} on:click={() => action(() => requestCode(true))}>Refresh</button>
                        </div>
                        <div class="passcode" aria-live="polite">{passcode?.code ?? '—'}</div>
                    {/if}
                {/if}
            {/if}
        </section>
    {/if}
</main>

<style>
    .container-bg { background: #272533; display: flex; flex-direction: column; align-items: center; flex: 1; }
    .lock-card { background: #343241; border-radius: 30px; box-shadow: 0 4px 8px rgba(0,0,0,.2); padding: 1.5em; width: min(100%, 32em); margin-top: 1em; }
    h1 { font-size: 1.35em; text-align: center; margin-bottom: 1em; }
    p { margin-bottom: .75em; }
    label { display: block; margin-bottom: .4em; }
    .username-row, .code-header { display: flex; align-items: center; gap: .75em; }
    .username-row input { min-width: 0; flex: 1; }
    .code-header { justify-content: space-between; margin: 1.25em 0 .5em; }
    .transfer-form { margin-top: 1.25em; }
    .bound-account-form { margin-bottom: 1.25em; }
    .transfer-form button { margin-top: .75em; }
    input:disabled { opacity: .55; }
    .passcode { font-size: clamp(1.75em, 7vw, 2.5em); font-family: monospace; letter-spacing: .12em; text-align: center; padding: .35em 0; }
    .error { color: #ff9c9c; }
    .success { color: #8ee6aa; }
    .loading { display: flex; align-items: center; flex-direction: column; gap: 1em; margin: auto; }
    @media (max-width: 360px) { .username-row { flex-wrap: wrap; } .username-row input { flex-basis: 100%; } }
</style>
