<script lang="ts">
    import { onMount } from "svelte";
    import TestImage from "$lib/resources/test2.png"
    import { elapsedTimestampStore, generateRenderJigsaw } from "$lib/scripts/puzzle";

    let canvas: HTMLCanvasElement;
    let parentDiv: HTMLDivElement

    let ghostAllowed = true;
    onMount(async () => {
        const image = new Image();
        image.src = TestImage;
        image.crossOrigin = "anonymous";

        image.onload = async () => {
            await generateRenderJigsaw(parentDiv, TestImage, 6, 0);
        }
    })
</script>
  
<div class="w-full flex flex-col items-stretch margin-0 min-h-full m-[2em] border-2 border-slate-500">
    <div bind:this={parentDiv} class="grow shrink-0 bg-gray-800">
    </div>
    <div class="w-full flex flex-row space-x-[0.5em] text-xl bg-gray-700">
        <button class={`flex flex-col justify-center 
            ${ghostAllowed ? "cursor-pointer hover:bg-gray-600 text-slate-300" : "text-slate-500"}`}>
            <i class="fas fa-image text-4xl text-center px-2" />
        </button>
        <div class="grow" />
        <div class="p-[0.5em]">Time elapsed: {$elapsedTimestampStore}</div>
        <div class="grow" />
    </div>
</div>