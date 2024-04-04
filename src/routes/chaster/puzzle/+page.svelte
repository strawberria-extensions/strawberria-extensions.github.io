<script lang="ts">
    import { onMount } from "svelte";
    import TestImage from "$lib/resources/test.png"
    import { generateRenderJigsaw } from "$lib/scripts/puzzle";

    let canvas: HTMLCanvasElement;
    let parentDiv: HTMLDivElement

    onMount(async () => {

        const image = new Image();
        image.src = TestImage;
        image.crossOrigin = "anonymous";

        image.onload = async () => {
            await generateRenderJigsaw(parentDiv, TestImage, 150);
        }
        
    })
</script>
  
<div class="w-full flex flex-col items-stretch margin-0 min-h-full">
    <div bind:this={parentDiv} class="grow shrink-0 m-8">
    </div>
</div>

<!-- <Stage config={{ width: 1000, height: 1000 }}>
    <Layer>
        <Rect config={{ x: 100, y: 100, width: 400, height: 200, fill: 'blue', draggable: true }} />
    </Layer>
</Stage> -->