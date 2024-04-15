<script lang="ts">
    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import Masonry from '$lib/components/Masonry.svelte';
    import chasterLogo from "$lib/resources/logo.png"
    import JigsawPuzzle from "$lib/components/JigsawPuzzle.svelte";
    import type { JigsawConfig, JigsawPuzzlesConfig, JigsawSaveData } from "$lib/scripts/signature-puzzle";
    import type { BackendResponseSignature } from "$lib/scripts/signature-backend";
    import { JigsawInstance } from "$lib/scripts/puzzle";
    import { hashSHA256 } from "$lib/scripts/utility";

    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";

    let initialLoadMessage: string = "Loading extension data...";
    let selectedExtensionKey = "jigsaw_puzzles";
    
    const jigsawPuzzlesConfigStore: Writable<JigsawPuzzlesConfig> = writable({ jigsaws: [] });
    const chosenJigsawConfigStore: Writable<JigsawConfig | undefined> = writable(undefined);
    const progressMappingStore: Writable<{ [key: string]: [number, number, string] }> = writable({});
    let configKeys: string[] = [];
    jigsawPuzzlesConfigStore.subscribe(async (data) => {
        const configs = data.jigsaws ?? [];
        configKeys = await Promise.all(configs.map(async (configData) => {
            const urlHash = await hashSHA256(configData.imageURL)
            const saveKey = `${urlHash}-${configData.rowColsRatio[0]}x${configData.rowColsRatio[1]}`;
            return saveKey;
        }));
    });

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

        // Retrieve data for jigsaw puzzles
        const jigsawPuzzlesMainResponse = await fetch(chasterUtilitiesURL, {
            method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "jigsaw_puzzles-page",
                mainToken: mainToken,
            })
        });
        if(jigsawPuzzlesMainResponse.status !== 200) {
            console.error(`Error retrieving session data: ${await jigsawPuzzlesMainResponse.text()}`);
            throw new Error("error retrieving session data");
        }
        const jigsawPuzzlesMainData: BackendResponseSignature["chaster_utilities"]["jigsaw_puzzles-page"] 
            = await jigsawPuzzlesMainResponse.json();
        $jigsawPuzzlesConfigStore = jigsawPuzzlesMainData.config;
        // $jigsawPuzzlesConfigStore = { 
        //     jigsaws: [
        //         { title: "A Hanging Predicament", thumbnailURL: "https://thumbs2.imgbox.com/88/bd/2K7pG5Ll_t.jpg", imageURL: "https://images2.imgbox.com/88/bd/2K7pG5Ll_o.jpg", 
        //         rowColsRatio: [9, 16, 3840 / 2160], settings: { rotation: 360, ghost: false, edge: false } },
        //         { title: "Silver Wolf's Retribution", thumbnailURL: "https://thumbs2.imgbox.com/c2/a4/hBbrFuUR_t.jpg", imageURL: "https://iili.io/JveHAH7.jpg", 
        //         rowColsRatio: [9, 16, 3840 / 2160], settings: { rotation: 360, ghost: false, edge: false } },
        //         { title: "A Cursed Misunderstanding", thumbnailURL: "https://thumbs2.imgbox.com/6c/30/BYliIfWX_t.png", imageURL: "https://images2.imgbox.com/6c/30/BYliIfWX_o.png", 
        //         rowColsRatio: [2, 2, 3840 / 2160], settings: { rotation: 360, ghost: false, edge: false } },
        //         { title: "Silver Wolf's Retribution", thumbnailURL: "https://thumbs2.imgbox.com/c2/a4/hBbrFuUR_t.jpg", imageURL: "https://iili.io/JveHAH7.jpg", 
        //         rowColsRatio: [9, 16, 3840 / 2160], settings: { rotation: 360, ghost: false, edge: false } },
        //     ]
        // }
        // $chosenJigsawConfigStore = $jigsawPuzzlesConfigStore.jigsaws[0];

        // Retrieve existing save data, mapping current progress to key
        // No mapping for jigsaws which don't have any progress data
        await refreshProgressData();

        initialLoadMessage = "";
        setTimeout(() => { refreshLayout() }, 1000);
    });

    // Refresh the progress data when returning to the main menu
    const jigsawInstances: JigsawInstance[] = [];
    async function refreshProgressData() {
        for(let index = 0; index < $jigsawPuzzlesConfigStore.jigsaws.length; index++) {
            const jigsawConfig = $jigsawPuzzlesConfigStore.jigsaws[index];
            const totalPieces = jigsawConfig.rowColsRatio[0] * jigsawConfig.rowColsRatio[1];
            if(jigsawInstances[index] === undefined) {
                console.log("new!")
                jigsawInstances[index] = new JigsawInstance(jigsawConfig, undefined as any, ""); // Dummy instance
            }
            const [saveKey, saveData] = await jigsawInstances[index].getSaveData();
            if(saveData === undefined) { continue; }
            const progressPercentage = (totalPieces - saveData.connections.length) / (totalPieces - 1);
            const progressElapsed = new Date(saveData.elapsedMS).toISOString().slice(11,19);
            $progressMappingStore[saveKey] = [saveData.connections.length, progressPercentage, progressElapsed];
            $progressMappingStore = $progressMappingStore;
        }
    }

    // When completed, send a request to the server with the completion data
    const completed = async (saveData: JigsawSaveData) => {
        const completionResponse = await fetch(chasterUtilitiesURL, {
            method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "jigsaw_puzzles-finish",
                mainToken: mainToken,
                config: $chosenJigsawConfigStore,
                save: saveData,
            })
        });
    }
    const saved = async (saveData?: JigsawSaveData) => {
        refreshProgressData();
    }
    const mainMenu = async (saveData?: JigsawSaveData) => {
        await refreshProgressData();
        $chosenJigsawConfigStore = undefined;
    }

    let refreshLayout: () => Promise<void>;
