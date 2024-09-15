<script lang="ts">
    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import chasterLogo from "$lib/resources/logo.png"
    import PlayingCard from "$lib/resources/playing_card.png";
    import type { KeyHuntCardType, KeyHuntConfig_User, KeyHuntCustom_User, KeyHuntCustomCard } from "$lib/scripts/signature-key_hunt";
    import type { ChasterUserRole } from "$lib/scripts/signature-chaster";
    import type { BackendResponseSignature } from "$lib/scripts/signature-backend";

    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";
    const cardMappings: { [key: string]: [string, string, string] } = {
        // Mapping from key to emoji and background color
        "key": ["🔑", "#10b981", "Key"],
        "red": ["⌛", "#ef4444", "Miss"],
        "sticky": ["⌛", "#f97316", "Sticky"],
        "yellow": ["🎲", "#fde047", "Random"],
        "reset": ["🔄", "#0ea5e9", "Reset"],
        "freeze": ["❄️", "#22d3ee", "Freeze"],
        "multiply": ["✖️", "#a855f7", "Multiply"]
    }

    let initialLoadMessage: string = "Loading extension data...";
    let selectedExtensionKey = "key_hunt";

    let mainToken = "";
    let userRole: ChasterUserRole = "keyholder";
    const keyHuntConfigStore: Writable<KeyHuntConfig_User> = writable();
    const keyHuntCustomStore: Writable<KeyHuntCustom_User> = writable();
    const keyHuntCountStore: Writable<number | undefined> = writable();
    const chosenCardStore: Writable<[KeyHuntCardType, KeyHuntCustomCard | undefined] | undefined> = writable(undefined);

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

        initialLoadMessage = "Retrieving key hunt data...";

        const keyHuntMainPageResponse = await fetch(chasterUtilitiesURL, {
            method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "key_hunt-page",
                mainToken: mainToken,
            })
        });
        if(keyHuntMainPageResponse.status !== 200) {
            console.error(`Error retrieving session data: ${await keyHuntMainPageResponse.text()}`);
            throw new Error("error retrieving session data")
        }
        const keyHuntMainPageData: BackendResponseSignature["chaster_utilities"]["key_hunt-page"] = await keyHuntMainPageResponse.json();
        userRole = keyHuntMainPageData.userRole;
        $keyHuntConfigStore = keyHuntMainPageData.config;
        $keyHuntCustomStore = keyHuntMainPageData.customData;
        $keyHuntCountStore = keyHuntMainPageData.count;

        initialLoadMessage = "";
    });

    let flipping = false; // Don't allow click overlaps
    let flippedIndex: number | undefined = undefined;
    let showIndex: number | undefined = undefined;
    let tempNewCount: number | undefined = undefined;
    function handleFlipCard(index: number, update: boolean = false) {
        if(flipping === true) { return; }
        flipping = true;
        setTimeout(() => { flipping = false }, 800);

        if(flippedIndex === index) {
            // Delay for flip animation
            flippedIndex = undefined;
            setTimeout(() => { 
                showIndex = undefined;  
                if(update) { $keyHuntCountStore = tempNewCount; }
            }, 800);
        } else {
            showIndex = index; 
            flippedIndex = index;
        }
    }

    let pickDisabled: boolean = false;
    async function pickCard(index: number) {
        if(pickDisabled === true) { return; }
        if(flippedIndex === index) { 
            handleFlipCard(index, true); 
            return; 
        }
        pickDisabled = true;

        const pickResultResponse = await fetch(chasterUtilitiesURL, {
            method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "key_hunt-pick",
                mainToken: mainToken,
                index
            })
        });
        if(pickResultResponse.status > 200) {
            alert(`Error picking card, please contact @strawberria: ${await pickResultResponse.text()}`);
            return;
        }
        const pickResultData: BackendResponseSignature["chaster_utilities"]["key_hunt-pick"] = await pickResultResponse.json();
        $keyHuntCustomStore = pickResultData.customData;
        tempNewCount = pickResultData.count; // Only update when flipped back
        $chosenCardStore = [pickResultData.chosenCardType, pickResultData.chosenCardCustom];

        pickDisabled = false;
        handleFlipCard(index);
    }

    // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    function colorIsDarkSimple(bgColor: string) {
        let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        let r = parseInt(color.substring(0, 2), 16); // hexToR
        let g = parseInt(color.substring(2, 4), 16); // hexToG
        let b = parseInt(color.substring(4, 6), 16); // hexToB
        return ((r * 0.299) + (g * 0.587) + (b * 0.114)) <= 186;
    }
