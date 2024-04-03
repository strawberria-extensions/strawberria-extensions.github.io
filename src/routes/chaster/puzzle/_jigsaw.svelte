<script lang="ts">
    import TestImage from "$lib/resources/test.png";
    import { onMount } from "svelte";
    
    let gridPixels = 150;
    let coordinatesArray: number[][][] = [];

    let canvas: HTMLCanvasElement;
    onMount(() => {
        const ctx = canvas.getContext("2d");
        if(!ctx) { return; }
        const image = new Image();
        image.src = TestImage;
        image.crossOrigin = "anonymous";

        image.onload = () => {
            // Generate coordinates array with randomization - negatives and overflows are normalized
            const numRows = Math.floor(image.naturalHeight / gridPixels);
            const iterRow = canvas.height / numRows;
            const numCols = Math.floor(image.naturalWidth / gridPixels);
            const iterCol = canvas.width / numCols;
            for(let row = 0; row < numRows + 1; row++) {
                for(let col = 0; col < numCols + 1; col++) {
                    let randomXCoord = col * iterCol + (iterCol / 6 - Math.random() * iterCol / 3);
                    let randomYCoord = row * iterRow + (iterRow / 6 - Math.random() * iterRow / 3);
                    // Normalize coordinate if any values are negative or above maximum
                    if(randomXCoord < 0 || col == 0) { randomXCoord = 0; } 
                    else if(randomXCoord > canvas.width || col == numCols) { randomXCoord = canvas.width; } 
                    if(randomYCoord < 0 || row == 0) { randomYCoord = 0; } 
                    else if(randomYCoord > canvas.height || row == numRows) { randomYCoord = canvas.height; } 
                    // Store values in coordinates array after generating
                    if(coordinatesArray[row] === undefined) { coordinatesArray[row] = []; }
                    coordinatesArray[row][col] = [randomXCoord, randomYCoord];

                    ctx.strokeStyle = "green";
                    ctx.beginPath();
                    ctx.arc(randomXCoord, randomYCoord, 5, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            // Perform per-row and per-column (todo: merge)
            for(let row = 0; row < numRows; row++) {
                let yCoord = row * iterRow;

                // Perform line drawing to show grids before randomization
                ctx.strokeStyle = "blue";
                // ctx.beginPath();
                // ctx.moveTo(0, yCoord);
                // ctx.lineTo(canvas.width, yCoord);
                // ctx.stroke();

                // Draw curves through each row
                ctx.strokeStyle = "red";
                const rowCoordinates = coordinatesArray[row];
                ctx.beginPath();
                ctx.moveTo(rowCoordinates[0][0], rowCoordinates[0][1])
                for(let index = 0; index < rowCoordinates.length - 1; index++) {
                    const previousCoordinates = rowCoordinates[index];
                    const currentCoordinates = rowCoordinates[index + 1];
                    const xc = (currentCoordinates[0] + previousCoordinates[0]) / 2;
                    const yc = (currentCoordinates[1] + previousCoordinates[1]) / 2;
                    ctx.quadraticCurveTo(previousCoordinates[0], previousCoordinates[1], xc, yc);
                }
                ctx.lineTo(rowCoordinates[rowCoordinates.length - 1][0], rowCoordinates[rowCoordinates.length - 1][1]);
                ctx.stroke();
            }
            for(let col = 0; col < numCols; col++) {
                let xCoord = col * iterCol;

                // Perform line drawing to show grids before randomization
                ctx.strokeStyle = "blue";
                // ctx.beginPath();
                // ctx.moveTo(xCoord, 0);
                // ctx.lineTo(xCoord, canvas.height);
                // ctx.stroke();

                // Draw curves through each column
                ctx.strokeStyle = "red";
                const colCoordinates = coordinatesArray.map(arr => arr[col]);
                ctx.beginPath();
                ctx.moveTo(colCoordinates[0][0], colCoordinates[0][1])
                for(let index = 0; index < colCoordinates.length - 1; index++) {
                    const previousCoordinates = colCoordinates[index];
                    const currentCoordinates = colCoordinates[index + 1];
                    const xc = (currentCoordinates[0] + previousCoordinates[0]) / 2;
                    const yc = (currentCoordinates[1] + previousCoordinates[1]) / 2;
                    ctx.quadraticCurveTo(previousCoordinates[0], previousCoordinates[1], xc, yc);
                }
                ctx.lineTo(colCoordinates[colCoordinates.length - 1][0], colCoordinates[colCoordinates.length - 1][1]);
                ctx.stroke();
            } 
            
            const pngURL = canvas.toDataURL();
            console.log(pngURL);
        }
    });
</script>

<div class="container-bg w-full h-screen p-4">
    <canvas id="canvas" width=700 height=700 class="bg-slate-200" bind:this={canvas}></canvas>
</div>