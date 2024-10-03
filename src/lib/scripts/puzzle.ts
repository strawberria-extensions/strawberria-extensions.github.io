import SnapSound from "$lib/resources/snap.mp3";
import CompleteSound from "$lib/resources/upgrade.mp3";
import seedrandom from "seedrandom";
import * as PIXI from "pixi.js"
import * as XXH from "xxhashjs";
import { get, writable, type Writable } from "svelte/store";
import * as JigsawPuzzles from "$lib/import/extension-jigsaw_puzzles"

// import { type ActionType, colorArray, type JigsawCompletionData, type JigsawPuzzles.Config, type JigsawPieceData, type JigsawPuzzles.JigsawSave, JigsawSprite } from "./signature-puzzle";
import { decryptAES256GCM, encryptAES256GCM, hashSHA256, hexToBuffer, md5, sleep } from "./utility";

class JigsawSprite extends PIXI.Sprite {
    row: number = -1;
    col: number = -1;
}

// TODO:
// - Auto resize when screen changes
// - Shadows if possible for pieces
// - Rotation support for mobile (rotation button?)
// - Actual completion screen

// Constants for fine-tuning
// @ts-ignore encryptionKey = strawberria-jigsaw
// let encryptionKey: string = "";
function _0x47d6(){const _0x3e8517=['12fMuoEe','4463676chgkyy','1592tDkGon','35MyozrZ','a-jigsaw','50455zmbqzw','14663880cpKSZm','41544DlqaUD','400734FetXQp','1640541FTlYjD','strawberri','25729869FoMcTs','2kEaPub','572mvIGdl'];_0x47d6=function(){return _0x3e8517;};return _0x47d6();}function _0x359a(_0x26b960,_0x50b3fb){const _0x385df1=_0x47d6();return _0x359a=function(_0x1932d6,_0x5ad733){_0x1932d6=_0x1932d6-(0x6*-0x270+0xcff+0x308);let _0x6d5577=_0x385df1[_0x1932d6];return _0x6d5577;},_0x359a(_0x26b960,_0x50b3fb);}const _0x431096=_0x359a;(function(_0x8564e9,_0x333357){const _0x58f2b4=_0x359a,_0x221c7a=_0x8564e9();while(!![]){try{const _0x327929=parseInt(_0x58f2b4(0x167))/(0x1646+-0x193a*0x1+0x2f5)*(-parseInt(_0x58f2b4(0x16a))/(-0x25b3+0x13d4+0x1*0x11e1))+parseInt(_0x58f2b4(0x16d))/(0x23fa+0x47+-0x243e)+parseInt(_0x58f2b4(0x16b))/(0x1*-0x6e2+-0x151d+0x1c03)*(-parseInt(_0x58f2b4(0x171))/(0x5*0x1d3+-0x4e*0x4f+0xef8))+parseInt(_0x58f2b4(0x174))/(0x2232*-0x1+0x49*0x2b+-0xb*-0x1ff)*(-parseInt(_0x58f2b4(0x16f))/(0x2*-0x89b+-0x4*-0x18b+0x1*0xb11))+parseInt(_0x58f2b4(0x16e))/(-0x1ca9*0x1+0x13c*-0x1a+0x3cc9)*(-parseInt(_0x58f2b4(0x173))/(0x1886+0x757*0x1+-0x1fd4))+parseInt(_0x58f2b4(0x172))/(-0x91e+0x740*-0x1+0x1068)+-parseInt(_0x58f2b4(0x169))/(-0x7df+-0x25f4*-0x1+-0x1e0a)*(-parseInt(_0x58f2b4(0x16c))/(0xd66+-0x20*0x3d+-0x5ba*0x1));if(_0x327929===_0x333357)break;else _0x221c7a['push'](_0x221c7a['shift']());}catch(_0x16afcf){_0x221c7a['push'](_0x221c7a['shift']());}}}(_0x47d6,-0x1*0xfeb5b+0x33013+0x1b56a4));const encryptionKey=_0x431096(0x168)+_0x431096(0x170);const maxRowCols = 50;
// const imageProxyURL = "https://image-proxy.strawberria.workers.dev/";
const vertexVarianceMultiplier = 0.1;
const jigsawSizeRatio = 0.9 ;
const jigsawPlaceErrorRatio = 0.05;
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

// Instance of jigsaw puzzle for specific configuration, represented through parent container
export class JigsawInstance {
    // Base constructor configuration
    containerDiv: HTMLDivElement;
    config:       JigsawPuzzles.JigsawData;
    randomSeed:   string;
    debug:        boolean;
    // Various callbacks?
    callbackCompleted: (saveData: JigsawPuzzles.JigsawSave, suppress: boolean) => void;
    callbackSaved:     (saveData: JigsawPuzzles.JigsawSave | undefined, encrypted: string | undefined, action: string, key: string) => void;

    // Bare minimum constructor, main handling is asynchronous
    snapSound: HTMLAudioElement;
    completeSound: HTMLAudioElement;
    constructor(config: JigsawPuzzles.JigsawData, containerDiv: HTMLDivElement, randomSeed: string, debug: boolean = false) {
        this.containerDiv = containerDiv;
        this.config = JSON.parse(JSON.stringify(config));
        // if(window.innerHeight > window.innerWidth) {
        //     // Mobile device, disable rotation
        //     this.config.settings.rotation = 0;
        // }
        this.randomSeed = randomSeed;
        this.debug = debug;
    }

