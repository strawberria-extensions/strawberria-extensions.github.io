<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { JigsawInstance } from "$lib/scripts/puzzle";
    import type { JigsawConfig, JigsawSaveData } from "$lib/scripts/signature-puzzle";
    import { get } from "svelte/store";

    export let jigsawConfig: JigsawConfig;
    export let mainMenu: () => void;
    export let callbackCompletedExternal: (saveData: JigsawSaveData) => Promise<void>;
    export let callbackSavedExternal: (saveData?: JigsawSaveData) => Promise<void>;
    let containerDiv: HTMLDivElement;
    let instance: JigsawInstance;
    let timestamp: string;
    onMount(async () => {
        // instance = new JigsawInstance(parentDiv, TestImage, 6, `1`);
        const seed = "1";
        instance = new JigsawInstance(jigsawConfig, containerDiv, seed);
        instance.elapsedTimeMSStore.subscribe(elapsedMS => {
            timestamp = new Date(elapsedMS).toISOString().slice(11, 19);
        })
        instance.callbackCompleted = callbackCompleted;
        instance.callbackSaved = callbackSaved;
        await restartGame(false);
    });

    let confirmRestart = false;
    let completed = false;
    let completedTimestamp = "";
    let progress: number = 0; // 0 to 1
    async function restartGame(restart: boolean) {
        confirmRestart = false;
        completed = false;
        if(restart === false) {
            await instance.preInitialize();
        }
        await instance.initializeInstance(restart);
        await instance.generateJigsawPieces();
    }
    function callbackSaved(saveData?: JigsawSaveData) {
        if(saveData !== undefined) {
            const totalPieces = jigsawConfig.rowColsRatio[0] * jigsawConfig.rowColsRatio[1];
            const numContainers = saveData.connections.length;
            progress = (totalPieces - numContainers) / totalPieces;
        }

        callbackSavedExternal(saveData);
    }
    function callbackCompleted(saveData: JigsawSaveData, suppress: boolean = false) {
        if(suppress === false) { callbackCompletedExternal(saveData); }
        completed = true;
        completedTimestamp = new Date(saveData.elapsedMS).toISOString().slice(11, 19);
    }
    function preMainMenu() {
        instance.prepMainMenu();
        instance.application.stage.removeChildren();
        mainMenu();
    }
</script>

