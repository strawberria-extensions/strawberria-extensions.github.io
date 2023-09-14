<script lang="ts">
    import { easeSinInOut } from 'd3-ease';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import chasterLogo from "$lib/resources/logo.png"
    import tickAudioFile from "$lib/resources/tick.mp3";
    import wheelBgOverlayFile from "$lib/resources/wheel-bg-overlay.svg"
    import { Wheel } from '$lib/resources/spin-wheel.js';
    import type { ChasterCustomConfig_ExtendedWheel, ChasterTrimmedExtensionSession } from '$lib/scripts/backend';
    import WheelOutcome from "$lib/components/WheelOutcome.svelte";
    import { generateOutcomeActionLabel, sleep, truncateWords } from "$lib/scripts/utility";
    
    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterOAuthStoreURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster-oauth-store";
    const extendedSessionGetURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/wheel-session-get";
    const wheelColors: string[] = [ 
        // 200-darkness wheel colors from Tailwind CSS (for convenience)
        "#fecaca", "#fed7aa", "#fde68a", "#d9f99d", "#bbf7d0", // "#fef08a"
        "#a7f3d0", "#99f6e4", "#a5f3fc", "#bae6fd", "#bfdbfe", "#c7d2fe",
        "#ddd6fe", "#e9d5ff", "#f5d0fe", "#fbcfe8", "#fecdd3"
    ];
    const tickAudios: HTMLAudioElement[] = Array(32).fill(0).map(_ => {
        const audio = new Audio(tickAudioFile);
        audio.volume = 0.3;
        return audio;
    }); 
    
    let mainToken = "";
    let initialLoadMessage: string = "Loading extension data...";
    // let extensionSessionData: ChasterTrimmedExtensionSession<ChasterCustomConfig_ExtendedWheel>;
    // let extensionCustomData: ChasterCustomData_ExtendedWheel;
    let extendedSessionData: ChasterTrimmedExtensionSession<ChasterCustomConfig_ExtendedWheel>;
    let extensionSessionConfigStore: Writable<ChasterCustomConfig_ExtendedWheel> = writable({ outcomes: [], handleText: "" });
    let userRole: "wearer" | "keyholder" = "keyholder";
    let hasKeyholderOAuth = false;
    extensionSessionConfigStore.update(_ => {
        const data: ChasterCustomConfig_ExtendedWheel = { 
            outcomes: [
                { percentage: "5.00", text: "After spending an entire day stumbling through the forest, you find yourself exactly back where you started.", key: "add_time", params: [60 * 60 * 24] },
                { percentage: "10.00", text: "You make significant progress during your exploration, getting closer and closer to civilization.", key: "remove_time", params: [12 * 60 * 60] },
                { percentage: "5.00", text: "", key: "share_link-requirement-increase", params: [12] },
                { percentage: "20.00", text: "", key: "share_link-add_time-set", params: [60 * 60 * 4] },
                { percentage: "4.50", text: "", key: "pillory-put", params: [] },
                { percentage: "0.50", text: "", key: "dice-regularitys-set", params: ["non_cumulative", 60 * 60] },
                { percentage: "5.00", text: "After spending an entire day stumbling through the forest, you find yourself exactly back where you started.", key: "add_time", params: [60 * 60 * 24] },
                { percentage: "10.00", text: "You make significant progress during your exploration, getting closer and closer to civilization.", key: "remove_time", params: [12 * 60 * 60] },
                { percentage: "5.00", text: "", key: "share_link-requirement-increase", params: [12] },
                { percentage: "20.00", text: "", key: "share_link-add_time-set", params: [60 * 60 * 4] },
                { percentage: "4.50", text: "", key: "pillory-put", params: [] },
                { percentage: "0.50", text: "", key: "dice-regularitys-set", params: ["non_cumulative", 60 * 60] },
                { percentage: "5.00", text: "After spending an entire day stumbling through the forest, you find yourself exactly back where you started.", key: "add_time", params: [60 * 60 * 24] },
                { percentage: "10.00", text: "You make significant progress during your exploration, getting closer and closer to civilization.", key: "remove_time", params: [12 * 60 * 60] },
                { percentage: "5.00", text: "", key: "share_link-requirement-increase", params: [12] },
                { percentage: "20.00", text: "", key: "share_link-add_time-set", params: [60 * 60 * 4] },
                { percentage: "4.50", text: "", key: "pillory-put", params: [] },
                { percentage: "0.50", text: "", key: "dice-regularitys-set", params: ["non_cumulative", 60 * 60] },
                { percentage: "5.00", text: "After spending an entire day stumbling through the forest, you find yourself exactly back where you started.", key: "add_time", params: [60 * 60 * 24] },
                { percentage: "10.00", text: "You make significant progress during your exploration, getting closer and closer to civilization.", key: "remove_time", params: [12 * 60 * 60] },
                { percentage: "5.00", text: "", key: "share_link-requirement-increase", params: [12] },
                { percentage: "20.00", text: "", key: "share_link-add_time-set", params: [60 * 60 * 4] },
                { percentage: "4.50", text: "", key: "pillory-put", params: [] },
                { percentage: "0.50", text: "", key: "dice-regularitys-set", params: ["non_cumulative", 60 * 60] },
            ],
            handleText: ""
        };
        data.outcomes.forEach(outcomeData => { outcomeData.label = generateOutcomeActionLabel(outcomeData); });
        // data.outcomes.sort((outcomeDataA, outcomeDataB) => parseFloat(outcomeDataB.percentage) - parseFloat(outcomeDataA.percentage));
        return data;
    });

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

        // Asynchronously check whether page loaded from OAuth response 
        const authorizationCode = urlParams.get("code");
        if(authorizationCode !== null) {
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
            const url = new URL(window.location.href);
            const state = url.searchParams.get("state") as string;
            url.searchParams.delete("state");
            url.searchParams.delete("session_state");
            url.searchParams.delete("code");
            url.hash = encodeURIComponent(state);
            // window.location.href = url.toString();
            history.pushState(null, "", url.toString());
        }

        initialLoadMessage = "Checking OAuth permissions...";

        // Retrieve current session data and keyholder authorization given main token
        const extensionSessionResponse = await fetch(extendedSessionGetURL, 
            { method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ mainToken: mainToken }),
        });
        if(extensionSessionResponse.status !== 200) {
            console.error(`Error retrieving session data: ${await extensionSessionResponse.text()}`);
            return;
        }
        const extensionSessionData: any[] = await extensionSessionResponse.json();
        // $extensionSessionConfigStore
        hasKeyholderOAuth = extensionSessionData[1];

        initialLoadMessage = "";
    });

    // Wheel-related logic including spinning, etc.
    let wheelContainerStore: Writable<HTMLDivElement | undefined> = writable(undefined);
    let spinWheel: any;
    async function spinTheWheel() {
        spinWheel.spinToItem(Math.floor(Math.random() * spinWheel.items.length), 5000, false, 5, 1, easeSinInOut)
    }

    // Update wheel container with new outcomes from selected wheel
    wheelContainerStore.subscribe(updateWheelContainer);
    extensionSessionConfigStore.subscribe(updateWheelContainer);

    async function updateWheelContainer() {
        const wheelContainer = $wheelContainerStore;

        if(wheelContainer === undefined) { return; }

        // Short delay so wheel is properly sized in container
        await sleep(10);

        const items = JSON.parse(JSON.stringify($extensionSessionConfigStore.outcomes.map(
            (outcomeData, index) => {
                const label = outcomeData.label ?? "";
                const truncatedLabel = [truncateWords(label, 24), label.length >= 32 ? "..." : ""].join("");
                const weight = parseFloat(outcomeData.percentage);
                return { label: truncatedLabel, weight: weight };
            }
        )));
        const wheelProps = {
            items: items,
            pointerAngle: 270,
            itemBackgroundColors: wheelColors,
            itemLabelRadiusMax: 0.3,
            itemLabelRadius: 0.825,
            itemLabelAlign: "left",
            itemLabelRotation: 180,
            // isInteractive: false,
            borderWidth: 2,
            overlayImage: wheelBgOverlayFile,
        }

        wheelContainer.innerHTML = "";
        spinWheel = new Wheel(wheelContainer, wheelProps);
        (window as any).wheel = spinWheel;
        (window as any).ease = easeSinInOut;
        let audioIndex = 0;
        let finishedSpinning = false;
        let tickInterval: number;
        spinWheel.onSpin = () => {
            let lastRotation: number = 0;
            let tickAngle = 30;

            clearInterval(tickInterval);
            tickInterval = setInterval(() => {
                if(finishedSpinning === true) { 
                    clearInterval(tickInterval);
                    finishedSpinning = false;
                    return;
                }
                if(spinWheel._rotation >= lastRotation + tickAngle) {
                    lastRotation = spinWheel._rotation;
                    audioIndex = (audioIndex + 1) < tickAudios.length
                        ? audioIndex + 1 : 0;
                    tickAudios[audioIndex].play();
                }
            }, 10) as any;
        };
        spinWheel.onRest = () => { 
            finishedSpinning = true; 
            spinWheel._rotation = spinWheel._rotation - 360 * Math.floor(spinWheel._rotation / 360)
        }
    }

    // Store widths and heights for determining layout
    let frameWidth: number; 
    let frameHeight: number;
    let wheelWidth: number;
    let pageContainer: HTMLDivElement;
    let emValue: number = 0;
    let necessaryWidth: number = 0;
    let shouldHorizontal = true;
    $: { pageContainer; if(pageContainer !== undefined) { 
        emValue = parseFloat(getComputedStyle(pageContainer).fontSize); 
        necessaryWidth = (wheelWidth * 2) + (4 * emValue * 4) + (4 * emValue + 4);
        shouldHorizontal = frameWidth > necessaryWidth;
    }}

    // When keyholder and not alraedy authorized, redirect to OAuth
    const oAuthClientID = "extensions-318826";
    const oAuthRequestedScopes = "profile%20locks%20shared_locks%20keyholder";
    function redirectOAuth() {
        // Construct redirect URL from current URL, manually add main token
        // NOTE: scopes should be separated by space
        let currentURL = encodeURIComponent(window.location.href.split("#")[0]);
        const urlChunks = [
            "https://sso.chaster.app/auth/realms/app/protocol/openid-connect/auth?",
            `client_id=${oAuthClientID}&`,
            `redirect_uri=${currentURL}&`,
            `response_type=code&${oAuthRequestedScopes}&state=${hash}`,
        ];
        const redirectURL = urlChunks.join("");
        window.location.href = redirectURL;
        // window.open(redirectURL);
    }
