<script lang="ts">
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import chasterLogo from "$lib/resources/logo.png"
    import type { BackendResponseSignature, IndividualPenaltyData } from '$lib/scripts/signature-backend';
    import PenaltyDisplay from '$lib/components/PenaltyDisplay.svelte';
    
    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";
    const extensionLookupData: any = {
        "extended-wheel-of-fortune": { "key": "extended_wheel", "what": "spin" }
    };

    let initialLoadMessage: string = "Loading extension data...";
    let selectedExtensionKey: "extended_wheel" = "extended_wheel";

    let mainToken = "";
    let individualPenaltiesStore: Writable<IndividualPenaltyData[]> = writable([]);
    let lockID = "";

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
        const penaltiesMainResponse = await fetch(chasterUtilitiesURL, {
            method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "strawberria_penalties-page",
                mainToken: mainToken,
            })
        });
        if(penaltiesMainResponse.status !== 200) {
            console.error(`Error retrieving session data: ${await penaltiesMainResponse.text()}`);
            throw new Error("error retrieving session data");
        }
        const penaltiesMainData: BackendResponseSignature["chaster_utilities"]["strawberria_penalties-page"] 
            = await penaltiesMainResponse.json();
        $individualPenaltiesStore = penaltiesMainData.data;
        lockID = penaltiesMainData.lockID;

        initialLoadMessage = "";
    });

    
    let totalCompleted = 0;
    let totalRequired = 1;
    let widthPercentage = 0;
    individualPenaltiesStore.subscribe(individualPenaltiesData => {
        // Count the number of completed and required penalties
        totalCompleted = 0;
        totalRequired = 0;
        for(const individualPenaltyData of individualPenaltiesData) {
            totalCompleted += individualPenaltyData.penaltyData.current >= individualPenaltyData.penaltyConfig.required
                ? 1 : 0;
            totalRequired++;
        }
        widthPercentage = totalRequired === 0 ? 0 : totalCompleted / totalRequired * 100;
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
    {:else}
        <div class={`flex flex-col space-y-[1.5em] ${shouldHorizontal ? "w-[65.5em]" : "w-full"}`}>
            <div class="card-content" class:card-wrapper-desktop={shouldHorizontal}>
                <div class="flex items-end justify-between mb-2"
                        class:flex-row={shouldHorizontal}
                        class:flex-col={!shouldHorizontal}
                        class:space-x-1={shouldHorizontal}
                        class:items-end={shouldHorizontal}>
                        <h4 class="mb-0">[🍓] Strawberria Penalties</h4>
                        <span class="caption">Developer: <a href="https://chaster.app/user/strawberria" target="_blank">@strawberria</a></span>
                    </div>
                <div class="caption mb-3">
                    Extended penalty handling for all personally-developed extensions! <br>
                    Now supporting extended lock effects and dynamic penalty interval with minute-level granularity!
                </div>
                <div class="flex flex-row space-x-[0.5em]">
                    <i class="fal fa-tasks fa-2x"></i>
                    <h3>{totalCompleted} / {totalRequired} completed</h3>
                </div>
                <div class="progress">
                    <div role="progressbar" class="progress-bar" 
                        style={`width: ${widthPercentage}%;`} />
                </div>
            </div>
            <div class="grid gap-[1.5em]"
                class:grid-cols-2={shouldHorizontal}
                class:grid-cols-1={!shouldHorizontal}>
                {#each $individualPenaltiesStore as individualPenaltyData}
                    {@const extensionLookup = extensionLookupData[individualPenaltyData.extensionData.slug]}
                    <PenaltyDisplay shouldHorizontal={shouldHorizontal}
                        lockID={lockID} 
                        extensionLookup={extensionLookup} 
                        individualPenaltyData={individualPenaltyData} />
                {/each}
                <!-- <PenaltyDisplay extensionLookup={{"key":"extended_wheel","what":"spin"}}
                    extensionData={{"_id": "123", "slug": "extended-wheel-of-fortune", "displayName": "[🍓] Extended Wheel of Fortune"}}
                    penaltyConfig={{"display": "Task Wheel", "required": 2, "interval": 3600000, "effects": []}}
                    penaltyData={{"lastPenaltyMS": 1709004606550, "current":1}} /> -->
            </div>
        </div>
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

    .card-horizontal {
        border-right: 1px solid black;
    }

    .penalties-select:hover {
        background-color: #2a263a;
    }
</style>