<div class="relative grow shrink-0">
    <div bind:this={containerDiv} class="absolute top-0 left-0 w-full h-full bg-[#2f2c3b]">
    </div>
    {#if confirmRestart === true}
        <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
            style="background-color: rgb(31 41 55 / 0.85)">
            <div class="flex flex-col items-center p-5 bg-gray-800 !opacity-100 space-y-[1.5em] rounded-lg border-gray-600 border-2">
                <div class="flex flex-col items-center justify-center">
                    <div class="text-xl">Are you sure you want to restart?</div>
                </div>
                <div class="flex flex-row space-x-[1em]">
                    <button class="bg-gray-600 p-2 px-4 rounded-[0.5em] hover:bg-gray-500 text-xl"
                        on:click={() => { restartGame(true); }}>
                        Restart
                    </button>
                    <button class="bg-gray-600 p-2 px-4 rounded-[0.5em] hover:bg-gray-500 text-xl"
                        on:click={() => { confirmRestart = false; }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    {:else if completed === true}
        <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
            style="background-color: rgb(31 41 55 / 0.85)">
            <div class="flex flex-col items-center p-5 bg-gray-800 !opacity-100 space-y-[1.5em] rounded-lg border-gray-600 border-2">
                <div class="flex flex-col items-center justify-center">
                    <div class="text-xl">
                        Jigsaw puzzle completed! 
                        Time elapsed: {timestamp}
                    </div>
                </div>
                <div class="flex flex-row space-x-[1em]">
                    <button class="bg-gray-600 p-2 px-4 rounded-[0.5em] hover:bg-gray-500 text-xl"
                        on:click={() => { restartGame(true); }}>
                        Restart
                    </button>
                    <button class="bg-gray-600 p-2 px-4 rounded-[0.5em] hover:bg-gray-500 text-xl"
                        on:click={() => { preMainMenu(); }}>
                        Main Menu
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
<div class="w-full flex flex-row text-xl bg-gray-700">
    <div class="flex flex-row grow">
        <button class="flex flex-col justify-center cursor-pointer hover:bg-gray-600 text-slate-300"
            on:click={() => { if(confirmRestart) { return; } preMainMenu(); }}>
            <i class="fas fa-arrow-left text-3xl text-center px-2" />
        </button>
        <button class="flex flex-col justify-center cursor-pointer hover:bg-gray-600 text-slate-300"
            on:click={() => { confirmRestart = true }}>
            <i class="fas fa-redo-alt text-3xl text-center px-2" />
        </button>
        <button class="flex flex-col justify-center cursor-pointer hover:bg-gray-600 text-slate-300"
            on:click={() => { if(confirmRestart) { return; } instance.shuffleContainers() }}>
            <i class="fas fa-random text-3xl text-center px-2" />
        </button>
    </div>
    <div class="flex flex-row p-[0.5em] items-center">
        {jigsawConfig.title} ｜{jigsawConfig.rowColsRatio[0] * jigsawConfig.rowColsRatio[1]}
        <svg class="h-6 aspect-square ml-[0.125em] mb-[0.125em]" 
            viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <path id="pp" d="M9.373,9.373C25.59,14.161,28.988,12.384,25.976,7.983C19.953-0.821,44.047-0.821,38.024,7.983C35.012,12.384,38.41,14.161,54.627,9.373C59.415,25.59,57.639,28.988,53.237,25.976C44.433,19.953,44.433,44.047,53.237,38.024C57.639,35.012,59.415,38.41,54.627,54.627C38.41,49.839,35.012,51.616,38.024,56.017C44.047,64.821,19.953,64.821,25.976,56.017C28.988,51.616,25.59,49.839,9.373,54.627C4.585,38.41,6.361,35.012,10.763,38.024C19.567,44.047,19.567,19.953,10.763,25.976C6.361,28.988,4.585,25.59,9.373,9.373z" />
                <!-- Why grr needed instead of gr?-->
                <linearGradient id="grr" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="#f6f6f6" />
                <stop offset="100%" stop-color="#eee" />
                </linearGradient>
                <clipPath id="cl">
                <use xlink:href="#pp" href="#pp" />
                </clipPath>
            </defs>
            <use xlink:href="#pp" href="#pp" fill="url(#grr)" clip-path="url(#cl)" stroke="#000" stroke-opacity="0.4" stroke-width="2.0" />
        </svg>｜{timestamp}
    </div>
    <div class="flex flex-row grow justify-end">
        <button class={`flex flex-col justify-center ${jigsawConfig.settings.ghost ? "cursor-pointer hover:bg-gray-600 text-slate-300" : "cursor-not-allowed text-slate-500"}`}
            disabled={jigsawConfig.settings.ghost === false}
            on:click={() => { if(confirmRestart) { return; } instance.toggleGhostVisibility() }}>
            <i class="fas fa-image-polaroid text-3xl text-center px-2" />
        </button>
        <button class={`flex flex-col justify-center ${jigsawConfig.settings.edge ? "cursor-pointer hover:bg-gray-600 text-slate-300" : "cursor-not-allowed text-slate-500"}`}
            disabled={jigsawConfig.settings.edge === false}
            on:click={() => { if(confirmRestart) { return; } instance.toggleEdgeVisibility() }}>
            <i class="fas fa-border-outer text-3xl text-center px-2" />
        </button>
        <!-- <button class="flex flex-col justify-center cursor-pointer hover:bg-gray-600 text-slate-300"
            on:click={() => { instance.onRotate() }}>
            <i class="fas fa-redo-alt text-3xl text-center px-2" />
        </button> -->
    </div>
</div>