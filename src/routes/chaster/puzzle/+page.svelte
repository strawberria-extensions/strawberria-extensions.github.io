<script lang="ts">
    import TestImage from "$lib/resources/test.png"
    import { onMount } from "svelte";
    import seedrandom from "seedrandom";
    import { Coordinate, transformCoordinateSet, workCoordinateSet, generateJigsawPieces } from "$lib/scripts/puzzle";

    const random = seedrandom("abc");
    // import { Stage, Layer, Rect } from 'svelte-konva';

    function generateBasePoints(): Coordinate[] {
        return [
            ...[new Coordinate(200, 200)],
            ...[
                new Coordinate(35, 8),
                new Coordinate(38, -2),
                new Coordinate(30, -12),
                new Coordinate(40, -20),
                new Coordinate(60, -20),
                new Coordinate(70, -12),
                new Coordinate(64, -2),
                new Coordinate(67, 8),
                new Coordinate(100, 0)
            ].map(v => new Coordinate(v.x * 5 + 200 + (Math.random() * 20 - 40), v.y * 5 + 200 + (Math.random() * 20 - 40)))
        ];
    }

    let canvas: HTMLCanvasElement;
    onMount(() => {
        const image = new Image();
        image.src = TestImage;
        image.crossOrigin = "anonymous";
        const ctx = canvas.getContext("2d");
        if(ctx === null) { return; }

        image.onload = () => {
            generateJigsawPieces(image, 200, canvas)
        }
        
    })
</script>
  
<div>
    <canvas bind:this={canvas} height={1290*2} width={1290*2} class="border-green-50"/>
</div>

<!-- <Stage config={{ width: 1000, height: 1000 }}>
    <Layer>
        <Rect config={{ x: 100, y: 100, width: 400, height: 200, fill: 'blue', draggable: true }} />
    </Layer>
</Stage> -->