</script>
  
<div class="container-bg w-full flex flex-col items-stretch margin-0 min-h-full p-4">
    {#if initialLoadMessage !== ""}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else}
        <div class="text-xl">
            {#if $keyHuntConfigStore.settings.detail === "hidden"}
                ??? Cards Remaining
            {:else}
                {$keyHuntCustomStore.remaining.reduce((sum, cardCountData) => sum += cardCountData.count, 0)} Cards Remaining
            {/if}
        </div>
        <div class="w-full h-full relative">
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="h-full w-full flex flex-col flex-wrap items-center justify-center overflow-x-auto">
                    {#each { length: ($keyHuntCountStore ?? 32) } as _, index}
                        <div class="w-[7.5em] h-[10.5em] m-[1em] flip-card"
                            class:flip-card-flipped={index === flippedIndex && index === showIndex}
                            on:click={() => { pickCard(index); }}>
                            <div class="flip-card-inner">
                                <div class="flip-card-front flex flex-col items-center justify-center"
                                    style={`background-image: url(${PlayingCard})`}>
                                </div>
                                <div class="flip-card-back">
                                    {#if showIndex === index && $chosenCardStore !== undefined}
                                        {@const defaultCardData = cardMappings[$chosenCardStore[0]]}
                                        <div class="w-full h-full flex flex-col items-center justify-center rounded-[0.3em]"
                                            style={`background-color: ${$chosenCardStore[0] !== "custom" ? defaultCardData[1] : $chosenCardStore[1]?.color}`}>
                                            {#if $chosenCardStore[0] === "custom" && $chosenCardStore[1] !== undefined}
                                                <div class="text-2xl">{$chosenCardStore[1].emoji}</div>
                                                <div class="text-xl font-semibold" style={`color: ${colorIsDarkSimple($chosenCardStore[1].color) ? "white" : "black"}`}>
                                                    {$chosenCardStore[1].name}
                                                </div>
                                            {:else}
                                                <div class="text-2xl">{defaultCardData[0]}</div>
                                                <div class="text-xl font-semibold" style={`color: ${colorIsDarkSimple(defaultCardData[1]) ? "white" : "black"}`}>
                                                    {defaultCardData[2]}
                                                </div>
                                            {/if}
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
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

    .flip-card {
        background: transparent;
        perspective: 50em;
    }
    .flip-card-inner {
        position:        relative;
        width:           100%;
        height:          100%;
        transition:      transform 0.8s;
        transform-style: preserve-3d;
        cursor:          pointer;
    }
    .flip-card-flipped .flip-card-inner {
        transform: rotateY(180deg);
    }
    .flip-card-front, .flip-card-back {
        position:                    absolute;
        width:                       100%;
        height:                      100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility:         hidden;
    }
    .flip-card-front {
        /* background-color: #ef4444; */
        color: black;
        background-position: center;
        background-size: cover;
    }
    .flip-card-back {
        background-color: dodgerblue;
        color: white;
        transform: rotateY(180deg);
        border: 0.1875em solid white;
    }
    .flip-card-front, .flip-card-back {
        border-radius: 0.4em;
        user-select: none;
        /* border: 0.1875em solid #eee; */
        outline: 1px solid transparent;
    }
</style>