</script>
  
<div class="container-bg w-full flex flex-col items-stretch margin-0 min-h-full p-4">
    {#if initialLoadMessage !== ""}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else}
        <div class="relative w-full h-full">
            <!-- w-[65.5em]  -->
            <div class="absolute top-0 left-0 w-full flex flex-col card-wrapper-desktop space-y-[1em] h-full">
                <div class="flex flex-col items-center w-full">
                    <div class="card-content max-w-[80em]">
                        <div class="flex flex-row space-x-1 items-end justify-between mb-2">
                                <h4 class="mb-0">[🍓] Jigsaw Puzzles</h4>
                                <span class="caption">Developer: <a href="https://chaster.app/user/strawberria" target="_blank">@strawberria</a></span>
                            </div>
                        <div class="caption">
                            Configurable jigsaw puzzles supporting rotating pieces, image 'ghosting', and other features! <br>
                            • Number of pieces is automatically optimized on config creation based on target number of pieces <br>
                            • Currently whitelisted image hosters (hotlinking and thumbnail): <a target="_blank" href="https://imgbox.com">imgbox</a>, <a target="_blank" href="https://postimages.org">postimages</a> <br>
                            <b>(If you experience any performance issues especially when moving between puzzles, please refresh the page!)</b>
                        </div>
                    </div>
                </div>
                <!-- <div class="grid gap-[1.5em] grid-flow-row grid-cols-2"> -->
                <!-- <div class="flex flex-col flex-wrap grow min-h-0 gap-[1.5em] w-[0em]"> -->
                <!-- <div class="grid-masonry"> -->
                <Masonry bind:refreshLayout={refreshLayout} reset={false} colWidth="28em" gridGap="1em">
                    {#each $jigsawPuzzlesConfigStore.jigsaws as jigsawConfig, index}
                        {@const totalPieces = jigsawConfig.rowColsRatio[0] * jigsawConfig.rowColsRatio[1]}
                        {@const configProgress = $progressMappingStore[configKeys[index]] ?? [0, undefined]}
                        {@const progressDeg = configProgress[1] * 360}
                        <!-- background: conic-gradient(red 6deg, transparent 6deg 360deg); -->
                        <div class="card-content space-y-[0.75em] cursor-pointer card-hover"
                            class:hidden={$chosenJigsawConfigStore !== undefined}
                            on:click={() => { $chosenJigsawConfigStore = jigsawConfig }}>
                            <!-- <img class="aspect-square" src={jigsawConfig.thumbnailURL} /> -->
                            <div class="flex flex-col items-center">
                                <div class="relative aspect-video">
                                    <div class="absolute top-0 left-0 w-full h-full opacity-80 z-10"
                                        style={progressDeg !== 0 && configProgress[0] > 1 ? `background: conic-gradient(transparent ${progressDeg}deg, #292833 ${progressDeg}deg 360deg);` : ""} />
                                    <img class="block h-full w-full pie"
                                        class:blur-md={!jigsawConfig.settings.ghost && configProgress[0] !== 1} 
                                        style={!jigsawConfig.settings.ghost ? "clip-path: inset(0 0 0 0);" : ""}
                                        src={jigsawConfig.thumbnailURL ?? jigsawConfig.imageURL} />
                                    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                    {#if configProgress[0] === 1}
                                        <div class="absolute h-full w-full top-0 left-0 flex flex-col justify-center p-[2em]">
                                            <svg class="opacity-90" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                                viewBox="0 0 17.837 17.837" xml:space="preserve">
                                                <g>
                                                    <path style="fill:#10b981" d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
                                                        c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
                                                        L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"/>
                                                </g>
                                            </svg>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                            <div class="flex flex-col items-stretch w-full text-lg">
                                <div class="flex flex-row items-center text-xl">
                                    <div class="flex flex-row">
                                        {jigsawConfig.title} (<div>{totalPieces}</div>
                                        <svg class="h-6 aspect-square ml-[0.125em] mb-[0.125em]" 
                                            viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <defs>
                                                <path id="pp" d="M9.373,9.373C25.59,14.161,28.988,12.384,25.976,7.983C19.953-0.821,44.047-0.821,38.024,7.983C35.012,12.384,38.41,14.161,54.627,9.373C59.415,25.59,57.639,28.988,53.237,25.976C44.433,19.953,44.433,44.047,53.237,38.024C57.639,35.012,59.415,38.41,54.627,54.627C38.41,49.839,35.012,51.616,38.024,56.017C44.047,64.821,19.953,64.821,25.976,56.017C28.988,51.616,25.59,49.839,9.373,54.627C4.585,38.41,6.361,35.012,10.763,38.024C19.567,44.047,19.567,19.953,10.763,25.976C6.361,28.988,4.585,25.59,9.373,9.373z" />
                                                <linearGradient id="gr" gradientTransform="rotate(90)">
                                                <stop offset="0%" stop-color="#f6f6f6" />
                                                <stop offset="100%" stop-color="#eee" />
                                                </linearGradient>
                                                <clipPath id="cl">
                                                <use xlink:href="#pp" href="#pp" />
                                                </clipPath>
                                            </defs>
                                            <use xlink:href="#pp" href="#pp" fill="url(#gr)" clip-path="url(#cl)" stroke="#000" stroke-opacity="0.4" stroke-width="2.0" />
                                        </svg>)
                                    </div>
                                    <div class="grow" />
                                    {#if configProgress[2]}
                                        <div>{configProgress[2]}</div>
                                    {/if}
                                </div>
                                {#if jigsawConfig.settings.rotation % 360 !== 0}
                                    <div class="caption">• Rotation enabled: {jigsawConfig.settings.rotation}° increments</div>
                                {/if}
                                {#if !jigsawConfig.settings.ghost}
                                    <div class="caption">• ⚠️ Image ghosting disabled! ⚠️</div>
                                {/if}
                                {#if !jigsawConfig.settings.edge}
                                    <div class="caption">• ⚠️ Edge piece filtering disabled! ⚠️</div>
                                {/if}
                            </div>
                        </div>
                    {/each}
                    <!-- <PenaltyDisplay extensionLookup={{"key":"extended_wheel","what":"spin"}}
                        extensionData={{"_id": "123", "slug": "extended-wheel-of-fortune", "displayName": "[🍓] Extended Wheel of Fortune"}}
                        penaltyConfig={{"display": "Task Wheel", "required": 2, "interval": 3600000, "effects": []}}
                        penaltyData={{"lastPenaltyMS": 1709004606550, "current":1}} /> -->
                </Masonry>
            </div>
            {#if $chosenJigsawConfigStore !== undefined}
                <div class="absolute top-0 left-0 w-full h-full flex flex-col items-stretch border-2 border-slate-500">
                    <JigsawPuzzle jigsawConfig={$chosenJigsawConfigStore}
                        callbackCompletedExternal={completed} 
                        callbackSavedExternal={saved}
                        mainMenu={mainMenu} />
                </div>
            {/if}
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

    .card-hover:hover {
        background-color: #454357;
    }

    .grid-masonry {
        display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: masonry;
    }
</style>