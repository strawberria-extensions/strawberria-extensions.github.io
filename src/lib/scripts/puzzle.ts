import SnapSound from "$lib/resources/snap.mp3";
import CompleteSound from "$lib/resources/upgrade.mp3";
import seedrandom from "seedrandom";
import * as PIXI from "pixi.js"
import * as XXH from "xxhashjs";
import { writable, type Writable } from "svelte/store";
import { generateTimeString, sleep } from "./utility";

let startTimeMS = -1;
// let startTimeMS = -1;
export let elapsedTimestampStore: Writable<string> = writable("");
setInterval(() => {
    if(startTimeMS === -1) { return; }
    const diffMS = new Date().getTime() - startTimeMS;
    elapsedTimestampStore.set(new Date(diffMS).toISOString().slice(11,19))
}, 100);

// Constants for fine-tuning
const maxRowCols = 30;
const weightAspectRatio = 10; // WIP ratios
const weightPieces = 0.05;    // WIP ratios
const vertexVarianceMultiplier = 0.1;
const jigsawSizeRatio = 0.8;
const jigsawPlaceErrorRatio = 0.05;
const rotationInterval = 30; // 30 degrees
const jigsawBezierData: [PIXI.Point, [number, number], [number, number]][] = [
    // Bezier point, X variance, Y variance
    [new PIXI.Point(0, 0), [0, 0], [0, 0]],
    [new PIXI.Point(0.30,  0.08), [-0.025, 0.05], [-0.025, 0.025]],
    [new PIXI.Point(0.40, -0.02), [-0.025, 0.025], [0, 0]],
    [new PIXI.Point(0.30, -0.12), [-0.025, 0.025], [0, 0]],
    [new PIXI.Point(0.40, -0.24), [-0.025, 0.025], [0, 0.05]],
    [new PIXI.Point(0.60, -0.24), [-0.025, 0.025], [0, 0.05]],
    [new PIXI.Point(0.70, -0.12), [-0.025, 0.025], [0, 0]],
    [new PIXI.Point(0.60, -0.02), [-0.025, 0.025], [0, 0]],
    [new PIXI.Point(0.70,  0.08), [-0.050, 0.025], [-0.025, 0.025]],
    [new PIXI.Point(1, 0), [0, 0], [0, 0]],
]; 
const reflectedJigsawBezierData: typeof jigsawBezierData = jigsawBezierData
    .map(data => [new PIXI.Point(data[0].x, -data[0].y), data[1], data[2]]);

interface JigsawPieceData {
    center:       PIXI.Point;
    texture:      PIXI.Texture;
    mask:         PIXI.Graphics;
};
class JigsawSprite extends PIXI.Sprite {
    row: number = -1;
    col: number = -1;
}
type ActionType = "dragStart" | "dragEnd" | "right";

