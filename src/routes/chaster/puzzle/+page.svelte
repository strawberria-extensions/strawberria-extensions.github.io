<script lang="ts">
    import TestImage from "$lib/resources/test.png";
    import { onMount } from "svelte";
    
    let canvas: HTMLCanvasElement;
    onMount(() => {
        const ctx = canvas.getContext("2d");
        if(!ctx) { return; }
        const image = new Image();
        image.src = TestImage;
        image.crossOrigin = "anonymous";

        image.onload = () => {
            // ctx.drawImage(image, 0, 0);
            const rows = 7;
            const cols = 7;
            for(let row = 1; row < rows; row++) {
                const yCoord = canvas.height / rows * row;
                const iter = canvas.width / (cols + 1);
                const vertexes = Array.from({ length: cols }, (_, i) => i)
                    .map(index => {
                        const vertexX = iter * (index + 1) + (iter / 8 - Math.random() * iter / 4);
                        const vertexY = yCoord + (iter / 4 - Math.random() * iter / 2);
                        return [vertexX, vertexY];
                    });
                ctx.strokeStyle = "green";
                ctx.beginPath();
                ctx.moveTo(0, yCoord);
                ctx.lineTo(canvas.width, yCoord);
                ctx.stroke();
                ctx.strokeStyle = "blue";
                const tempVertexes = [[0, yCoord], ...vertexes, [canvas.width, yCoord]];
                tempVertexes.forEach(([x, y]) => {
                    ctx.beginPath();
                    ctx.arc(x, y, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                });
                ctx.strokeStyle = "red";
                ctx.beginPath();
                ctx.moveTo(0, yCoord);
                for(let index = 0; index < tempVertexes.length - 1; index++) {
                    const currentVertex = tempVertexes[index + 1];
                    const previousVertex = tempVertexes[index];
                    const xc = (currentVertex[0] + previousVertex[0]) / 2;
                    const yc = (currentVertex[1] + previousVertex[1]) / 2;
                    ctx.quadraticCurveTo(previousVertex[0], previousVertex[1], xc, yc);
                }
                ctx.lineTo(tempVertexes[tempVertexes.length - 1][0], tempVertexes[tempVertexes.length - 1][1])
                ctx.stroke();
            }
        }
    });
</script>

<div class="container-bg w-full h-screen p-4">
    <canvas id="canvas" width=700 height=700 class="bg-slate-200 border-2 border-gray-400" bind:this={canvas}></canvas>
</div>