    // Ticker for updating elapsed timestamp
    stopTick: boolean = true;
    startTimeMS: number = -1;
    elapsedTimeMSStore: Writable<number> = writable(0);
    elapsedInterval: number;
    saveInterval: number;
    setupTicker() {
        // Store elapsed milliseconds since start
        this.elapsedInterval = setInterval(() => {
            if(this.startTimeMS !== -1 && this.stopTick === false) {
                // If tick is enabled, then update elapsed timestamp
                this.elapsedTimeMSStore.set(new Date().getTime() - this.startTimeMS);
            }
        }, 100) as any;
        this.saveInterval = setInterval(() => {
            if(this.startTimeMS !== -1 && this.stopTick === false) {
                this.saveProgress("tick");
            }
        }, 1000) as any;
    }
    prepMainMenu() {
        clearInterval(this.elapsedInterval);
        clearInterval(this.saveInterval);
    }

    // Pre-initialize constants given configuration as "checkpoint" before initialization / restart
    // - Generate image texture from image source, then XXH64 hash from image base64 for seeding random generator
    // - Initialize PIXI application for rendering jigsaw puzzle
    // - Determine optimal jigsaw rows / columns and aspect ratio
    // - Determine the chosen jigsaw dimensions given the container and image size
    // - Initialize "ghost" texture for ghosting, with half alpha
    application:  PIXI.Application;
    imageTexture: PIXI.Texture;
    imageHash:    string;
    imageSprite:  PIXI.Sprite;
    ghostSprite:  PIXI.Sprite;
    jigsawRows:   number;
    jigsawCols:   number;
    jigsawRatio:  number; // Aspect ratio
    upDownscale:  number; // Multiplier for scaling
    async preInitialize() {
        this.setupTicker();

        // Generate and cache the save key for future usage
        const urlHash = await hashSHA256(this.config.imageURL);
        this.saveKey = `${urlHash}-${this.config.rowColsRatio[0]}x${this.config.rowColsRatio[1]}`;

        // Use proxy URL to bypass CORS, note PIXI doesn't like normal asset loading...
        const proxiedURL = `https://image-proxy.strawberria.workers.dev?imageURL=${encodeURIComponent(this.config.imageURL)}`;
        const imageElement = document.createElement("img");
        imageElement.crossOrigin = "anonymous";
        imageElement.src = proxiedURL;
        if(imageElement.complete === false) {
            // Wait for image element to finish loading
            await new Promise<void>((resolve) => imageElement.onload = () => { resolve(); });
        }
        this.imageTexture = PIXI.Texture.from(imageElement);
        // this.imageTexture = await PIXI.Assets.load(proxiedURL); // Proxy URL to get around CORS
        // this.imageTexture = await PIXI.Assets.load(this.config.imageURL); // Proxy URL to get around CORS
        this.imageTexture.source.autoGenerateMipmaps = true;
        this.imageTexture.source.antialias = true;
        this.imageSprite = new PIXI.Sprite(this.imageTexture);
        this.application = new PIXI.Application();

        // Initialize jigsaw application (note: will be preserved between restarts)
        await this.application.init({ 
            width: this.containerDiv.clientWidth, 
            height: this.containerDiv.clientHeight,
            resolution: 1,
            antialias: true
        });
        const jigsawBackground = new PIXI.BackgroundSystem();
        jigsawBackground.color = "#2f2c3b";
        this.application.renderer.background = jigsawBackground;
        this.containerDiv.appendChild(this.application.canvas);

        // Generate base64 in jpg format (for string size limitations) for generating image hash
        const imageB64 = await this.application.renderer.extract.base64({ target: this.imageTexture, format: "jpg", quality: 0.5 });
        this.imageHash = `${XXH.h64(imageB64, 0)}`; 
        this.imageHash = md5(imageB64); 

        // Application handling for on[X] events, see below
        const currentThis = this;
        this.application.stage.eventMode = 'static';
        this.application.stage.hitArea = this.application.screen;
        this.application.canvas.oncontextmenu = (event: MouseEvent) => { 
            // Ignore context menu for jigsaw canvas
            event.preventDefault(); 
        };
        this.application.canvas.onmousedown = (event: MouseEvent) => { 
            // Handle right click for canvas
            console.log("onmousedown")
            if(event.button === 2) { currentThis.onRotate(); }
        }
        this.application.canvas.onwheel = (event: WheelEvent) => { 
            // Handle right click for canvas
            console.log("onwheel")
            currentThis.onRotate(event.deltaY > 0);
        }
        function onPointerUp(event: PIXI.FederatedPointerEvent) {
            const right = event.button === 2;
            const action = currentThis.whatAction("pointerup", right);
            if(action === "dragEnd") {
                currentThis.onDragEnd();
            }
        }
        this.application.stage.on('pointerup', onPointerUp);
        this.application.stage.on('pointerupoutside', onPointerUp);

        // Determine the optimal number of jigsaw rows and columns
        // - Brute-force number of rows and columns from 0 to 50
        // - "Weigh" difference in aspect ratio and number of pieces
        // const imageAspectRatio = this.imageTexture.width / this.imageTexture.height;
        // const jigsawRatios: [[number, number], number, number, number][] = []; // Row = index % 
        // for(let row = 1; row <= maxRowCols; row++) {
        //     for(let col = 1; col <= maxRowCols; col++) {
        //         const testAspectRatio = col / row; 
        //         const testPieces = row * col;
        //         const weight = Math.abs(imageAspectRatio - testAspectRatio) * weightAspectRatio 
        //             + Math.abs(this.targetPieces - testPieces) * weightPieces;
        //         jigsawRatios.push([[row, col], testPieces, testAspectRatio, weight]);
        //     }
        // }
        // jigsawRatios.sort((a, b) => a[3] - b[3]);
        // const [[jigsawRows, jigsawCols], _, jigsawAspectRatio] = jigsawRatios[0];

        // From the parent container div, determine the appropriate dimensions for the jigsaw puzzle (80%?)
        // Choose the one with larger margins which doesn't overflow!
        const jigsawTestWidth = this.containerDiv.clientWidth * jigsawSizeRatio;
        const jigsawTestHeight = this.containerDiv.clientHeight * jigsawSizeRatio;
        const jigsawTestWidthRatio = jigsawTestWidth / this.imageTexture.width;
        const jigsawTestHeightRatio = jigsawTestHeight / this.imageTexture.height;
        // const jigsawDimensionsHeight: [number, number] = [jigsawTestWidth / this.config.rowColsRatio[1], jigsawTestHeight];
        const jigsawDimensionsWidth: [number, number] = [this.imageTexture.width * jigsawTestWidthRatio, this.imageTexture.height * jigsawTestWidthRatio];
        const jigsawDimensionsHeight: [number, number] = [this.imageTexture.width * jigsawTestHeightRatio, this.imageTexture.height * jigsawTestHeightRatio];
        let chosenJigsawDimensions: [number, number];
        if(jigsawDimensionsWidth[0] > jigsawTestWidth || jigsawDimensionsWidth[1] > jigsawTestHeight) {
            // Using width overflows, use the height-calculated dimensions instead
            chosenJigsawDimensions = jigsawDimensionsHeight;
        } else if(jigsawDimensionsHeight[0] > jigsawTestWidth || jigsawDimensionsHeight[1] > jigsawTestHeight) {
            // Using height overflows, use the width-calculated dimensions instead
            chosenJigsawDimensions = jigsawDimensionsWidth;
        } else {
            // Neither overflow, choose the one which has less gaps on the edges (otherwise way too tiny)?
            const edgeGapsHeight = this.containerDiv.clientHeight - jigsawDimensionsHeight[0] + this.containerDiv.clientWidth - jigsawDimensionsHeight[1];
            const edgeGapsWidth = this.containerDiv.clientHeight - jigsawDimensionsWidth[0] + this.containerDiv.clientWidth - jigsawDimensionsWidth[1];
            chosenJigsawDimensions = edgeGapsHeight < edgeGapsWidth ? jigsawDimensionsHeight : jigsawDimensionsWidth;
        }
        const widthScale = chosenJigsawDimensions[0] / this.imageTexture.width;
        const heightScale = chosenJigsawDimensions[1] / this.imageTexture.height;
        this.upDownscale = Math.min(widthScale, heightScale); // What about upscaling?

        // Initialize ghost texture for ghosting, with half alpha
        this.ghostSprite = new PIXI.Sprite(this.imageTexture);
        this.ghostSprite.alpha = 0;
        this.ghostSprite.scale.set(this.upDownscale, this.upDownscale);
        this.ghostSprite.anchor.set(0.5, 0.5);
        this.ghostSprite.x = this.containerDiv.clientWidth / 2;
        this.ghostSprite.y = this.containerDiv.clientHeight / 2;
    }

