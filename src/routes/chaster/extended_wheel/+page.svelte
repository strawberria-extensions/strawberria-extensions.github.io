<script lang="ts">
    import { easeSinInOut } from 'd3-ease';
    import { onDestroy, onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import SvelteMarkdown from "svelte-markdown";
    import chasterLogo from "$lib/resources/logo.png"
    import tickAudioFile from "$lib/resources/tick.mp3";
    import wheelBgOverlayFile from "$lib/resources/wheel-bg-overlay.svg"
    import { Wheel } from '$lib/resources/spin-wheel-5.0.2.js';
    import WheelOutcome from "$lib/components/WheelOutcome.svelte";
    import { randomInt, sleep, truncateWords } from "$lib/scripts/utility";
    import type * as ExtendedWheel from "$lib/import/extension-extended_wheel";
    import type { ChasterUserRole } from '$lib/scripts/signature-chaster';
    import type { BackendResponseSignature } from '$lib/scripts/signature-backend';
    import { generateTimeString } from "$lib/scripts/utility";
    import { renderLockEffect } from '$lib/import/nunjucks';
    
    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";
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
    let keyholder: string | undefined = undefined;
    let extendedWheelConfigStore: Writable<ExtendedWheel.Config["config"]> = writable({ "wheels": {} });
    let extendedWheelCustomStore: Writable<ExtendedWheel.Custom["custom"]> = writable({});

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

        initialLoadMessage = "Retrieving extended wheel data...";

        const extendedMainPageData = await retrieveWheelConfig();
        keyholder = extendedMainPageData.keyholder;
        userRole = extendedMainPageData.userRole;
        $extendedWheelConfigStore = extendedMainPageData.config.config;
        $extendedWheelCustomStore = extendedMainPageData.customData.custom;
        selectedWheelID = Object.keys($extendedWheelConfigStore.wheels)
            .filter(key => keyholder || !$extendedWheelConfigStore.wheels[key].settings.disabled)[0]
            ?? undefined;

        initialLoadMessage = "";
    });

    let nextSpinTimestampStore: Writable<string> = writable("");
    function hasUsableOutcomes(wheelData: ExtendedWheel.WheelData | undefined): boolean {
        if(wheelData === undefined || wheelData.outcomes.length === 0) { return false; }
        const weights = wheelData.outcomes.map(outcome => Number.parseFloat(outcome.weight));
        return weights.every(weight => Number.isFinite(weight) && weight >= 0)
            && weights.reduce((sum, weight) => sum + weight, 0) > 0;
    }

    function getAvailableSpins(wheelID: string, nowMS: number = Date.now()): number {
        const wheelConfigData = $extendedWheelConfigStore.wheels[wheelID];
        if(wheelConfigData === undefined || wheelConfigData.regularity.mode === "unlimited") {
            return Infinity;
        }
        const wheelCustomData = $extendedWheelCustomStore[wheelID];
        const interval = wheelConfigData.regularity.interval;
        if(!Number.isFinite(interval) || interval <= 0) { return 0; }
        if(wheelConfigData.regularity.mode === "non_cumulative") {
            return wheelCustomData === undefined
                || nowMS - wheelCustomData.lastSpinMS >= interval ? 1 : 0;
        }

        const lastSpinMS = wheelCustomData?.lastSpinMS ?? 0;
        const lastTrackMS = wheelCustomData?.lastTrackMS ?? (lastSpinMS || nowMS);
        const initialSpins = wheelCustomData?.availableSpins ?? (lastSpinMS ? 0 : 1);
        const earnedSpins = Number.isFinite(interval) && interval > 0
            ? Math.max(0, Math.floor((nowMS - lastTrackMS) / interval))
            : 0;
        return initialSpins + earnedSpins;
    }

    function updateNextSpinTimestamp() {
        if(selectedWheelID === undefined) {
            $nextSpinTimestampStore = "";
            return;
        }
        const wheelConfigData = $extendedWheelConfigStore.wheels[selectedWheelID];
        if(wheelConfigData === undefined || getAvailableSpins(selectedWheelID) > 0) {
            $nextSpinTimestampStore = "";
            return;
        }
        const wheelCustomData = $extendedWheelCustomStore[selectedWheelID];
        const currentTimeMS = Date.now();
        const interval = wheelConfigData.regularity.interval;
        if(!Number.isFinite(interval) || interval <= 0) {
            $nextSpinTimestampStore = "Unavailable";
            return;
        }
        const checkpoint = wheelConfigData.regularity.mode === "cumulative"
            ? (wheelCustomData?.lastTrackMS ?? (wheelCustomData?.lastSpinMS || currentTimeMS))
            : (wheelCustomData?.lastSpinMS ?? 0);
        const elapsedIntervals = wheelConfigData.regularity.mode === "cumulative"
            ? Math.max(0, Math.floor((currentTimeMS - checkpoint) / interval))
            : 0;
        const nextSpinMS = checkpoint + (elapsedIntervals + 1) * interval;
        $nextSpinTimestampStore = generateTimeString(Math.max(0, Math.ceil((nextSpinMS - currentTimeMS) / 1000)));
    }

    let nextSpinInterval = 0;
    onMount(() => {
        nextSpinInterval = window.setInterval(updateNextSpinTimestamp, 200);
    });
    onDestroy(() => {
        window.clearInterval(nextSpinInterval);
        spinWheel?.remove();
    });
    extendedWheelConfigStore.subscribe(() => { updateNextSpinTimestamp(); });
    extendedWheelCustomStore.subscribe(() => { updateNextSpinTimestamp(); });
    $: { selectedWheelID; updateNextSpinTimestamp(); }

    // Wheel-related logic including spinning, etc.
    let wheelContainerStore: Writable<HTMLDivElement | undefined> = writable(undefined);
    let resultStore: Writable<ExtendedWheel.OutcomeResult | undefined> = writable(undefined)
    let spinDisabled = false;
    let spinWheel: any;
    let wheelOverlayImagePromise: Promise<HTMLImageElement> | undefined;
    function loadWheelOverlayImage(): Promise<HTMLImageElement> {
        if(wheelOverlayImagePromise !== undefined) { return wheelOverlayImagePromise; }
        wheelOverlayImagePromise = new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error("Unable to load the wheel overlay image."));
            image.src = wheelBgOverlayFile;
        });
        return wheelOverlayImagePromise;
    }
    let lastRotation: [string, number] = ["", 0];
    async function spinTheWheel() {
        if(selectedWheelID === undefined || spinWheel === undefined) { return; }
        const wheelData = $extendedWheelConfigStore.wheels[selectedWheelID];
        if(wheelData === undefined) { return; }
        if(!hasUsableOutcomes(wheelData)) { return; }

        spinDisabled = true;
        $resultStore = undefined;
        try {
            const spinningWheelID = selectedWheelID;
            const spinResultResponse = await fetch(chasterUtilitiesURL, {
                method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
                body: JSON.stringify({
                    action: "extended_wheel-spin",
                    mainToken: mainToken,
                    wheelID: spinningWheelID,
                })
            });
            if(!spinResultResponse.ok) {
                throw new Error(await spinResultResponse.text());
            }
            const spinResultData: BackendResponseSignature["chaster_utilities"]["extended-main-spin"] = await spinResultResponse.json();
            if(spinResultData.index === undefined) {
                spinResultData.index = randomInt(0, 16);
            }
            const itemCount = wheelData.settings.hiddenOutcomes ? unknownOutcomeData.length : wheelData.outcomes.length;
            if(!Number.isInteger(spinResultData.index) || spinResultData.index < 0 || spinResultData.index >= itemCount) {
                throw new Error(`The server returned an invalid wheel outcome index (${spinResultData.index}).`);
            }

            await new Promise<void>((resolve, reject) => {
                try {
                    spinWheel.spinToItem(spinResultData.index, 5000, false, 5, 1, easeSinInOut);
                    window.setTimeout(resolve, 5100);
                } catch(error) {
                    reject(error);
                }
            });
            $resultStore = spinResultData.result;
            lastRotation = [spinningWheelID, spinWheel.rotation];

            const extendedMainPageData = await retrieveWheelConfig();
            if(JSON.stringify($extendedWheelConfigStore) !== JSON.stringify(extendedMainPageData.config.config)) {
                if(extendedMainPageData.config.config.wheels[spinningWheelID] === undefined) {
                    selectedWheelID = Object.keys(extendedMainPageData.config.config.wheels)
                        .find(key => userRole === "keyholder" || !extendedMainPageData.config.config.wheels[key].settings.disabled);
                }
                $extendedWheelConfigStore = extendedMainPageData.config.config;
            }
            $extendedWheelCustomStore = extendedMainPageData.customData.custom;
        } catch(error) {
            console.error("Error spinning the extended wheel", error);
            alert(`Error spinning wheel, please contact @strawberria: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            spinDisabled = false;
        }
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
        const wheelID = selectedWheelID;
        const wheelContainer = $wheelContainerStore;
        if(wheelContainer === undefined) { return; }

        // Short delay so wheel is properly sized in container
        await sleep(10);
        if(selectedWheelID !== wheelID || $wheelContainerStore !== wheelContainer) { return; }

        const wheelData = $extendedWheelConfigStore.wheels[wheelID];
        if(wheelData === undefined) { return; }
        if(!hasUsableOutcomes(wheelData)) {
            spinWheel?.remove();
            spinWheel = undefined;
            wheelContainer.innerHTML = "";
            return;
        }
        const wheelOverlayImage = await loadWheelOverlayImage();
        if(selectedWheelID !== wheelID || $wheelContainerStore !== wheelContainer
            || $extendedWheelConfigStore.wheels[wheelID] !== wheelData) { return; }

        let items = JSON.parse(JSON.stringify(wheelData.outcomes.map(
            (outcomeData) => {
                const label = outcomeData.text ?? "";
                const truncatedLabel = [truncateWords(label, 24), label.length >= 32 ? "..." : ""].join("");
                const weight = parseFloat(outcomeData.weight);
                return { label: truncatedLabel, weight: weight };
            }
        )));
        if(wheelData.settings.hiddenOutcomes) {
            items = unknownOutcomeData;
        }

        let rotation: number = 0;
        if(lastRotation[0] == wheelID) {
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
            overlayImage: wheelOverlayImage,
            rotation: rotation,
        }

        spinWheel?.remove();
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

    (window as any).setConfig = function() {
        const configRaw = window.prompt("New config:");
        if(configRaw === null) { return }
        const config = JSON.parse(configRaw);
        if(config.wheels[selectedWheelID ?? ""] === undefined) {
            selectedWheelID = Object.keys(config.wheels)[0] ?? undefined;
        }
        $extendedWheelConfigStore = config; // Intensive?
    }

    // Store widths and heights for determining layout
    let wheelWidth: number;
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
    {:else if selectedWheelID !== undefined && $extendedWheelConfigStore.wheels[selectedWheelID] !== undefined}
        {@const wheelData = $extendedWheelConfigStore.wheels[selectedWheelID]}
        {@const buttonDisabled = spinDisabled || !hasUsableOutcomes(wheelData) || (wheelData.settings.disabled === true && userRole !== "keyholder")}
        {@const allowedSpin = (wheelData.regularity.mode === "unlimited" || getAvailableSpins(selectedWheelID) > 0 || $nextSpinTimestampStore === "" || userRole === "keyholder")}
        <div class="card-content grow" class:card-wrapper-desktop={shouldHorizontal}>
            <div class="w-full h-full flex flex-row">
                <div class="h-full flex flex-col" class:card-horizontal={shouldHorizontal}>
                    <div class="flex items-end justify-between mb-2"
                        class:flex-row={shouldHorizontal}
                        class:flex-col={!shouldHorizontal}
                        class:space-x-1={shouldHorizontal}
                        class:items-end={shouldHorizontal}>
                        <h4 class="mb-0">[🍓] Extended Wheel of Fortune</h4>
                        <span class="caption">Developer: <a href="https://chaster.app/user/strawberria" target="_blank">@strawberria</a></span>
                    </div>
                    <div class="caption mb-2">
                        Try your luck and spin the <b>extended</b> wheel of fortune! <br>
                        Now supporting additional actions and multiple wheels with individual cooldowns!
                    </div>
                    {#key selectedWheelID}
                        <div class="grow mt-1 wheel-container relative">
                            <div class="grow wheel-container h-full" 
                                class:aspect-square={!shouldHorizontal}
                                bind:this={$wheelContainerStore} bind:clientWidth={wheelWidth}>
                            </div>
                            <div class="absolute top-0 right-0 h-full w-full z-10
                                flex align-center justify-center items-center"
                                class:aspect-square={!shouldHorizontal}>
                                {#if $resultStore !== undefined}
                                    <div class="result" role="button" tabindex="0"
                                        on:click={() => { $resultStore = undefined }}
                                        on:keydown={(event) => {
                                            if(event.key === "Enter" || event.key === " ") {
                                                event.preventDefault();
                                                $resultStore = undefined;
                                            }
                                        }}>
                                        <!-- Basically copied from WheelOutcome -->
                                        <div class="flex flex-col">
                                            <div class="mb-[0.25em]">{$resultStore.text ?? ""}</div>
                                            {#if $resultStore.effects.length > 0}
                                                <ul class="list">
                                                    {#each $resultStore.effects as effectData}
                                                        {#if !effectData.hidden}
                                                            {@const effectText = renderLockEffect(effectData)}
                                                            <li class="caption whitespace-pre-wrap text-sm">
                                                                <SvelteMarkdown source={effectText} isInline />   
                                                            </li>
                                                        {/if}
                                                    {/each}
                                                </ul>
                                            {/if}
                                        </div>
                                        <div class="text-sm mt-[1em] w-full text-center cursor-default">
                                            [ Click anywhere to close ]
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>
                        <p class="min-h-[1em] text-center">
                            {#if wheelData.regularity.mode === "cumulative" && userRole !== "keyholder"}
                                Available spins: {getAvailableSpins(selectedWheelID)}
                                {#if !allowedSpin}<br>{/if}
                            {/if}
                            {#if !allowedSpin}
                                {#if $nextSpinTimestampStore === "Unavailable"}
                                    Spin cooldown is misconfigured.
                                {:else}
                                    Next spin available in {$nextSpinTimestampStore}
                                {/if}
                            {:else if !hasUsableOutcomes(wheelData)}
                                This wheel has no valid outcomes configured.
                            {/if}
                        </p>
                        <hr>
                    {/key}
                    <div class="w-full flex flex-row items-stretch space-x-4">
                        <div class="grow">
                            <div>Select</div>
                            <div class="caption mb-[0.5em]">Choose which wheel to spin with</div>
                            <div class="w-full">
                                <select class="form-control" bind:value={selectedWheelID} disabled={buttonDisabled || !allowedSpin}>
                                    {#each Object.entries($extendedWheelConfigStore.wheels) as [wheelKey, wheelData]}
                                        {#if userRole === "keyholder" || wheelData.settings.disabled === false}
                                            <option value={wheelKey}>{wheelData.display}</option>
                                        {/if}
                                    {/each}
                                </select>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center space-y-[0.5em] max-w-[12em]"
                            class:mx-4={shouldHorizontal}
                            class:mx-2={!shouldHorizontal}>
                            <button type="button" class="btn btn-primary btn-lg"
                                disabled={buttonDisabled || !allowedSpin}
                                on:click={spinTheWheel}>
                                <span>Spin{shouldHorizontal ? " the wheel" : ""}!</span>
                            </button>
                        </div>
                    </div>
                    {#if !shouldHorizontal}
                        {@const totalPercentage = wheelData.outcomes.reduce((sum, data) => sum += parseFloat(data.weight), 0)}
                        <hr>
                        <div class="h-full flex flex-col">
                            {#key selectedWheelID}
                                {#if wheelData.note !== undefined}
                                    {@const lines = wheelData.note.trim().split("\n")}
                                    <div class="space-y-[0.375em]">
                                        {#each lines as line}
                                            <div class="caption leading-5">
                                                <SvelteMarkdown source={line} isInline />   
                                            </div>
                                        {/each}
                                        {#if keyholder}
                                            <div class="text-right">Signed, {keyholder}~</div>
                                        {/if}
                                    </div>
                                    <hr>
                                {/if}
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
                                            {#if wheelData.settings.hiddenWeights === true}
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
                {#if shouldHorizontal}
                    {@const totalPercentage = wheelData.outcomes.reduce((sum, data) => sum += parseFloat(data.weight), 0)}
                    <div class="h-full flex flex-col ml-4 w-[40em]">
                        <!-- style={`width: calc(${wheelWidth * 1.2}px * 1.0)`} -->
                        <!-- <div class={`flex flex-row flex-start items-center ${renderOAuth ? "justify-between" : "justify-start"}`}>
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
                        <hr> -->
                        {#key selectedWheelID}
                            <!-- {#if userRole == "keyholder"}
                                <button on:click={window.setConfig}>[ Debug - Simulate Config ]</button>
                                <hr>
                            {/if} -->
                            {#if wheelData.note !== undefined}
                                {@const lines = wheelData.note.split("\n")}
                                <div class="space-y-[0.5em]">
                                    {#each lines as line}
                                        <div class="caption leading-5">
                                            <SvelteMarkdown source={line} isInline />   
                                        </div>
                                    {/each}
                                    <!-- <div class="text-right">Signed, {keyholder}~</div> -->
                                </div>
                                <hr>
                            {/if}
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
                                        {#if wheelData.settings.hiddenWeights === true}
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
    {:else}
        <div class="w-full h-full flex items-center justify-center text-center caption">
            No wheels are available for this lock.
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
    
    .list {
        list-style: inside;
        list-style-position: outside;
        margin-left: 1em;
        margin-bottom: 0;
    }
</style>
