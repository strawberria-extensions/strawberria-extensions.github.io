import seedrandom from "seedrandom";
import * as PIXI from "pixi.js"
import * as XXH from "xxhashjs";

// Constants for fine-tuning
const maxRowCols = 30;
const weightAspectRatio = 10; // WIP ratios
const weightPieces = 0.05;    // WIP ratios
const vertexVarianceMultiplier = 0.1;
const jigsawSizeRatio = 0.9;
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

// Setup and render jigsaw puzzle pieces from image using invisible or provided canvas
// - Initialize seeded random number generator from SHA256 of image base64 representation
// - Generate random vertex points for jigsaw puzzle pieces within paper (TODO: non-standard jigsaw)
export async function generateRenderJigsaw(containerDiv: HTMLDivElement, imageSrc: string, targetPieces: number) {
    // Generate base64 representation of image source before hashing compressed jpg representation (string size)
    const now = new Date().getTime(); // Only for testing
    const imageTexture: PIXI.Texture = await PIXI.Assets.load(imageSrc);
    imageTexture.source.autoGenerateMipmaps = true;
    imageTexture.source.antialias = true;
    const jigsawApplication = new PIXI.Application();
    await jigsawApplication.init({ width: containerDiv.clientWidth, height: containerDiv.clientHeight });
    containerDiv.appendChild(jigsawApplication.canvas);
    // jigsawApplication.canvas.width = "100%"
    const imageB64 = await jigsawApplication.renderer.extract.base64({ target: imageTexture, format: "jpg", quality: 0.5 });
    const imageHash = await XXH.h64(imageB64, 0); // For seeding random number generator
    const imageRandom = await seedrandom(`${now}` + imageHash);

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
    const [[jigsawRows, jigsawCols], jigsawPieces, jigsawAspectRatio] = jigsawRatios[0];

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

    const testSprite = new PIXI.Sprite(imageTexture);
    testSprite.scale = jigsawDimensions.height / imageTexture.height;
    jigsawApplication.stage.addChild(testSprite);
    // jigsawApplication.render();

    // Render individual jigsaw pieces using the following algorithm:
    // - Retrieve the ratio coordinate for the top-left vertex of each jigsaw > convert to pixel-based and move
    // - Generate the bezier curves, seeded using the ID of the edge (ex: horizontal-1)
    // - Given the other three vertexes, transform and draw the bezier curves
    // - Raster the "chunk" of the image within the bounds, and somehow clip?
    // const jigsawHeight = testSprite.height;
    // const jigsawWidth = testSprite.width;
    for(let row = 0; row < jigsawRows; row++) {
        for(let col = 0; col < jigsawCols; col++) {
            // Retrieve the vertexes for top left, top right, bottom right, and bottom left corners of the jigsaw
            const ratioVertexes = [
                jigsawVertexes[col][row],
                jigsawVertexes[col + 1][row],
                jigsawVertexes[col + 1][row + 1],
                jigsawVertexes[col][row + 1]
            ];
            const pixelVertexes = ratioVertexes.map( // Did I screw this up or something? Whatever.
                vertexData => new PIXI.Point(vertexData.x * testSprite.width, vertexData.y * testSprite.height));
            
            // DEBUG drawing circles
            // for(const pixelVertex of pixelVertexes) {
            //     const graphics = new PIXI.Graphics();
            //     graphics.circle(pixelVertex.x, pixelVertex.y, 4);
            //     graphics.fill("yellow");
            //     jigsawApplication.stage.addChild(graphics);
            // }

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
                    const edgeRandom = seedrandom(`${now}${vertexIndex % 2 === 0 ? "horizontal" : "vertical"}-${index}`);
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
            const graphic = new PIXI.Graphics().path(jigsawPiecePath).fill(colorArray[(row * jigsawCols + col) % colorArray.length]);
            graphic.visible = true;
            testSprite.addChild(graphic); // Don't care really

            testSprite.mask = graphic;
            console.log(await jigsawApplication.renderer.extract.base64({ target: testSprite }))
            
            // jigsawPieceGraphics.moveTo(pixelVertexes[0].x, pixelVertexes[0].y);

            // jigsawPieceGraphics.stroke("yellow");
            // jigsawApplication.stage.addChild(jigsawPieceGraphics);
            // jigsawApplication.render();
        }
    }
    // testSprite.destroy();
}