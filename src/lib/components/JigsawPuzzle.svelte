<script lang="ts">
    import { onMount } from "svelte";
    import { elapsedTimestampStore, JigsawInstance } from "$lib/scripts/puzzle";
    import type { JigsawConfig, JigsawSaveData } from "$lib/scripts/signature-puzzle";

    export let jigsawConfig: JigsawConfig;
    export let callbackCompleted: (encrypted: string) => Promise<void>;
    let containerDiv: HTMLDivElement;
    let instance: JigsawInstance;

    let ghostAllowed = false;
    let edgeAllowed = true;
    onMount(async () => {
        // instance = new JigsawInstance(parentDiv, TestImage, 6, `1`);
        const seed = "1";
        instance = new JigsawInstance(jigsawConfig, containerDiv, seed);
        instance.callbackCompleted = callbackCompleted;
        await restartGame(false);
    });

    let restartInProgress = false;
    async function restartGame(restart: boolean) {
        restartInProgress = true;
        if(restart === false) {
            await instance.preInitialize();
        }
        await instance.initializeInstance(restart);
        await instance.generateJigsawPieces();
        restartInProgress = false;
    }
</script>

<div bind:this={containerDiv} class="grow shrink-0 bg-gray-800">
</div>
<div class="w-full flex flex-row text-xl bg-gray-700">
    <div class="flex flex-row grow">
        <button class={`flex flex-col justify-center ${ghostAllowed ? "cursor-pointer hover:bg-gray-600 text-slate-300" : "cursor-not-allowed text-slate-500"}`}
            disabled={ghostAllowed === false}
            on:click={() => { instance.toggleGhostVisibility() }}>
            <i class="fas fa-image-polaroid text-3xl text-center px-2" />
        </button>
        <button class={`flex flex-col justify-center ${edgeAllowed ? "cursor-pointer hover:bg-gray-600 text-slate-300" : "cursor-not-allowed text-slate-500"}`}
            disabled={edgeAllowed === false}
            on:click={() => { instance.toggleEdgeVisibility() }}>
            <i class="fas fa-border-outer text-3xl text-center px-2" />
        </button>
        <button class="flex flex-col justify-center cursor-pointer hover:bg-gray-600 text-slate-300"
            on:click={() => { instance.shuffleContainers() }}>
            <i class="fas fa-random text-3xl text-center px-2" />
        </button>
        <!-- <button class="flex flex-col justify-center cursor-pointer hover:bg-gray-600 text-slate-300"
            on:click={() => { instance.onRotate() }}>
            <i class="fas fa-redo-alt text-3xl text-center px-2" />
        </button> -->
    </div>
    <div class="p-[0.5em]">Time elapsed: {$elapsedTimestampStore}</div>
    <div class="flex flex-row grow justify-end">
        <button class={`flex flex-col justify-center ${!restartInProgress ? "cursor-pointer hover:bg-gray-600 text-slate-300" : "cursor-not-allowed text-slate-500"}`}
            disabled={restartInProgress === true}
            on:click={() => { restartGame(true) }}>
            <i class="fas fa-trash-alt text-3xl text-center px-2" />
        </button>
    </div>
</div>