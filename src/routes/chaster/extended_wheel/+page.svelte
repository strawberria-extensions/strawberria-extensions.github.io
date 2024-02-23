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
    import type { ExtendedWheelConfig_OutcomeData_Result, ExtendedWheelConfig_OutcomeData_User, ExtendedWheelConfig_User, ExtendedWheelCustom } from '$lib/scripts/signature-extended_wheel';
    import type { ChasterUserRole } from '$lib/scripts/signature-chaster';
    import type { BackendResponseSignature } from '$lib/scripts/signature-backend';
    import { generateTimeString } from "$lib/scripts/utility";
    
    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";
    const databaseUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/database_utilities";
    const wheelColors: string[] = [ 
        // 200-darkness wheel colors from Tailwind CSS (for convenience)
        "#fecaca", "#fed7aa", "#fde68a", "#d9f99d", "#bbf7d0", // "#fef08a"
        "#a7f3d0", "#99f6e4", "#a5f3fc", "#bae6fd", "#bfdbfe", "#c7d2fe",
        "#ddd6fe", "#e9d5ff", "#f5d0fe", "#fbcfe8", "#fecdd3"
    ];
    const unknownOutcomeData: { label: string; weight: number }[] = [
        { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, 
        { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, 
        { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, 
        { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, { label: "???        ", weight: 1 }, 
    ]
    const tickAudios: HTMLAudioElement[] = Array(32).fill(0).map(_ => {
        const audio = new Audio(tickAudioFile);
        audio.volume = 0.3;
        return audio;
    }); 

    let initialLoadMessage: string = "Loading extension data...";
    let selectedWheelID: string | undefined = undefined;

    let mainToken = "";
    let userRole: ChasterUserRole = "keyholder";
    let hasKeyholderOAuth = false;
    let extendedWheelConfigStore: Writable<ExtendedWheelConfig_User> = writable({ "wheels": {} });
    let extendedWheelCustomStore: Writable<ExtendedWheelCustom> = writable({ wheels: {} });

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
            await fetch(databaseUtilitiesURL, {
                method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
                body: JSON.stringify({ 
                    action: "chaster_access-set",
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

        initialLoadMessage = "Retrieving extended wheel data...";

        const extendedMainPageData = await retrieveWheelConfig();
        hasKeyholderOAuth = extendedMainPageData.hasKeyholder;
        userRole = extendedMainPageData.userRole;
        $extendedWheelConfigStore = extendedMainPageData.config;
        $extendedWheelCustomStore = extendedMainPageData.customData;
        selectedWheelID = Object.keys($extendedWheelConfigStore.wheels)[0] ?? undefined;

        initialLoadMessage = "";
    });

    let nextSpinTimestampStore: Writable<string> = writable("");
    function updateNextSpinTimestamp() {
        if(selectedWheelID === undefined) {
            return;
        }
        const wheelCustomData = $extendedWheelCustomStore.wheels[selectedWheelID];
        if(wheelCustomData === undefined) {
            $nextSpinTimestampStore = "";
        } else {
            const wheelConfigData = $extendedWheelConfigStore.wheels[selectedWheelID];
            if(wheelConfigData.regularity.mode === "unlimited") {
                $nextSpinTimestampStore = "";
            } else {
                const currentTimeMS = new Date().getTime();
                const nextSpinMS = wheelCustomData.lastActionTime + wheelConfigData.regularity.interval * 1000;
                $nextSpinTimestampStore = currentTimeMS > nextSpinMS
                    ? "" : generateTimeString(Math.floor((nextSpinMS - currentTimeMS) / 1000));
            }
        }
    }

    setInterval(updateNextSpinTimestamp, 200);
    extendedWheelConfigStore.subscribe(() => { updateNextSpinTimestamp(); });
    extendedWheelCustomStore.subscribe(() => { updateNextSpinTimestamp(); });
    $: { selectedWheelID; updateNextSpinTimestamp(); }

    // Wheel-related logic including spinning, etc.
    let wheelContainerStore: Writable<HTMLDivElement | undefined> = writable(undefined);
    let resultStore: Writable<ExtendedWheelConfig_OutcomeData_Result | undefined> = writable(undefined)
    let spinDisabled = false;
    let spinWheel: any;
    let lastRotation: [string, number] = ["", 0];
    async function spinTheWheel() {
        spinDisabled = true;
        $resultStore = undefined;

        // Spin the wheel first
        const spinResultResponse = await fetch(chasterUtilitiesURL, {
            method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "extended_wheel-spin",
                mainToken: mainToken,
                wheelID: selectedWheelID,
            })
        });
        const spinResultData: BackendResponseSignature["chaster_utilities"]["extended-main-spin"] = await spinResultResponse.json();
        // TODO handle hidden outcome missing index
        if(spinResultData.index === undefined) { 
            spinResultData.index = randomInt(0, 16); 
        }

        spinWheel.spinToItem(spinResultData.index, 5000, false, 5, 1, easeSinInOut);

        // spinDisabled = false;
        setTimeout(() => { 
            $resultStore = spinResultData.result;

            spinDisabled = false; 
            lastRotation = [selectedWheelID as string, spinWheel.rotation];

            // Update the wheel if necessary?
            // hasKeyholderOAuth = extendedMainPageData.hasKeyholder;
            // Somewhat redundant?
            // selectedWheelID = Object.keys($extendedWheelConfigStore.wheels)[0] ?? undefined;
        }, 5100);

        // Cache the post-spin data to update after spin
        const extendedMainPageData = await retrieveWheelConfig();
        while(spinDisabled) {
            await sleep(100);
        }
        if(JSON.stringify($extendedWheelConfigStore) !== JSON.stringify(extendedMainPageData.config)) {
            $extendedWheelConfigStore = extendedMainPageData.config; // Intensive?
        }
        $extendedWheelCustomStore = extendedMainPageData.customData;
    }

    // Update wheel container with new outcomes from selected wheel
    wheelContainerStore.subscribe(updateWheelContainer);
    extendedWheelConfigStore.subscribe(updateWheelContainer);
    // extendedWheelCustomStore.subscribe(updateWheelContainer);

    async function retrieveWheelConfig(): Promise<BackendResponseSignature["chaster_utilities"]["extended-main-page"]> {
        // Retrieve wheel data including keyholder authorization, config, and custom data given main token
        const extendedMainPageResponse = await fetch(chasterUtilitiesURL, {
            method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "extended_wheel-page",
                mainToken: mainToken,
            })
        });
        if(extendedMainPageResponse.status !== 200) {
            console.error(`Error retrieving session data: ${await extendedMainPageResponse.text()}`);
            throw new Error("error retrieving session data")
        }
        const extendedMainPageData: BackendResponseSignature["chaster_utilities"]["extended-main-page"] 
            = await extendedMainPageResponse.json();
        return extendedMainPageData;   
    }

    async function updateWheelContainer() {
        if(selectedWheelID === undefined) { return; }
        const wheelContainer = $wheelContainerStore;
        if(wheelContainer === undefined) { return; }

        // Short delay so wheel is properly sized in container
        await sleep(10);

        const wheelData = $extendedWheelConfigStore.wheels[selectedWheelID];

        let items = JSON.parse(JSON.stringify(wheelData.outcomes.map(
            (outcomeData) => {
                const label = outcomeData.text ?? "";
                const truncatedLabel = [truncateWords(label, 24), label.length >= 32 ? "..." : ""].join("");
                const weight = parseFloat(outcomeData.percentage);
                return { label: truncatedLabel, weight: weight };
            }
        )));
        if(wheelData.settings.hiddenOutcomes) {
            items = unknownOutcomeData;
        }

        let rotation: number = 0;
        if(lastRotation[0] == selectedWheelID as string) {
            rotation = lastRotation[1];
        } else {
            lastRotation = ["", 0];
        }

        const wheelProps = {
            items: items,
            pointerAngle: 270,
            isInteractive: false,
            itemBackgroundColors: wheelColors,
            itemLabelRadiusMax: 0.3,
            itemLabelRadius: 0.825,
            itemLabelAlign: "left",
            itemLabelRotation: 180,
            // isInteractive: false,
            borderWidth: 2,
            overlayImage: wheelBgOverlayFile,
            rotation: rotation,
        }

        if(wheelContainer) { wheelContainer.innerHTML = ""; }
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
    // let emValue: number = 0;
    // let necessaryWidth: number = 0;
    let shouldHorizontal = true;
    // $: { pageContainer; if(pageContainer !== undefined) { 
    //     emValue = parseFloat(getComputedStyle(pageContainer).fontSize); 
    //     // necessaryWidth = (wheelWidth * 2) + (4 * emValue * 4) + (4 * emValue + 4);
    //     // shouldHorizontal = frameWidth > necessaryWidth;
    // }}

    // When keyholder and not alraedy authorized, redirect to OAuth
    const oAuthClientID = "extensions-318826";
    const oAuthRequestedScopes = "profile locks shared_locks keyholder";
    function redirectOAuth() {
        // Construct redirect URL from current URL, manually add main token
        // NOTE: scopes should be separated by space
        let currentURL = encodeURIComponent(window.location.href.split("#")[0]);
        const urlChunks = [
            "https://sso.chaster.app/auth/realms/app/protocol/openid-connect/auth?",
            `client_id=${oAuthClientID}&`,
            `redirect_uri=${currentURL}&`,
            `response_type=code&scope=${oAuthRequestedScopes}&state=${hash}`,
        ];
        const redirectURL = urlChunks.join("");
        window.location.href = redirectURL;
        // window.open(redirectURL);
    }
</script>

<svelte:window bind:innerWidth={frameWidth} bind:innerHeight={frameHeight} />
<div class="container-bg min-w-0 min-h-0 p-4 space-y-2 grow" 
    bind:this={pageContainer}>
    {#if initialLoadMessage !== ""}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else if selectedWheelID !== undefined}
        {@const wheelData = $extendedWheelConfigStore.wheels[selectedWheelID]}
        {@const buttonDisabled = spinDisabled || wheelData.settings.disabled === true}
        {@const allowedSpin = ($nextSpinTimestampStore === "" || userRole === "keyholder")}
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
                    {#key selectedWheelID}
                        <div class="grow mt-1 wheel-container relative">
                            <div class="grow wheel-container h-full" 
                                bind:this={$wheelContainerStore} bind:clientWidth={wheelWidth}>
                            </div>
                            <div class="absolute top-0 right-0 h-full w-full z-10
                                flex align-center justify-center items-center">
                                {#if $resultStore !== undefined}
                                    <div class="result" on:click={() => { $resultStore = undefined }}>
                                        <!-- Basically copied from WheelOutcome -->
                                        <div class="flex flex-col">
                                            <div>{$resultStore.text ?? ""}</div>
                                            {#if $resultStore.effects !== undefined}
                                                {#each $resultStore.effects as effectData}
                                                    {@const effectText = generateOutcomeEffectLabel(effectData)}
                                                    <div class="caption whitespace-pre-wrap text-sm">• {effectText}</div>
                                                {/each}
                                            {/if}
                                        </div>

                                        <div class="text-sm mt-[1em] w-full text-center cursor-default">
                                            [ Click anywhere to close ]
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>
                        <div class="min-h-[1em] text-center">
                            {#if !allowedSpin}
                                Next spin available in {$nextSpinTimestampStore}
                            {/if}
                        </div>
                        <hr>
                    {/key}
                    <div class="w-full flex flex-row items-stretch space-x-4">
                        <div class="grow">
                            <div>Select</div>
                            <div class="caption mb-[0.5em]">Choose which wheel to spin with</div>
                            <div class="w-full">
                                <select class="form-control" bind:value={selectedWheelID}>
                                    {#each Object.entries($extendedWheelConfigStore.wheels) as [wheelKey, wheelData]}
                                        {#if wheelData.settings.disabled === false}
                                            <option value={wheelKey}>{wheelData.display}</option>
                                        {/if}
                                    {/each}
                                </select>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center ml-4 mr-4 space-y-[0.5em]
                            max-w-[12em]">
                            <button type="button" class="btn btn-primary btn-lg"
                                disabled={buttonDisabled || !allowedSpin}
                                on:click={spinTheWheel}>
                                <span>Spin the wheel!</span>
                            </button>
                        </div>
                    </div>
                    {#if !shouldHorizontal}
                        <!-- Temporarily no horizontal support -->
                    {/if}
                </div>
                {#if shouldHorizontal}
                    {@const totalPercentage = wheelData.outcomes.reduce((sum, data) => sum += parseFloat(data.percentage), 0)}
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
                        {#key selectedWheelID}
                            <div class="flex flex-row justify-between">
                                <div>
                                    <div>Outcomes</div>
                                    <div class="caption mb-2">
                                        View possible outcomes for the wheel
                                    </div>
                                </div>
                                <div class="text-right">
                                    {#if wheelData.settings.hiddenOutcomes === true}
                                        <div class="w-[14em] min-h-[1em]">❗ Outcomes Hidden ❗</div>
                                    {:else}
                                        {#if wheelData.settings.hiddenEffects === true}
                                            <div class="w-[14em] min-h-[1em]">❗ Effects Hidden ❗</div>
                                        {/if}
                                        {#if wheelData.settings.hiddenPercentages === true}
                                            <div class="w-[14em] min-h-[1em]">❗ Percentages Hidden ❗</div>
                                        {/if}
                                    {/if}
                                    
                                </div>
                            </div>
                            {#if wheelData.outcomes.length > 0}
                                <div class="card-content outcomes-list">
                                    <div class="flex flex-col space-y-1 items-stretch">
                                        {#key $extendedWheelConfigStore}
                                            {#each wheelData.outcomes as outcomeData, index}
                                                {@const colorIndex = index - Math.floor(index / wheelColors.length) * wheelColors.length}
                                                {@const outcomeColor = wheelColors[colorIndex]}
                                                <WheelOutcome outcomeData={outcomeData} 
                                                    settings={wheelData.settings}
                                                    userRole={userRole}
                                                    totalPercentage={totalPercentage}
                                                    color={outcomeColor} />
                                                {#if index !== wheelData.outcomes.length - 1}
                                                    <hr class="mt-0.5 mb-0.5">
                                                {/if}
                                            {/each}
                                        {/key}
                                    </div>
                                </div>
                            {/if}
                        {/key}
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

    .result {
        background-color: #3d3b4d;
        padding: 1em;
        border-radius: 16px;
        box-shadow: 0 4px 8px rgba(0,0,0,.2);
        border: 2px solid #64748b;
    }
</style>