    // Initialize per-instance constants, re-ran on restart (TODO: how to handle container size change?)
    // - Generate random jigsaw vertexes for aligning individual pieces
    // - Generate the actual jigsaw pieces and related information (index, center point, etc.)
    jigsawPiecesData:  JigsawPuzzles.JigsawPieceData[][];
    randomXMin:        number;
    randomYMin:        number;
    randomXOffset:     number;
    randomYOffset:     number;
    pixelErrorAllowed: number;
    async initializeInstance(restart: boolean = false) {
        // Indicates game restart, generate new seed from random generator
        this.startTimeMS = -1;
        this.stopTick = true;
        if(restart === true) { 
            // Reset start time, elapsed, and ticker
            this.elapsedTimeMSStore.set(0);

            // Delete any existing saves with the given key
            const urlHash = await hashSHA256(this.config.imageURL);
            // const saveKey = `${this.imageHash}-${this.config.rowColsRatio[0]}x${this.config.rowColsRatio[1]}`;
            const saveKey = `${urlHash}-${this.config.rowColsRatio[0]}x${this.config.rowColsRatio[1]}`;
            window.localStorage.removeItem(saveKey);
            this.callbackSaved(undefined, undefined, "restart", this.saveKey);

            // Generate random large number for seed
            this.randomSeed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
            this.ghostVisible = false;
            this.nonEdgeVisible = true;
            this.application.stage.removeChildren();
        }
        this.application.stage.addChild(this.ghostSprite); // Add after destroy?
        const imageRandom = seedrandom(`seed=${this.imageHash}-${this.randomSeed}`);
        const edgeSeed = imageRandom(); // Seed for generating edges

        // Generate shifted floating-point coordinate vertex points from 0 to 1
        const jigsawVertexes: PIXI.Point[][] = []; // [col][row]
        const maxVertexX = this.config.rowColsRatio[1] + 1;
        const maxVertexY = this.config.rowColsRatio[0] + 1;
        const xGridSize = 1 / this.config.rowColsRatio[1];
        const yGridSize = 1 / this.config.rowColsRatio[0];
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

        // Generate individual jigsaw pieces using the following algorithm:
        // - Retrieve the ratio coordinate for the top-left vertex of each jigsaw > convert to pixel-based and move
        // - Generate the bezier curves, seeded using the ID of the edge (ex: horizontal-1)
        // - Given the other three vertexes, transform and draw the bezier curves
        // - Mask the "chunk" of the image within the bounds, and export to texture?
        // - Calculate the allowed pixel error when dropping pieces
        this.jigsawPiecesData = [];
        for(let row = 0; row < this.config.rowColsRatio[0]; row++) {
            this.jigsawPiecesData[row] = [];
            for(let col = 0; col < this.config.rowColsRatio[1]; col++) {
                // Retrieve the vertexes for top left, top right, bottom right, and bottom left corners of the jigsaw
                const ratioVertexes = [
                    jigsawVertexes[col][row],
                    jigsawVertexes[col + 1][row],
                    jigsawVertexes[col + 1][row + 1],
                    jigsawVertexes[col][row + 1]
                ];
                const pixelVertexes = ratioVertexes.map( // Did I screw this up or something? Whatever.
                    vertexData => new PIXI.Point(vertexData.x * this.imageTexture.width, vertexData.y * this.imageTexture.height));

                // Preliminary information for generating specific types of jigsaw edges
                const edgesShouldStraight = [row === 0, col === this.config.rowColsRatio[1] - 1, row === this.config.rowColsRatio[0] - 1, col === 0];
                const edgesShouldReflect = [false, false, true, true]; // Reflect the bottom and left edges
                const vertexConnections = [0, 1, 2, 3, 0]; // Which vertexes connect to each other

                // Generate and draw the bezier curves (or straight line for edges) between the vertexes
                const jigsawPiecePath = new PIXI.GraphicsPath(); // vvv Top right bottom left vvv
                for(let vertexIndex = 0; vertexIndex < 4; vertexIndex++) {
                    // Determine the absolute index of the edge being worked on
                    let index = vertexIndex === 0
                        ? col + row * this.config.rowColsRatio[1] : vertexIndex === 1
                        ? row + (col + 1) * this.config.rowColsRatio[0] : vertexIndex === 2
                        ? col + (row + 1) * this.config.rowColsRatio[1] : row + col * this.config.rowColsRatio[0];

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
                        const edgeRandom = seedrandom(`seed=${edgeSeed}-${vertexIndex % 2 === 0 ? "horizontal" : "vertical"}-${index}`);
                        const sourceBezierData = edgeRandom() > 0.5 ? reflectedJigsawBezierData : jigsawBezierData
                        const randomizedBezierData = sourceBezierData.map(([ratioPoint, varianceX, varianceY]) =>
                            new PIXI.Point(
                                ratioPoint.x + (varianceX[1] - (varianceX[1] - varianceX[0]) * edgeRandom()),
                                ratioPoint.y + (varianceY[1] - (varianceY[1] - varianceY[0]) * edgeRandom()),
                            ));
                        if(edgesShouldReflect[vertexIndex]) {
                            randomizedBezierData.reverse()
                        }

                        // Generate the actual cubic bezier curve given the array of points
                        for(let index = 0; index < randomizedBezierData.length - 1; index++) {
                            const previousPoint = randomizedBezierData[index];
                            const currentPoint = randomizedBezierData[index + 1];
                            const xc = (previousPoint.x + currentPoint.x) / 2;
                            const yc = (previousPoint.y + currentPoint.y) / 2;
                            jigsawEdgePath.quadraticCurveTo(previousPoint.x, previousPoint.y, xc, yc);
                        } // This lineTo is correct btw for how cubic beziers are generated!
                        jigsawEdgePath.lineTo(randomizedBezierData[randomizedBezierData.length-1].x, randomizedBezierData[randomizedBezierData.length-1].y)

                        // Based on the relative angle, distance, etc. between starting and ending vertex 
                        // + absolute position offset to start, apply a setTransformation matrix to the path 
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
                const maskGraphic = new PIXI.Graphics().path(jigsawPiecePath);
                maskGraphic.fill(JigsawPuzzles.colorArray[(row * this.config.rowColsRatio[1] + col) % JigsawPuzzles.colorArray.length]);
                // strokeGraphic.stroke({ color: "yellow", "width": 1, alignment: 1.5 });
                if(this.debug) {
                    this.application.stage.addChild(maskGraphic);
                } else {
                    // Calculate and store offset from "graphic" to "true" center
                    const graphicCenterX = (maskGraphic.bounds.minX + maskGraphic.bounds.maxX) / 2;
                    const graphicCenterY = (maskGraphic.bounds.minY + maskGraphic.bounds.maxY) / 2;
                    const graphicCenter = new PIXI.Point(graphicCenterX, graphicCenterY)

                    // Mask the original image to create the "jigsaw piece", then extract the texture
                    this.imageSprite.mask = maskGraphic;
                    this.imageSprite.addChild(maskGraphic); // Don't care about deprecation really
                    const pieceTexture = this.application.renderer.extract.texture({ target: this.imageSprite });
                    if(row === 0 && col === 0) {
                        const b64 = this.application.renderer.extract.base64({ target: this.imageSprite });
                        console.log(await b64)
                    }
                    this.imageSprite.removeChild(maskGraphic);
                    pieceTexture.source.autoGenerateMipmaps = true;
                    pieceTexture.source.antialias = true;
                    this.jigsawPiecesData[row][col] = { center: graphicCenter, texture: pieceTexture, mask: maskGraphic };
                }
            }
        }
    
        // Generate values for determining where to randomly place starting pieces
        const jigsawPieceWidth = this.imageSprite.width / this.config.rowColsRatio[0];
        const jigsawPieceHeight = this.imageSprite.height / this.config.rowColsRatio[1];
        this.randomXMin = jigsawPieceWidth * this.upDownscale;
        this.randomYMin = jigsawPieceHeight * this.upDownscale;
        this.randomXOffset = this.containerDiv.clientWidth - 2 * this.randomXMin;
        this.randomYOffset = this.containerDiv.clientHeight - 2 * this.randomYMin;

        // Calculate the allowed error in pixels based on bigger of container width or height
        this.pixelErrorAllowed = Math.max(jigsawPieceWidth, jigsawPieceHeight) * jigsawPlaceErrorRatio * this.upDownscale;
        const compareImageValue = Math.max(this.imageTexture.height, this.imageTexture.width) * 0.0025 * this.upDownscale;
        if(this.pixelErrorAllowed < compareImageValue) { this.pixelErrorAllowed = compareImageValue }
    }

    // Determine what action is currently being taken from the given event
    currentAction: "clickDown" | undefined;
    lastActionMS: number = 0;
    whatAction(action: "pointerdown" | "pointerup", right: boolean = false): JigsawPuzzles.ActionType | undefined {
        // If no current action, ignore if pointerup 
        let finalAction: JigsawPuzzles.ActionType | undefined = undefined;
        if(this.currentAction === undefined && action === "pointerup") {}
        else if(right === false) {
            // Handle left click, if no current action then clickDown
            const currentActionMS = new Date().getTime();
            if(action === "pointerdown" && this.currentAction === undefined) {
                this.currentAction = "clickDown";
                finalAction = "dragStart";
                this.lastActionMS = currentActionMS;
            } else if(action === "pointerup" && this.currentAction === "clickDown") {
                // If interval is less than 100ms, then keep clickdown, otherwise up
                if(currentActionMS - this.lastActionMS > 150) {
                    this.currentAction = undefined;
                    finalAction = "dragEnd";
                    this.lastActionMS = 0; // Reset
                }
            } else if(action === "pointerdown" && this.currentAction === "clickDown") {
                // End drag, assume click drag type
                this.currentAction = undefined;
                finalAction = "dragEnd";
                this.lastActionMS = 0; // Reset
            }
        } else if(right === true && action === "pointerdown") {
            finalAction = "right";
        }

        return finalAction;
    }

    // Generate the jigsaw pieces (containers) for storage (before placement?)
    // - Iterate over sprites, generate and assign a container
    // - Attach the mask from the jigsaw piece data, and handlers
    currentDragData: [PIXI.Container, number, number] | undefined;
    sprites: PIXI.Sprite[][]; // [row][column] lookup for sprites
    containers: Set<PIXI.Container>;
    currentZIndex: number;
    async generateJigsawPieces() {
        // Reset action and current data since instance is being restarted
        this.currentAction = undefined;
        this.lastActionMS = 0;
        this.currentDragData = undefined;
        this.sprites = [];
        this.containers = new Set();
        this.currentZIndex = 100;

        // Retrieve save data (if exists) for the current configuration
        const [_, saveData] = await this.getSaveData();
        if(saveData !== undefined) {
            // Update the elapsed timestamp before it starts
            this.elapsedTimeMSStore.set(saveData.elapsedMS);
        }

        // Generate and store jigsaw pieces and their containers
        const currentThis = this;
        const imageRandom = seedrandom(`seed=${this.imageHash}-${this.randomSeed}`);
        for(let row = 0; row < this.config.rowColsRatio[0]; row++) {
            this.sprites[row] = [];
            for(let col = 0; col < this.config.rowColsRatio[1]; col++) {
                // Initialize sprite and its container representing jigsaw piece
                const jigsawPieceData = this.jigsawPiecesData[row][col];
                const sprite = new JigsawSprite(jigsawPieceData.texture);
                const container = new PIXI.Container();
                this.containers.add(container);
                sprite.anchor.set(0.5, 0.5);
                sprite.scale.set(this.upDownscale);

                // Store row and col in custom sprite for reference
                sprite.row = row;
                sprite.col = col;
                container.addChild(sprite);
    
                // Initialize mask for representing hitbox
                const newMask: PIXI.Graphics = jigsawPieceData.mask.clone();
                container.addChild(newMask);
                newMask.scale.set(this.upDownscale, this.upDownscale)
                newMask.position.set(
                    -newMask.bounds.minX * this.upDownscale - sprite.width / 2, 
                    -newMask.bounds.minY * this.upDownscale - sprite.height / 2);
                sprite.mask = newMask;
                this.application.stage.addChild(container);

                // Throw the container somewhere random on the screen and rotate randomly (do first!)
                // If there's existing save data, then skip this step and let shuffle do the work
                if(saveData === undefined) {
                    // Modify the angle first so we can get the proper bounds
                    if(this.config.settings.rotation !== 0) {
                        // Can't divide by zero!
                        let randomAngle = this.config.settings.rotation * Math.floor(imageRandom() * (360 / this.config.settings.rotation));
                        container.angle = randomAngle; // Force update needed?
                    }

                    // Determine valid movement points based on total "width" and "height"
                    const bounds = container.getBounds();
                    const centerX = (bounds.maxX - bounds.minX) * 0.6;
                    const centerY = (bounds.maxX - bounds.minX) * 0.6; // Give some bounds
                    const randomX = centerX + (this.containerDiv.clientWidth - centerX * 2) * imageRandom();
                    const randomY = centerY + (this.containerDiv.clientHeight - centerY * 2) * imageRandom();
                    container.x = randomX; container.y = randomY;
                }
    
                // Attach container handler events for pointer down
                container.eventMode = "static"; // ???
                container.cursor = "pointer";
                container.on("pointerdown", (event: PIXI.FederatedPointerEvent) => {
                    // Determine which action to fire
                    console.log("pointerdown")
                    const right = event.button === 2;
                    const action = currentThis.whatAction("pointerdown", right);
                    if(action === "dragStart") {
                        if(this.startTimeMS === -1) {
                            this.startTimeMS = get(this.elapsedTimeMSStore) !== 0
                                ? new Date().getTime() - get(this.elapsedTimeMSStore)
                                : new Date().getTime();
                        }
                        this.stopTick = false;

                        // Handle drag start for jigsaw
                        container.children.forEach(sprite => { sprite.alpha = 0.75 });
                        const position = event.data.getLocalPosition(container);
                        container.pivot.set(position.x, position.y);
                        currentThis.currentDragData = [container, row, col];
                        container.parent.toLocal(event.global, undefined, container.position);
                        currentThis.application.stage.on('pointermove', (event) => {
                            onDragMove(event, currentThis)
                        });
                        // Increment Z index every click lol
                        container.zIndex = currentThis.currentZIndex;
                        currentThis.currentZIndex++;
                    } else if(action === "dragEnd") {
                        currentThis.onDragEnd();
                    }
                });
    
                this.sprites[row].push(sprite);
            }
        }

        // If save data is present, render beforehand to update locations - then load save data
        if(saveData !== undefined) {
            // Iterate through each "container" and construct that container
            this.application.render();
            for(const containerConnections of saveData.connections) {
                for(let rowColIndex = 0; rowColIndex < containerConnections.length - 1; rowColIndex++) {
                    this.connectSprites(...containerConnections[rowColIndex], ...containerConnections[rowColIndex + 1])
                }
            }

            if(this.containers.size === 1) {
                this.handleCompletion(true);
            } else {
                // Shuffle the pieces again to remove any continuity whatever
                this.shuffleContainers(true);
            }
        }
    }

    // Connect two containers together, code somewhat copied from onDragEnd
    // Assume that all sprites have zero angle?
    async connectSprites(row1: number, col1: number, row2: number, col2: number) {
        // Ignore if both have the same parent already
        const sprite1 = this.sprites[row1][col1];
        const sprite2 = this.sprites[row2][col2];
        if(sprite1.parent === sprite2.parent) { return; }
        const sprite1Center = this.jigsawPiecesData[row1][col1].center;
        const sprite2Center = this.jigsawPiecesData[row2][col2].center;

        // Get the expected offset between the center points of both
        // Transform based on (360 - angle) degrees
        const expectedOffsetBase = [
            (sprite2Center.x - sprite1Center.x) * this.upDownscale, 
            (sprite2Center.y - sprite1Center.y) * this.upDownscale];
        const radians = (sprite1.parent.angle * Math.PI / 180); // Reverse
        const expectedOffsetActual = [
            expectedOffsetBase[0] * Math.cos(radians) - expectedOffsetBase[1] * Math.sin(radians),
            expectedOffsetBase[1] * Math.cos(radians) + expectedOffsetBase[0] * Math.sin(radians),
        ];
        const actualOffset = [
            sprite2.worldTransform.tx - sprite1.worldTransform.tx,
            sprite2.worldTransform.ty - sprite1.worldTransform.ty];
        const offsetDiff = [
            expectedOffsetActual[0] - actualOffset[0],
            expectedOffsetActual[1] - actualOffset[1]
        ];

        // Move the second container and stuff
        // const containerRadians = sprite1.parent.angle * Math.PI / 180 * -1;
        const containerRadians = 0;
        sprite2.parent.x += offsetDiff[0];
        sprite2.parent.y += offsetDiff[1];
        this.application.render();

        // Transfer the container of sprite 2 to sprite 1
        this.containers.delete(sprite2.parent)
        const connectedChildren = [...sprite2.parent.children]; // Mutate?
        for(const connectedSprite of connectedChildren) {
            let previousLocation = new PIXI.Point(connectedSprite.worldTransform.tx, connectedSprite.worldTransform.ty);
            sprite1.parent.addChild(connectedSprite);
            this.application.render();

            let newLocation = new PIXI.Point(connectedSprite.worldTransform.tx, connectedSprite.worldTransform.ty);

            // Rotate according to the angle specified
            const distanceX = previousLocation.x - newLocation.x;
            const distanceY = previousLocation.y - newLocation.y;
            connectedSprite.x += distanceX * Math.cos(containerRadians) - distanceY * Math.sin(containerRadians);
            connectedSprite.y += distanceY * Math.cos(containerRadians) + distanceX * Math.sin(containerRadians);
        }
        // sprite2.parent.destroy()
    }

    // Export save data to localStorage (and callback?)
    // - Key: image hash and target pieces
    // - Encrypted data: seed, elapsed time, and connections
    saveKey: string;
    saveData: JigsawPuzzles.JigsawSave;
    async saveProgress(overrideAction?: string): Promise<string> {
        this.saveData = {
            seed: this.randomSeed,
            elapsedMS: new Date().getTime() - this.startTimeMS,
            connections: [],
        };

        // Construct connections from container mappings
        for(const container of this.containers) {
            const containerRowCols: [number, number][] = [];
            for(const _sprite of container.children) {
                if((_sprite as any).row === undefined) { continue; }
                const sprite = _sprite as JigsawSprite;
                containerRowCols.push([sprite.row, sprite.col]);
            }
            this.saveData.connections.push(containerRowCols);
        }

        // Encode and encrypt the save data
        const encryptedSaveData = await encryptAES256GCM(JSON.stringify(this.saveData), encryptionKey);
        window.localStorage.setItem(this.saveKey, encryptedSaveData);
        
        // Callback if there's one set
        if(this.callbackSaved !== undefined) {
            const action = overrideAction ?? "update";
            this.callbackSaved(this.saveData, encryptedSaveData, action, this.saveKey);
        }

        return encryptedSaveData;
    }

    // Retrieve save data if exists from LocalStorage
    // - Then decrypt data before returning
    async getSaveData(): Promise<[string, JigsawPuzzles.JigsawSave | undefined]> {
        // Check whether any save data exists for the current configuration
        const urlHash = await hashSHA256(this.config.imageURL);
        // const saveKey = `${this.imageHash}-${this.config.rowColsRatio[0]}x${this.config.rowColsRatio[1]}`;
        const saveKey = `${urlHash}-${this.config.rowColsRatio.slice(0,2)}`;
        let saveData: JigsawPuzzles.JigsawSave | undefined = undefined;
        const encryptedSaveData = window.localStorage.getItem(saveKey);
        if(encryptedSaveData !== null) {
            // Save data exists, decrypt and load
            const saveDataRaw = await decryptAES256GCM(encryptedSaveData, encryptionKey);
            saveData = JSON.parse(saveDataRaw); // Cast to type
        }

        return [saveKey, saveData];
    }

    // Handle puzzle completion including callback and moving final sprite
    // Should progress be cleared after completion or not?
    async handleCompletion(suppress: boolean = false) {
        const lastContainer = Array.from(this.containers.values())[0];
        lastContainer.angle = 0;
        this.application.render();
        // Move the remaining container to the center of the screen
        const lastBounds = lastContainer.getBounds();
        const centerX = (lastBounds.minX + lastBounds.maxX) / 2;
        const centerY = (lastBounds.minY + lastBounds.maxY) / 2;
        lastContainer.position.set(this.containerDiv.clientWidth / 2 - centerX + lastContainer.position.x, 
            this.containerDiv.clientHeight / 2 - centerY + lastContainer.position.y);

        // Save progress, stop tick, play sound if not suppressed
        await this.saveProgress();
        this.stopTick = true;
        if(suppress === false) { 
            if(this.completeSound === undefined) {
                this.completeSound = new Audio(CompleteSound);
                this.completeSound.volume = 0.2;
            }
            this.completeSound.play(); 
        }

        // Afterwards, call callback if deffined
        if(this.callbackCompleted !== undefined) {
            let completionData: JigsawPuzzles.JigsawCompletionData = {
                config: this.config,
                save: {
                    seed: this.saveData.seed,
                    elapsedMS: this.saveData.elapsedMS
                }
            };
            this.callbackCompleted(this.saveData, suppress);
            // const encryptedCompletionData = await encryptAES256GCM(JSON.stringify(completionData), encryptionKey);
            // this.callbackCompleted(encryptedCompletionData);
        }
    }

    // Shuffle all containers to random positions and rotations, ensuring bounds are valid
    shuffleContainers(angle: boolean = false) {
        // Iterate through containers and rotate randomly
        const shuffleSeed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
        const shuffleRandom = seedrandom(`seed=${shuffleSeed}`);
        const marginSides = Math.ceil(Math.max(this.containerDiv.clientWidth, this.containerDiv.clientHeight) * 0.01);
        for(const container of this.containers) {
            // Rotate randomly and then get bounds to determine where to move
            if(angle === true) {
                let randomAngle = this.config.settings.rotation * Math.floor(shuffleRandom() * (360 / this.config.settings.rotation));
                container.angle = randomAngle; container.angle %= 360;
            }

            // Determine the distance from the position to the "true center" based on the bounds vs. center
            // For instance, in a 4-piece grid, the position may be centered on the top left sprite
            const bounds = container.getBounds();
            const centerX = (bounds.maxX - bounds.minX) / 2;
            const centerY = (bounds.maxY - bounds.minY) / 2;
            const coordCenterX = (bounds.maxX + bounds.minX) / 2;
            const coordCenterY = (bounds.maxY + bounds.minY) / 2;
            const diffX = container.position.x - coordCenterX;
            const diffY = container.position.y - coordCenterY;
            // Determine valid movement points based on total "width" and "height"
            const randomX = centerX + marginSides + (this.containerDiv.clientWidth - (centerX + marginSides) * 2) * shuffleRandom();
            const randomY = centerY + marginSides + (this.containerDiv.clientHeight - (centerY + marginSides) * 2) * shuffleRandom();
            container.x = randomX + diffX; container.y = randomY + diffY;
        }
    }

    // Toggle whether the ghost should be visible or not
    ghostVisible = false;
    toggleGhostVisibility() {
        this.ghostVisible = !this.ghostVisible;
        this.ghostSprite.alpha = this.ghostVisible ? 0.35 : 0;
    }

    // Toggle edge visibility for all containers depending on if any sprites are edges
    nonEdgeVisible = true;
    toggleEdgeVisibility() {
        this.nonEdgeVisible = !this.nonEdgeVisible;
        for(const container of this.containers) {
            if(this.nonEdgeVisible) {
                // Make all pieces visible regardless
                container.alpha = 1;
                container.interactive = true;
                container.zIndex = Math.abs(container.zIndex)
            } else {
                // Check whether container contains any edge piece
                let containerHasEdge = false;
                for(const _sprite of container.children) {
                    // Only care about sprites I guess
                    if((_sprite as any).row === undefined) { continue; }
                    const sprite = _sprite as JigsawSprite;
                    if(sprite.row === 0 || sprite.row === this.config.rowColsRatio[0] - 1
                        || sprite.col === 0 || sprite.col === this.config.rowColsRatio[1] - 1) {
                            containerHasEdge = true;
                            break;
                    } 
                }

                container.alpha = containerHasEdge ? 1 : 0.1;
                container.interactive = containerHasEdge;
                container.zIndex = Math.abs(container.zIndex) * (containerHasEdge ? 1 : -1);
            }
        }
    }

    // Different handlers for onDragStart, onDragMove, and onDragEnd (and fake onRotate)
    onRotate(clockwise: boolean = true) {
        if(this.currentDragData !== undefined) {
            // Rotate child sprites which are JigsawSprite, NOT the container
            const container = this.currentDragData[0];
            container.angle += clockwise ? this.config.settings.rotation : -this.config.settings.rotation;
            container.angle %= 360;
        }
    }

    // On drag end, check whether there's a match - and perform logistics
    // - Determine whether any other sprites match within error (+ rotation)
    async onDragEnd() {
        if(this.currentDragData !== undefined) {
            // this.application.stage.off('pointermove', );
            // Retrieve current container or sprite from the drag data, then reset
            const [sourceContainer] = this.currentDragData;
            sourceContainer.children.forEach(sprite => { sprite.alpha = 1 });
            this.currentDragData = undefined;

            // Iterate over source sprites and check whether any connections match
            // If connections match, then add the container to be "merged"
            const containersToTransfer: PIXI.Container[] = [];
            let containerRadians: number = 0;
            for(const _sourceSprite of sourceContainer.children) {
                // Ignore the mask, only care about the piece sprite
                if((_sourceSprite as any).row === undefined) { continue; }
                const sourceSprite = _sourceSprite as JigsawSprite;
                const currentPieceCenter = this.jigsawPiecesData[sourceSprite.row][sourceSprite.col].center;
                const connectedPiecesData = [
                    [sourceSprite.row - 1, sourceSprite.col],
                    [sourceSprite.row, sourceSprite.col + 1],
                    [sourceSprite.row + 1, sourceSprite.col],
                    [sourceSprite.row, sourceSprite.col - 1],
                ]; // Represents the row/col lookup for connected sprites
                for(const [connectedRow, connectedCol] of connectedPiecesData) {
                    // Construct a line from the source center to the expected connected center
                    const connectedPieceData = (this.jigsawPiecesData[connectedRow] ?? [])[connectedCol];
                    if(connectedPieceData === undefined) { continue; }
                    const connectedCenter = connectedPieceData.center;
                    const connectedSprite = this.sprites[connectedRow][connectedCol];
                    const connectedContainer = connectedSprite.parent;
                    if(connectedContainer === sourceContainer) { continue; }

                    // Normalize rounded angles because of computer math dumb stuff
                    const sourceAngleRound = this.config.settings.rotation !== 0
                        ? Math.round(sourceContainer.angle / this.config.settings.rotation) * this.config.settings.rotation
                        : 0;
                    const connectedAngleRound = this.config.settings.rotation !== 0
                        ? Math.round(connectedContainer.angle / this.config.settings.rotation) * this.config.settings.rotation
                        : 0;
                    sourceContainer.angle = sourceAngleRound; // Necessary?
                    connectedContainer.angle = connectedAngleRound;
                    if(sourceContainer.angle != connectedContainer.angle) { 
                        continue; 
                    }

                    // Get the expected offset between the center points of both
                    // Transform based on (360 - angle) degrees
                    const expectedOffsetBase = [
                        (connectedCenter.x - currentPieceCenter.x) * this.upDownscale, 
                        (connectedCenter.y - currentPieceCenter.y) * this.upDownscale];
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
                    if(offsetDiffPixels < this.pixelErrorAllowed) {
                        containerRadians = sourceContainer.angle * Math.PI / 180 * -1;
                        connectedContainer.x += offsetDiff[0];
                        connectedContainer.y += offsetDiff[1];
                        this.application.render();
                        containersToTransfer.push(connectedContainer);

                        if(this.snapSound === undefined) {
                            this.snapSound = new Audio(SnapSound);
                            this.snapSound.volume = 0.6;
                        }
                        this.snapSound.play();
                    }
                }
            }

            if(containersToTransfer.length === 0) { return; }

            // Transferring containers - destroy any destination containers after transferring their contents
            const containersToDestroy: PIXI.Container[] = [];
            for(const destinationContainer of containersToTransfer) {
                if(destinationContainer.children.length === 0) { continue; }
                const destinationChildren = [...destinationContainer.children]; // Mutate?
                for(const destinationSprite of destinationChildren) {
                    let previousLocation = new PIXI.Point(destinationSprite.worldTransform.tx, destinationSprite.worldTransform.ty);
                    sourceContainer.addChild(destinationSprite);
                    this.application.render();

                    let newLocation = new PIXI.Point(destinationSprite.worldTransform.tx, destinationSprite.worldTransform.ty);

                    // Rotate according to the angle specified
                    const distanceX = previousLocation.x - newLocation.x;
                    const distanceY = previousLocation.y - newLocation.y;
                    destinationSprite.x += distanceX * Math.cos(containerRadians) - distanceY * Math.sin(containerRadians);
                    destinationSprite.y += distanceY * Math.cos(containerRadians) + distanceX * Math.sin(containerRadians);
                }
                // sourceContainer.addChild(destinationContainer) // ???
                containersToDestroy.push(destinationContainer);
                this.containers.delete(destinationContainer);
            }
            containersToDestroy.forEach(container => { container.destroy(); });
            
            // When there's only one container left, then the game is done
            if(this.containers.size === 1) {
                this.handleCompletion();
            }

            // Save after drag end assuming something has changed
            this.saveProgress();
        }
    }
}

export function onDragMove(event: PIXI.FederatedPointerEvent, instance: JigsawInstance) {
    if(instance.currentDragData !== undefined) {
        // Update the location of the current container... idk how this magic works
        instance.currentDragData[0].parent.toLocal(event.global, undefined, instance.currentDragData[0].position);
    }
}