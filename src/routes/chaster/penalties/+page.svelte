<script lang="ts">
    import { easeSinInOut } from 'd3-ease';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import chasterLogo from "$lib/resources/logo.png"
    import tickAudioFile from "$lib/resources/tick.mp3";
    import wheelBgOverlayFile from "$lib/resources/wheel-bg-overlay.svg"
    import { Wheel } from '$lib/resources/spin-wheel.js';
    import WheelOutcome from "$lib/components/WheelOutcome.svelte";
    import { generateOutcomeEffectLabel, randomInt, sleep, truncateWords } from "$lib/scripts/utility";
    import type { ExtendedWheelConfig_OutcomeData_Result, ExtendedWheelConfig_User, ExtendedWheelCustom } from '$lib/scripts/signature-extended_wheel';
    import type { ChasterUserRole } from '$lib/scripts/signature-chaster';
    import type { BackendResponseSignature } from '$lib/scripts/signature-backend';
    import { generateTimeString } from "$lib/scripts/utility";
    
    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";
    const databaseUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/database_utilities";

    let initialLoadMessage: string = "Loading extension data...";
    let selectedExtensionKey: "extended_wheel" = "extended_wheel";

    let mainToken = "";

    let hash: string = "";
    onMount(async () => {
        // Retrieve main token from page URL
        hash = window.location.hash.substring(1).split("?")[0];
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if(hash !== "") {
            const params = JSON.parse(decodeURIComponent(hash));
            mainToken = params.mainToken;
        } else {
            // Check whether main token was moved to query params after OAuth
            const stateTokenData = urlParams.get("state");
            if(stateTokenData !== null) {
                const stateParams = JSON.parse(decodeURIComponent(stateTokenData));
                mainToken = stateParams.mainToken;
            }
        }

        // Retrieve penalty data and extension name/etc. data

        initialLoadMessage = "";
    });

    // Store widths and heights for determining layout
    let shouldHorizontal = !/Mobi/i.test(window.navigator.userAgent);
</script>

<svelte:window />
<div class="container-bg min-w-0 min-h-0 p-4 space-y-2 grow">
    {#if initialLoadMessage !== ""}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else if selectedWheelID !== undefined}
        
    {/if}
</div>

<style>
    .container-bg {
        background-color: #272533;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card-wrapper-desktop {
        max-height: calc(100vh - 3em);
    }

    .wheel-container {
        max-width: 36em;
    }

    .card-horizontal {
        padding-right: 2em;
        border-right: 1px solid black;
    }
    
    .outcomes-list {
        background-color: #3d3b4d;
        border-radius: 16px;
        overflow-y: auto;
    }

    .result {
        background-color: #3d3b4d;
        padding: 1em;
        border-radius: 16px;
        box-shadow: 0 4px 8px rgba(0,0,0,.2);
        border: 2px solid #64748b;
    }
</style>