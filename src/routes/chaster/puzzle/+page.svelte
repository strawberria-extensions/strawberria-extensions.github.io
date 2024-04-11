<script lang="ts">
    import { onMount } from "svelte";
    import TestImage from "$lib/resources/test.png"
    import { elapsedTimestampStore, generateRenderJigsaw } from "$lib/scripts/puzzle";

    let parentDiv: HTMLDivElement

    let ghostAllowed = true;
    onMount(async () => {
        const image = new Image();
        image.src = TestImage;
        image.crossOrigin = "anonymous";

        image.onload = async () => {
            await generateRenderJigsaw(parentDiv, TestImage, 4, 0);
        }
    })
</script>
  
<div class="w-full flex flex-col items-stretch margin-0 min-h-full m-[2em] border-2 border-slate-500">
    <div bind:this={parentDiv} class="grow shrink-0 bg-gray-800">
    </div>
    <div class="w-full flex flex-row text-xl bg-gray-700">
        <div class="flex flex-row grow">
            <button class={`flex flex-col justify-center 
                ${ghostAllowed ? "cursor-pointer hover:bg-gray-600 text-slate-300" : "text-slate-500"}`}>
                <i class="fas fa-redo-alt text-3xl text-center px-2" />
            </button>
            <button class="flex flex-col justify-center cursor-pointer hover:bg-gray-600 text-slate-300">
                <i class="fas fa-random text-3xl text-center px-2" />
            </button>
        </div>
        <div class="p-[0.5em]">Time elapsed: {$elapsedTimestampStore}</div>
        <div class="flex flex-row grow justify-end">
            <button class="flex flex-col justify-center cursor-pointer hover:bg-gray-600 text-slate-300">
                <i class="fas fa-image-polaroid text-3xl text-center px-2" />
            </button>
            <button class="flex flex-col justify-center cursor-pointer hover:bg-gray-600 text-slate-300">
                <i class="fas fa-border-outer text-3xl text-center px-2" />
            </button>
        </div>
    </div>
</div>