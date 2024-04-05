<script lang="ts">
    import { onMount } from "svelte";
    import TestImage from "$lib/resources/test.png"
    import { elapsedTimestampStore, generateRenderJigsaw } from "$lib/scripts/puzzle";

    let canvas: HTMLCanvasElement;
    let parentDiv: HTMLDivElement

    onMount(async () => {
        const image = new Image();
        image.src = TestImage;
        image.crossOrigin = "anonymous";

        image.onload = async () => {
            await generateRenderJigsaw(parentDiv, TestImage, 4, new Date().getTime());
        }
    })
</script>
  
<div class="w-full flex flex-col items-stretch margin-0 min-h-full m-[2em] border-2 border-slate-500">
    <div bind:this={parentDiv} class="grow shrink-0 bg-gray-800">
    </div>
    <div class="w-full flex flex-row space-x-[0.5em] justify-center text-xl bg-gray-700 p-[0.25em] text-slate-300 bg-slate-">
        Time elapsed: {$elapsedTimestampStore}
    </div>
</div>

<!-- <Stage config={{ width: 1000, height: 1000 }}>
    <Layer>
        <Rect config={{ x: 100, y: 100, width: 400, height: 200, fill: 'blue', draggable: true }} />
    </Layer>
</Stage> -->