// Setup and render jigsaw puzzle pieces from image using invisible or provided canvas
// - Initialize seeded random number generator from SHA256 of image base64 representation
// - Generate random vertex points for jigsaw puzzle pieces within paper (TODO: non-standard jigsaw)
const debugDraw = false;
export async function generateRenderJigsaw(containerDiv: HTMLDivElement, imageSrc: string, targetPieces: number, seed: number) {
    // Generate base64 representation of image source before hashing compressed jpg representation (string size)
    const imageTexture: PIXI.Texture = await PIXI.Assets.load(imageSrc);
    imageTexture.source.autoGenerateMipmaps = true;
    imageTexture.source.antialias = true;
    const jigsawApplication = new PIXI.Application();
    await jigsawApplication.init({ width: containerDiv.clientWidth, height: containerDiv.clientHeight });
    const jigsawBackground = new PIXI.BackgroundSystem();
    jigsawBackground.color = "#1f2937";
    jigsawApplication.renderer.background = jigsawBackground;

    containerDiv.appendChild(jigsawApplication.canvas);
    // jigsawApplication.canvas.width = "100%"
    const imageB64 = await jigsawApplication.renderer.extract.base64({ target: imageTexture, format: "jpg", quality: 0.5 });
    const imageHash = await XXH.h64(imageB64, 0); // For seeding random number generator
    const imageRandom = await seedrandom(`seed=${seed}-${imageHash}`);

    // Brute-force and find optimal jigsaw rows and columns given target aspect ratio and number of pieces
    const imageAspectRatio = imageTexture.width / imageTexture.height;
    const jigsawRatios: [[number, number], number, number, number][] = []; // Row = index % 
    for(let row = 1; row <= maxRowCols; row++) {
        for(let col = 1; col <= maxRowCols; col++) {
            const testAspectRatio = col / row; 
            const testPieces = row * col;
            const weight = Math.abs(imageAspectRatio - testAspectRatio) * weightAspectRatio 
                + Math.abs(targetPieces - testPieces) * weightPieces;
            jigsawRatios.push([[row, col], testPieces, testAspectRatio, weight]);
        }
    }
    jigsawRatios.sort((a, b) => a[3] - b[3]);
    const [[jigsawRows, jigsawCols], _, jigsawAspectRatio] = jigsawRatios[0];

    // Generate shifted floating-point coordinate vertex points from 0 to 1
    const jigsawVertexes: PIXI.Point[][] = []; // [col][row]
    const maxVertexX = jigsawCols + 1;
    const maxVertexY = jigsawRows + 1;
    const xGridSize = 1 / jigsawCols;
    const yGridSize = 1 / jigsawRows;
    for(let vertexX = 0; vertexX < maxVertexX; vertexX++) {
        jigsawVertexes[vertexX] = [];
        for(let vertexY = 0; vertexY < maxVertexY; vertexY++) {
            // Calculate then randomly shift vertices except edges (ensuring they touch boundaries)
            const xMultiplier = vertexX === 0 || vertexX === maxVertexX - 1 ? 0 : 1;
            const yMultiplier = vertexY === 0 || vertexY === maxVertexY - 1 ? 0 : 1;
            const randomizedX = (vertexX + ((imageRandom() * 2 - 1) * xMultiplier * vertexVarianceMultiplier)) * xGridSize;
            const randomizedY = (vertexY + ((imageRandom() * 2 - 1) * yMultiplier * vertexVarianceMultiplier)) * yGridSize;
            jigsawVertexes[vertexX].push(new PIXI.Point(randomizedX, randomizedY));
        }
    }

    // From the parent container div, determine the appropriate dimensions for the jigsaw puzzle (80%?)
    // Choose the one with larger margins which doesn't overflow!
    const jigsawTestHeight = containerDiv.clientHeight * jigsawSizeRatio;
    const jigsawDimensionsHeight: [number, number] = [jigsawTestHeight / jigsawAspectRatio, jigsawTestHeight];
    const jigsawTestWidth = containerDiv.clientWidth * jigsawSizeRatio;
    const jigsawDimensionsWidth: [number, number] = [jigsawTestHeight / jigsawAspectRatio, jigsawTestHeight];
    let chosenJigsawDimensions: [number, number];
    if(jigsawDimensionsHeight[0] > jigsawTestWidth || jigsawDimensionsHeight[1] > jigsawTestHeight) {
        // Using width overflows, use the height-calculated dimensions instead
        chosenJigsawDimensions = jigsawDimensionsHeight;
    } else if(jigsawDimensionsWidth[0] > jigsawTestWidth || jigsawDimensionsWidth[1] > jigsawTestHeight) {
        // Using height overflows, use the width-calculated dimensions instead
        chosenJigsawDimensions = jigsawDimensionsWidth;
    } else {
        // Neither overflow, choose the one which has less gaps on the edges (otherwise way too tiny)?
        const edgeGapsHeight = containerDiv.clientHeight - jigsawDimensionsHeight[0] + containerDiv.clientWidth - jigsawDimensionsHeight[1];
        const edgeGapsWidth = containerDiv.clientHeight - jigsawDimensionsWidth[0] + containerDiv.clientWidth - jigsawDimensionsWidth[1];
        chosenJigsawDimensions = edgeGapsHeight < edgeGapsWidth ? jigsawDimensionsHeight : jigsawDimensionsWidth;
    }
    const jigsawDimensions = new PIXI.Rectangle(0, 0, chosenJigsawDimensions[0], chosenJigsawDimensions[1]);

    // Generate image sprite and scale?
    const imageSprite = new PIXI.Sprite(imageTexture);
    const upDownscale = jigsawDimensions.height / imageTexture.height;
    // imageSprite.scale = jigsawDimensions.height / imageTexture.height;
    if(debugDraw) { jigsawApplication.stage.addChild(imageSprite); }

    // Generate individual jigsaw pieces using the following algorithm:
    // - Retrieve the ratio coordinate for the top-left vertex of each jigsaw > convert to pixel-based and move
    // - Generate the bezier curves, seeded using the ID of the edge (ex: horizontal-1)
    // - Given the other three vertexes, transform and draw the bezier curves
    // - Mask the "chunk" of the image within the bounds, and export to texture?
    const jigsawPiecesData: JigsawPieceData[][] = [];
    for(let row = 0; row < jigsawRows; row++) {
        jigsawPiecesData[row] = [];
        for(let col = 0; col < jigsawCols; col++) {
            // Retrieve the vertexes for top left, top right, bottom right, and bottom left corners of the jigsaw
            const ratioVertexes = [
                jigsawVertexes[col][row],
                jigsawVertexes[col + 1][row],
                jigsawVertexes[col + 1][row + 1],
                jigsawVertexes[col][row + 1]
            ];
            const pixelVertexes = ratioVertexes.map( // Did I screw this up or something? Whatever.
                // vertexData => new PIXI.Point(vertexData.x * imageSprite.width, vertexData.y * imageSprite.height));
                vertexData => new PIXI.Point(vertexData.x * imageTexture.width, vertexData.y * imageTexture.height));
            
            // Preliminary information for generating jigsaw edges
            const edgesShouldStraight = [row === 0, col === jigsawCols - 1, row === jigsawRows - 1, col === 0];
            const edgesShouldReflect = [false, false, true, true]; // Reflect the bottom and left edges
            const vertexConnections = [0, 1, 2, 3, 0]; // Which vertexes connect to each other

            // Generate and draw the bezier curves (or straight line for edges) between the vertexes
            const jigsawPiecePath = new PIXI.GraphicsPath(); // vvv Top right bottom left vvv
            for(let vertexIndex = 0; vertexIndex < 4; vertexIndex++) {
                // Determine the index of the edge being worked on
                let index = vertexIndex === 0
                    ? col + row * jigsawCols : vertexIndex === 1
                    ? row + (col + 1) * jigsawRows : vertexIndex === 2
                    ? col + (row + 1) * jigsawCols : row + col * jigsawRows;

                // Get beginning and end vertex, check whether straight should be drawn first
                const startingVertex = pixelVertexes[vertexConnections[vertexIndex]];
                if(vertexIndex === 0) { jigsawPiecePath.moveTo(startingVertex.x, startingVertex.y); }
                const endingVertex = pixelVertexes[vertexConnections[vertexIndex + 1]];
                const jigsawEdgePath = new PIXI.GraphicsPath();

                // Draw and manipulate the path for the given edge, straight or bezier
                if(edgesShouldStraight[vertexIndex] === true) {
                    // Directly draw line between starting and ending vertex
                    jigsawEdgePath.lineTo(endingVertex.x, endingVertex.y);
                    jigsawPiecePath.instructions.push(...jigsawEdgePath.instructions);
                } else {
                    // Generate and randomize the base bezier curve template via ratio, then generate ratio path
                    // If should reflect, then reverse the instructions as well (for bezier generation purposes)
                    // Last represents the coordinate to lineTo at the end
                    const edgeRandom = seedrandom(`seed=${seed}-${vertexIndex % 2 === 0 ? "horizontal" : "vertical"}-${index}`);
                    const sourceBezierData = edgeRandom() > 0.5 ? reflectedJigsawBezierData : jigsawBezierData
                    const randomizedBezierData = sourceBezierData.map(([ratioPoint, varianceX, varianceY]) =>
                        new PIXI.Point(
                            ratioPoint.x + (varianceX[1] - (varianceX[1] - varianceX[0]) * edgeRandom()),
                            ratioPoint.y + (varianceY[1] - (varianceY[1] - varianceY[0]) * edgeRandom()),
                        ));
                    if(edgesShouldReflect[vertexIndex]) {
                        randomizedBezierData.reverse()
                    }

                    for(let index = 0; index < randomizedBezierData.length - 1; index++) {
                        const previousPoint = randomizedBezierData[index];
                        const currentPoint = randomizedBezierData[index + 1];
                        const xc = (previousPoint.x + currentPoint.x) / 2;
                        const yc = (previousPoint.y + currentPoint.y) / 2;
                        jigsawEdgePath.quadraticCurveTo(previousPoint.x, previousPoint.y, xc, yc);
                    }
                    jigsawEdgePath.lineTo(randomizedBezierData[randomizedBezierData.length-1].x, randomizedBezierData[randomizedBezierData.length-1].y)

                    // Based on the relative angle, distance, etc. between starting and ending vertex 
                    // + absolute position offset to start, apply a setTransformation matrix to the path 
                    // (again, no position movement needed?)
                    const relativeScale = Math.sqrt(Math.pow(endingVertex.x - startingVertex.x, 2) + Math.pow(endingVertex.y - startingVertex.y, 2));
                    let relativeRotationRads = Math.atan2(endingVertex.y - startingVertex.y, endingVertex.x - startingVertex.x);
                    let relativeTransform = [startingVertex.x, startingVertex.y];
                    // If necessary, perform reflection before transformation - use end vertex instead of starting, and increase rotation by 180
                    if(edgesShouldReflect[vertexIndex]) {
                        relativeRotationRads += Math.PI;
                        relativeTransform = [endingVertex.x, endingVertex.y];
                    }
                    const transformMatrix = new PIXI.Matrix().setTransform(relativeTransform[0], relativeTransform[1], 0, 0, 
                        relativeScale, relativeScale, relativeRotationRads, 0, 0);
                    jigsawEdgePath.transform(transformMatrix);
                    jigsawPiecePath.instructions.push(...jigsawEdgePath.instructions);
                }
            }

            // Generate and export the tecture for the individual jigsaw piece
            // Debug drawing for ensuring they all still fit together properly
            var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
            const maskGraphic = new PIXI.Graphics().path(jigsawPiecePath);
            // const strokeGraphic = new PIXI.Graphics().path(jigsawPiecePath);
            maskGraphic.fill(colorArray[(row * jigsawCols + col) % colorArray.length]);
            // strokeGraphic.stroke({ color: "yellow", "width": 1, alignment: 1.5 });
            if(debugDraw) {
                jigsawApplication.stage.addChild(maskGraphic);
            } else {
                // Calculate and store offset from "graphic" to "true" center
                const graphicCenterX = (maskGraphic.bounds.minX + maskGraphic.bounds.maxX) / 2;
                const graphicCenterY = (maskGraphic.bounds.minY + maskGraphic.bounds.maxY) / 2;
                const graphicCenter = new PIXI.Point(graphicCenterX, graphicCenterY)

                imageSprite.mask = maskGraphic;
                imageSprite.addChild(maskGraphic); // Don't care about deprecation really
                // imageSprite.addChild(strokeGraphic); // Don't care about deprecation really
                const pieceTexture = await jigsawApplication.renderer.extract.texture({ target: imageSprite });
                // await jigsawApplication.renderer.extract.base64({ target: imageSprite });
                pieceTexture.source.autoGenerateMipmaps = true;
                pieceTexture.source.antialias = true;
                jigsawPiecesData[row][col] = { center: graphicCenter, texture: pieceTexture, mask: maskGraphic };
                // imageSprite.removeChild(maskGraphic);
            }
        }
    }

    if(debugDraw) { throw Error("done with debug rendering"); }

    // Generate values for determining where to randomly place starting pieces
    const jigsawPieceWidth = imageSprite.width / jigsawRows;
    const jigsawPieceHeight = imageSprite.height / jigsawCols;
    const randomXMin = jigsawPieceWidth * upDownscale;
    const randomYMin = jigsawPieceHeight * upDownscale;
    const randomXOffset = containerDiv.clientWidth - 2 * randomXMin;
    const randomYOffset = containerDiv.clientHeight - 2 * randomYMin;

    // Handling for clickdown and clickup to determine whether to drag/click 
    // Treat clickDown as drag, but if pointerup too quickly then ignore until next pointerdown
    let currentAction: "clickDown" | undefined = undefined;
    let lastActionMS: number = 0;
    function whatAction(action: "pointerdown" | "pointerup", right: boolean = false): ActionType | undefined {
        // If no current action, ignore if pointerup 
        let finalAction: ActionType | undefined = undefined;
        if(currentAction === undefined && action === "pointerup") {}
        else if(right === false) {
            // Handle left click, if no current action then clickDown
            const currentActionMS = new Date().getTime();
            if(action === "pointerdown" && currentAction === undefined) {
                currentAction = "clickDown";
                finalAction = "dragStart";
                lastActionMS = currentActionMS;
            } else if(action === "pointerup" && currentAction === "clickDown") {
                // If interval is less than 100ms, then keep clickdown, otherwise up
                if(currentActionMS - lastActionMS > 150) {
                    currentAction = undefined;
                    finalAction = "dragEnd";
                    lastActionMS = 0; // Reset
                }
            } else if(action === "pointerdown" && currentAction === "clickDown") {
                // End drag, assume click drag type
                currentAction = undefined;
                finalAction = "dragEnd";
                lastActionMS = 0; // Reset
            }
        } else if(right === true && action === "pointerdown") {
            finalAction = "right";
        }

        return finalAction;
    }

    // Generate the sprites using the given textures and add them to the canvas
    // Throw to random areas of the stage within 20-80% range
    let currentDragData: [PIXI.Container, number, number] | undefined;
    const sprites: PIXI.Sprite[][] = [];
    let currentZIndex = 100;
    for(let row = 0; row < jigsawRows; row++) {
        sprites[row] = [];
        for(let col = 0; col < jigsawCols; col++) {
            // Initialize sprite representing jigsaw piece
            const jigsawPieceData = jigsawPiecesData[row][col];
            const sprite = new JigsawSprite(jigsawPieceData.texture);
            const container = new PIXI.Container();
            sprite.anchor.set(0.5, 0.5);
            sprite.scale.set(upDownscale);
            // Store row and col in custom sprite
            sprite.row = row;
            sprite.col = col;
            container.addChild(sprite);

            // Initialize mask for representing hitbox
            const newMask: PIXI.Graphics = jigsawPieceData.mask.clone();
            container.addChild(newMask);
            newMask.scale.set(upDownscale, upDownscale)
            newMask.position.set(-newMask.bounds.minX * upDownscale - sprite.width / 2, -newMask.bounds.minY * upDownscale - sprite.height / 2);
            sprite.mask = newMask;
            // container.addChild(newMask)
            jigsawApplication.stage.addChild(container)

            // Throw the container somewhere random on the screen and rotate randomly
            let randomX = randomXMin + randomXOffset * imageRandom();
            let randomY = randomYMin + randomYOffset * imageRandom();
            let randomAngle = rotationInterval * Math.floor(imageRandom() * (360 / rotationInterval));
            container.x = randomX; container.y = randomY; container.angle = randomAngle;
            // container.x = jigsawPieceData.center.x * upDownscale; container.y = jigsawPieceData.center.y * upDownscale;
            jigsawApplication.render();

            container.eventMode = "static"; // ???
            container.cursor = "pointer";
            container.on("pointerdown", (event: PIXI.FederatedPointerEvent) => {
                // Determine which action to fire
                const right = event.button === 2;
                const action = whatAction("pointerdown", right);
                if(action === "dragStart") {
                    // Handle drag start for jigsaw
                    container.children.forEach(sprite => { sprite.alpha = 0.75 });
                    const position = event.data.getLocalPosition(container);
                    container.pivot.set(position.x, position.y);
                    currentDragData = [container, row, col];
                    container.parent.toLocal(event.global, undefined, container.position);
                    jigsawApplication.stage.on('pointermove', onDragMove);
                    // Increment Z index every click lol
                    container.zIndex = currentZIndex;
                    currentZIndex++;
                } else if(action === "dragEnd") {
                    onDragEnd(event);
                }
            });

            sprites[row].push(sprite);
        }
    }

    // Handel pointer events for jigsaw application, mainly right click
    jigsawApplication.stage.eventMode = 'static';
    jigsawApplication.stage.hitArea = jigsawApplication.screen;
    jigsawApplication.canvas.oncontextmenu = (event: MouseEvent) => { 
        event.preventDefault();
        if(currentDragData !== undefined) {
            // Rotate child sprites which are JigsawSprite, NOT the container
            const container = currentDragData[0];
            container.angle += rotationInterval;
            container.angle %= 360;
        }
    }
    function onPointerUp(event: PIXI.FederatedPointerEvent) {
        const right = event.button === 2;
        const action = whatAction("pointerup", right);
        if(action === "dragEnd") {
            onDragEnd(event);
        }
    }
    jigsawApplication.stage.on('pointerup', onPointerUp);
    jigsawApplication.stage.on('pointerupoutside', onPointerUp);

    // Calculate the allowed error in pixels based on bigger of container width or height
    let pixelErrorAllowed = Math.max(jigsawPieceWidth, jigsawPieceHeight) * jigsawPlaceErrorRatio * upDownscale;
    const compareImageValue = Math.max(imageTexture.height, imageTexture.width) * 0.0025 * upDownscale;
    if(pixelErrorAllowed < compareImageValue) { pixelErrorAllowed = compareImageValue }

    function onDragMove(event: PIXI.FederatedPointerEvent) {
        const now = new Date().getTime();
        if(startTimeMS === -1) { startTimeMS = now }
        if (currentDragData !== undefined) {
            currentDragData[0].parent.toLocal(event.global, undefined, currentDragData[0].position);
        }
    }

    // When drag finished, compare and initialize / connect containers if necessary
    // Move the destination container sprites to the source container, remove destination container
    // Disfunctionality: cannot recursively connect
    const snapSound = new Audio(SnapSound);
    const completeSound = new Audio(CompleteSound);
    completeSound.volume = 0.2;
    async function onDragEnd(event: PIXI.FederatedPointerEvent) {
        if (currentDragData !== undefined) {
            jigsawApplication.stage.off('pointermove', onDragMove);

            // Retrieve current container or sprite from the drag data
            const [sourceContainer] = currentDragData;
            sourceContainer.children.forEach(sprite => { sprite.alpha = 1 });
            currentDragData = undefined;

            // Iterate over source sprites and check whether any connections match
            // If connections match, then add the container to be "merged"
            const containersToTransfer: PIXI.Container[] = [];
            let containerRadians: number = 0;
            for(const _sourceSprite of sourceContainer.children) {
                if(_sourceSprite.constructor.name !== "JigsawSprite") { continue; }
                const sourceSprite = _sourceSprite as JigsawSprite;
                const currentPieceCenter = jigsawPiecesData[sourceSprite.row][sourceSprite.col].center;
                const connectedPiecesData = [
                    [sourceSprite.row - 1, sourceSprite.col],
                    [sourceSprite.row, sourceSprite.col + 1],
                    [sourceSprite.row + 1, sourceSprite.col],
                    [sourceSprite.row, sourceSprite.col - 1],
                ];
                for(const [connectedRow, connectedCol] of connectedPiecesData) {
                    // Construct a line from the source center to the expected connected center
                    const connectedPieceData = (jigsawPiecesData[connectedRow] ?? [])[connectedCol];
                    if(connectedPieceData === undefined) { continue; }
                    const connectedCenter = connectedPieceData.center;
                    const connectedSprite = sprites[connectedRow][connectedCol];
                    const connectedContainer = connectedSprite.parent;
                    if(connectedContainer === sourceContainer) { continue; }
                    if(sourceContainer.angle != connectedContainer.angle) { continue; }

                    // Get the expected offset between the center points of both
                    // Transform based on (360 - angle) degrees
                    const expectedOffsetBase = [
                        (connectedCenter.x - currentPieceCenter.x) * upDownscale, 
                        (connectedCenter.y - currentPieceCenter.y) * upDownscale];
                    const radians = (sourceContainer.angle * Math.PI / 180); // Reverse
                    const expectedOffsetActual = [
                        expectedOffsetBase[0] * Math.cos(radians) - expectedOffsetBase[1] * Math.sin(radians),
                        expectedOffsetBase[1] * Math.cos(radians) + expectedOffsetBase[0] * Math.sin(radians),
                    ];
                    const actualOffset = [
                        connectedSprite.worldTransform.tx - sourceSprite.worldTransform.tx,
                        connectedSprite.worldTransform.ty - sourceSprite.worldTransform.ty];
                    const offsetDiff = [
                        expectedOffsetActual[0] - actualOffset[0],
                        expectedOffsetActual[1] - actualOffset[1]
                    ];
                    const offsetDiffPixels = Math.sqrt(Math.pow(offsetDiff[0], 2) + Math.pow(offsetDiff[1], 2));
                    
                    // If offset is within error range, then mark for combination - shift container and mark for transfer
                    if(offsetDiffPixels < pixelErrorAllowed) {
                        containerRadians = sourceContainer.angle * Math.PI / 180 * -1;
                        connectedContainer.x += offsetDiff[0];
                        connectedContainer.y += offsetDiff[1];
                        jigsawApplication.render();
                        containersToTransfer.push(connectedContainer);
                        snapSound.play();
                    }
                }
            }

            if(containersToTransfer.length === 0) { return; }

            const containersToDestroy: PIXI.Container[] = [];
            for(const destinationContainer of containersToTransfer) {
                if(destinationContainer.children.length === 0) { continue; }
                const destinationChildren = [...destinationContainer.children]; // Mutate?
                for(const destinationSprite of destinationChildren) {
                    let previousLocation = new PIXI.Point(destinationSprite.worldTransform.tx, destinationSprite.worldTransform.ty);
                    sourceContainer.addChild(destinationSprite);
                    jigsawApplication.render();

                    let newLocation = new PIXI.Point(destinationSprite.worldTransform.tx, destinationSprite.worldTransform.ty);

                    // Rotate according to the angle specified
                    const distanceX = previousLocation.x - newLocation.x;
                    const distanceY = previousLocation.y - newLocation.y;
                    destinationSprite.x += distanceX * Math.cos(containerRadians) - distanceY * Math.sin(containerRadians);
                    destinationSprite.y += distanceY * Math.cos(containerRadians) + distanceX * Math.sin(containerRadians);
                }
                // sourceContainer.addChild(destinationContainer) // ???
                containersToDestroy.push(destinationContainer);
            }
            containersToDestroy.forEach(container => { container.destroy(); });
            
            if(sourceContainer.children.length / 2 === jigsawRows * jigsawCols) {
                alert("done!")
                completeSound.play();
            }
        }
    }
}