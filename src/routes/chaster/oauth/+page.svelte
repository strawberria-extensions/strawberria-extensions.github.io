<script lang="ts">
    import chasterLogo from "$lib/resources/logo.png"
    import { onMount } from "svelte";

    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterOAuthStoreURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster-oauth-store";

    let oAuthRedirect: boolean = false;
    onMount(async () => {
        // Asynchronously check whether page loaded from OAuth response 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const authorizationCode = urlParams.get("code");
        if(authorizationCode !== null) {
            oAuthRedirect = true;

            // Valid authorization code, call oauth database store function
            const redirectURI = window.location.href.split("?")[0];
            await fetch(chasterOAuthStoreURL, {
                method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
                body: JSON.stringify({ 
                    authorizationCode: authorizationCode, 
                    redirectURI: redirectURI,
                    scopes: oAuthRequestedScopes,
                }),
            });

            // Afterwards, set URI back to normal hash style
            // const url = new URL(window.location.href);
            // const state = url.searchParams.get("state") as string;
            // url.searchParams.delete("state");
            // url.searchParams.delete("session_state");
            // url.searchParams.delete("code");
            // url.hash = encodeURIComponent(state);
            // // window.location.href = url.toString();
            // history.pushState(null, "", url.toString());
        } else {
            oAuthRedirect = false;
        }
    });

    // When keyholder not already authorized, redirect to OAuth
    const oAuthClientID = "extensions-318826";
    const oAuthRequestedScopes = "profile locks shared_locks keyholder";
    function redirectOAuth() {
        // Construct redirect URL from current URL, manually add main token
        let currentURL = encodeURIComponent(window.location.href.split("#")[0]);
        const urlChunks = [
            "https://sso.chaster.app/auth/realms/app/protocol/openid-connect/auth?",
            `client_id=${oAuthClientID}&`,
            `redirect_uri=${currentURL}&`,
            `response_type=code&scope=${oAuthRequestedScopes}&state=`,
        ];
        const redirectURL = urlChunks.join("");
        window.location.href = redirectURL;
        // window.open(redirectURL);
    }
</script>

<!-- Display logo and button to connect with OAuth -->
<div class="w-full h-screen flex flex-col items-center justify-center">
    <img src={chasterLogo} alt="Chaster logo">
    {#if oAuthRedirect === false}
        <div class="mt-4 mb-3 caption text-lg">Keyholder OAuth connection necessary for extension functionality.</div>
        <button type="button" class="text-lg btn btn-primary btn-md"
            on:click={redirectOAuth}>
            Authorize Permissions
        </button>
    {:else}
        <div class="mt-4 mb-3 caption text-lg">Successfully authorized OAuth, thanks!</div>
    {/if}
</div>