</script>

<svelte:window bind:innerWidth={frameWidth} bind:innerHeight={frameHeight} />
<div class="container-bg min-w-0 min-h-0 pl-3 pr-3 space-y-2 grow" 
    bind:this={pageContainer}>
    {#if false}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else}
        <div class="card-content grow" class:card-wrapper-desktop={shouldHorizontal}>
            <div class="w-full h-full flex flex-row">
                <div class="h-full flex flex-col" class:card-horizontal={shouldHorizontal}>
                    <div class="flex flex-row items-end justify-between space-x-1 mb-2">
                        <h4 class="mb-0">Extended Wheel of Fortune</h4>
                        <span class="caption">Developer: @strawberria</span>
                    </div>
                    <div class="caption mb-2">
                        Try your luck and spin the <b>extended</b> wheel of fortune! <br>
                        Now supporting additional actions and multiple wheels with individual cooldowns!
                    </div>
                    <div class="grow mt-1 wheel-container" 
                        bind:this={$wheelContainerStore} bind:clientWidth={wheelWidth} />
                        <!-- bind:this={wheelContainer} bind:clientWidth={wheelWidth} /> -->
                    <hr>
                    <div class="w-full flex flex-row items-stretch space-x-4">
                        <div class="grow">
                            <div>Select</div>
                            <div class="caption mb-2">Choose which wheel to spin with</div>
                            <div class="w-full">
                                <select class="form-control">
                                    <option value="add_time">Task Wheel</option>
                                    <option value="freeze">Freeze</option>
                                    <option value="pillory">Pillory</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center ml-4 mr-4">
                            <button type="button" class="btn btn-primary btn-lg"
                                on:click={spinTheWheel}>
                                <span>Spin the wheel!</span>
                            </button>
                        </div>
                    </div>
                    {#if !shouldHorizontal}
                        <hr>
                        <div>Outcomes</div>
                    {/if}
                </div>
                {#if shouldHorizontal}
                    {@const renderOAuth = !hasKeyholderOAuth && userRole === "keyholder"}
                    <div class="h-full flex flex-col ml-4 something" style={`width: calc(${wheelWidth}px * 1.0)`}>
                        <div class={`flex flex-row flex-start items-center ${renderOAuth ? "justify-between" : "justify-start"}`}>
                            <div>
                                <div>Keyholder OAuth Status:</div>
                                {#if hasKeyholderOAuth === true}
                                    <div class="text-green-500">✔️ OAuth scopes granted!</div>
                                {:else}
                                    <div class="text-red-500">❌ Missing OAuth permissions!</div>
                                {/if}
                            </div>
                            {#if renderOAuth}
                                <button type="button" class="btn btn-primary btn-md"
                                    on:click={redirectOAuth}>
                                    Authorize Permissions
                                </button>
                            {/if}
                        </div>
                        <hr>
                        <div>Outcomes</div>
                        <div class="caption mb-2">
                            View possible outcomes for the wheel
                        </div>
                        {#if $extensionSessionConfigStore.outcomes.length > 0}
                            <div class="card-content outcomes-list">
                                <div class="flex flex-col space-y-1 items-stretch">
                                    {#each $extensionSessionConfigStore.outcomes as outcomeData, index}
                                        {@const colorIndex = index - Math.floor(index / wheelColors.length) * wheelColors.length}
                                        {@const outcomeColor = wheelColors[colorIndex]}
                                        <WheelOutcome outcomeData={outcomeData} color={outcomeColor} />
                                        {#if index !== $extensionSessionConfigStore.outcomes.length - 1}
                                            <hr class="mt-0.5 mb-0.5">
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    {/if}
    <!-- <div class="card-wrapper card-content m-0" style={`width: ${cardWidth}px`}>
        <div>Wheel Outcomes</div>
    </div> -->
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
</style>