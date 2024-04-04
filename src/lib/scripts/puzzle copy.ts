import seedrandom from "seedrandom";
import { hashSHA256, sleep } from "./utility";

export interface JigsawPieceExport {
    imageBase64: string;
    connections: [
        [Coordinate, number, number] | undefined,
        [Coordinate, number, number] | undefined,
        [Coordinate, number, number] | undefined,
        [Coordinate, number, number] | undefined
    ]
}

// Coordinates class with additional utility methods
export class Coordinate {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Angle from horizontal relative to A "looking at" B
    // A -------
    //  \ ang  B
    relativeTo(other: Coordinate): [number, number, [number, number]] {
        const distance = Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));;
        let angleDeg = Math.atan((other.y - this.y) / (other.x - this.x)) * 180 / Math.PI;
        if(isNaN(angleDeg)) { angleDeg = 0; }
        const translation: [number, number] = [other.x - this.x, other.y - this.y];

        return [distance, angleDeg, translation]
    }

    // Create coordinate relative given distance and angle
    createRelative(distance: number, angleDeg: number) {
        const relativeX = this.x + Math.cos(angleDeg / 180 * Math.PI) * distance;
        const relativeY = this.y + Math.sin(angleDeg / 180 * Math.PI) * distance;

        return new Coordinate(relativeX, relativeY);
    }
}

// Bezier curve for classic jigsaw piece, facing upwards
const bezierCoordinates: [Coordinate, [number, number], [number, number]][] = [
    [new Coordinate(0, 0), [0, 0], [0, 0]],
    [new Coordinate(30, 8), [-2.5, 5], [-2.5, 2.5]],
    [new Coordinate(38, -2), [-2.5, 2.5], [0, 0]],
    [new Coordinate(30, -12), [-2.5, 2.5], [0, 0]],
    [new Coordinate(40, -24), [-2.5, 2.5], [0, 5]],
    [new Coordinate(60, -24), [-2.5, 2.5], [0, 5]],
    [new Coordinate(70, -12), [-2.5, 2.5], [0, 0]],
    [new Coordinate(62, -2), [-2.5, 2.5], [0, 0]],
    [new Coordinate(70, 8), [-5, 2.5], [-2.5, 2.5]],
    [new Coordinate(100, 0), [0, 0], [0, 0]],
];
const coordRandomMultiplier = 0.1;

// Generates new coordinate sets given inputs from other wrapper functions
function generateNewCoordinates(coordinates: Coordinate[], starting: Coordinate, transformEndingRelative: Coordinate, scaleRatio: number, rotationDeg: number, translate: number[], reflect: boolean, fix: boolean = false): Coordinate[] {    
    // Don't ask why, magical fix
    // Something something getting the wrong angles?
    if(fix && rotationDeg < 0) { rotationDeg = 180 + rotationDeg } 

    // Scale and rotate coordinates set according to calculated (translate needed?)
    const newCoordinates: Coordinate[] = [];
    for(const coordinate of coordinates) {
        // Determine distance and angle relative to starting, then scale/rotate before creating new 
        const [coordDistance, coordAngleDeg] = coordinate.relativeTo(starting);
        const newDistance = coordDistance * scaleRatio;  
        const newAngleDeg = coordAngleDeg + rotationDeg;
        let newCoordinate = starting.createRelative(newDistance, newAngleDeg);
        if(reflect === false) {
            // Don't reflect and immediately add
        } else {
            // If specified, reflect coordinates across "line"
            // https://stackoverflow.com/questions/3306838/algorithm-for-reflecting-a-point-across-a-line
            let slope = (transformEndingRelative.y - starting.y) / (transformEndingRelative.x - starting.x);
            if(isNaN(slope)) { slope = Math.max(); }
            const intercept = (transformEndingRelative.x * starting.y - transformEndingRelative.y * starting.x) / (transformEndingRelative.x - starting.x)
            // d = (x1 + (y1 - c)*m)/(1 + m^2)
            const d_const = (newCoordinate.x + (newCoordinate.y - intercept) * slope) / (1 + slope * slope);
            // Overwrite new coordinate before translation
            newCoordinate = new Coordinate(2 * d_const - newCoordinate.x, 2 * d_const * slope - newCoordinate.y + 2 * intercept);
        }
        
        // Apply translation before pushing
        newCoordinate = new Coordinate(newCoordinate.x + translate[0], newCoordinate.y + translate[1]);

        newCoordinates.push(newCoordinate);
    }

    return newCoordinates;
}

// Utility functions for fancy geometry calculations (aka transforming coordinate sets)
// Transform given coordinate set given starting point, base ending point, and transformed ending point
// If reflect is specified, reflect (flip) the coordinates 
// This function is pretty damn broken for some reason with random bugs
export function transformCoordinateSet(transformStarting: Coordinate, transformEnding: Coordinate, reflect: boolean, coordinates: Coordinate[], fix: boolean = false): Coordinate[] {
    // Calculate the angle rotation and scaling between base and transformed
    const baseStarting = coordinates[0];
    const baseEnding = coordinates[coordinates.length-1];
    const transformEndingRelative = new Coordinate(transformEnding.x - transformStarting.x, transformEnding.y - transformStarting.y);
    const [baseDistance, baseAngleDeg, _] = baseStarting.relativeTo(baseEnding);
    const [transformDistance, transformAngleDeg] = baseStarting.relativeTo(transformEndingRelative);
    const translate = [transformStarting.x - baseStarting.x, transformStarting.y - baseStarting.y];
    const scaleRatio = transformDistance / baseDistance;
    let rotationDeg = transformAngleDeg - baseAngleDeg; // Why +180?
    // if(rotationDeg < 0) { rotationDeg += 360; }

    const newCoordinates = generateNewCoordinates(coordinates, baseStarting, transformEndingRelative, scaleRatio, rotationDeg, translate, reflect, fix);

    return newCoordinates;
}
// Work with existing coordinate set without reference point, including scaling, rotating, translating, and reflecting (starting to ending point)
export function workCoordinateSet(coordinates: Coordinate[], scaleRatio: number = 1, rotationDeg: number = 0, translate: number[] = [0, 0], flip: boolean): Coordinate[] {
    // Flip coordinates beforehand by incrementing rotation degrees by 180 and "shifting" by end diff
    let newCoordinates = [...coordinates];
    // newCoordinates = newCoordinates.map(coordinate => new Coordinate(coordinate.x + translate[0], coordinate.y + translate[1]));
    if(flip === true) {
        const shiftX = newCoordinates[newCoordinates.length - 1].x - newCoordinates[0].x;
        const shiftY = newCoordinates[newCoordinates.length - 1].y - newCoordinates[0].y;
        newCoordinates = newCoordinates.map(coordinate => new Coordinate(coordinate.x - shiftX, coordinate.y - shiftY))
            .reverse(); // ???
    }
    newCoordinates = generateNewCoordinates(newCoordinates, newCoordinates[0], newCoordinates[coordinates.length-1], scaleRatio, rotationDeg, translate, false);

    return newCoordinates;
}

// Draw bezier coordinates onto a canvas, stroking if stroke = true
export function drawBezierCoordinates(context: CanvasRenderingContext2D, coordinates: Coordinate[], stroke?: string) {
    // If stroking, make sure to move - otherwise assume continuous
    if(stroke) { 
        context.beginPath(); context.strokeStyle = stroke; 
    }

    // context.moveTo(coordinates[0].x, coordinates[0].y)
    for(let index = 0; index < coordinates.length - 1; index++) {
        const previousCoordinates = coordinates[index];
        const currentCoordinates = coordinates[index + 1];
        const xc = (currentCoordinates.x + previousCoordinates.x) / 2;
        const yc = (currentCoordinates.y + previousCoordinates.y) / 2;
        context.quadraticCurveTo(previousCoordinates.x, previousCoordinates.y, xc, yc);
    }
    context.lineTo(coordinates[coordinates.length-1].x, coordinates[coordinates.length-1].y);

    if(stroke) { context.stroke(); }

    // context.beginPath();
    // context.arc(coordinates[2].x, coordinates[2].y, 5, 0, 2 * Math.PI, false);
    // context.stroke();

    // for(let index = 0; index < coordinates.length - 1; index++) {
    //     context.beginPath();
    //     context.strokeStyle = stroke ?? "red";
    //     context.arc(coordinates[index].x, coordinates[index].y, index === 0 ? 10 : 3, 0, Math.PI * 2, false);
    //     context.stroke();
    // }
}

const random = true;

// Generate base64 representations of jigsaw puzzle pieces from image using invisible canvas
export async function generateJigsawPieces(image: HTMLImageElement, pixelsPerGrid: number, canvas?: HTMLCanvasElement) {
    const now = new Date().getTime()

    // Initialize normal canvas and normal context
    if(canvas === undefined) { 
        canvas = document.createElement("canvas");
        canvas.height = image.height;
        canvas.width = image.width;
    }
    const context = canvas.getContext("2d");
    if(!context) { throw new Error("couldn't create canvas context"); }
    
    // Create temporary canvas for generating image hash for seeding random number generator
    const hashCanvas = document.createElement("canvas");
    hashCanvas.width = image.width; hashCanvas.height = image.height;
    const hashContext = hashCanvas.getContext("2d");
    if(!hashContext) { throw new Error("couldn't create hash canvas context"); }
    const imageBase64 = hashCanvas.toDataURL();
    const imageHash = await hashSHA256(imageBase64);
    hashContext.clearRect(0, 0, hashCanvas.width, hashCanvas.height);
    const imageRandom = seedrandom(imageBase64 + `${random ? Math.random() : 0}`);

    canvas.style.background = imageBase64;

    // Determine the number of rows and columns for the jigsaw puzzle
    // TODO: eventually implement three-way and four-way jigsaw puzzles with avoidance / min piece size
    const jigsawRows = Math.floor(image.height / pixelsPerGrid);
    const jigsawRowHeight = image.height / jigsawRows;
    const jigsawCols = Math.floor(image.width / pixelsPerGrid);
    const jigsawColWidth = image.width / jigsawCols;

    // Generate the edge beziers for the horizontal and vertical edges
    // https://cs.stackexchange.com/questions/62847/draw-a-5-%C3%97-5-grid-graph-how-many-edges-does-the-n-%C3%97-n-grid-graph-have
    const numHorizontalEdges = (jigsawRows + 1) * jigsawCols;
    const numVerticalEdges = (jigsawCols + 1) * jigsawRows;
    async function generateEdgeBeziers(direction: "horizontal" | "vertical", index: number) {
        // Return straight bezier if horizontal and at top or bottom edge
        if(direction == "horizontal" && (index >= 0 && index < jigsawCols) || (index < numHorizontalEdges && index >= numHorizontalEdges - jigsawCols)) {
            return [new Coordinate(0, 0), new Coordinate(50, 0), new Coordinate(100, 0)];
        } else if(direction == "vertical" && (index >= 0 && index < jigsawRows) || (index < numVerticalEdges && index >= numVerticalEdges - jigsawRows)) {
            return [new Coordinate(0, 0), new Coordinate(50, 0), new Coordinate(100, 0)];
        }

        // Generate seeded random for this specific set of beziers
        const edgeRandom = seedrandom(`${imageHash}-${direction}-${index}-${random ? Math.random() : 0}`);
        const randomizedBezierCoordinates: Coordinate[] = [];
        const baseShiftX = 5 - edgeRandom() * 10;
        const baseShiftY = 2.5 - edgeRandom() * 5;
        for(let bezierIndex = 0; bezierIndex < bezierCoordinates.length; bezierIndex++) {
            const [sourceCoordinate, variationX, variationY] = bezierCoordinates[bezierIndex]
            const deltaX = variationX[1] - variationX[0];
            const deltaY = variationY[1] - variationY[0];
            const randomizedX = sourceCoordinate.x + variationX[1] - edgeRandom() * deltaX;
            const randomizedY = sourceCoordinate.y + variationY[1] - edgeRandom() * deltaY;
            const shiftMult = bezierIndex === 0 || bezierIndex === bezierCoordinates.length - 1 ? 0 : 1;
            randomizedBezierCoordinates.push(new Coordinate(randomizedX + baseShiftX * shiftMult, randomizedY + baseShiftY * shiftMult));
        }
        return randomizedBezierCoordinates;
    }
    const horizontalBeziersSets: Coordinate[][] = [];
    for(let index = 0; index < numHorizontalEdges; index++) {
        horizontalBeziersSets[index] = await generateEdgeBeziers("horizontal", index);
    }
    const verticalBeziersSets: Coordinate[][] = [];
    for(let index = 0; index < numVerticalEdges; index++) {
        verticalBeziersSets[index] = await generateEdgeBeziers("vertical", index);
    }

    // Generate randomized vertexes for puzzle piece "grids", [col][row]
    const vertexes: Coordinate[][] = [];
    const maxVertexX = jigsawCols + 1;
    const maxVertexY = jigsawRows + 1;
    for(let vertexX = 0; vertexX < maxVertexX; vertexX++) {
        vertexes[vertexX] = [];
        for(let vertexY = 0; vertexY < maxVertexY; vertexY++) {
            // If at top or bottom, don't randomize X - if left or right, don't randomize Y
            const xMultiplier = vertexX == 0 || vertexX == maxVertexX - 1 ? 0 : 1;
            const yMultiplier = vertexY == 0 || vertexY == maxVertexY - 1 ? 0 : 1;
            const randomizedX = vertexX * jigsawColWidth + xMultiplier * coordRandomMultiplier 
                * (jigsawColWidth - 2 * await imageRandom() * jigsawColWidth);
            const randomizedY = vertexY * jigsawRowHeight + yMultiplier * coordRandomMultiplier 
                * (jigsawRowHeight - 2 * await imageRandom() * jigsawRowHeight);
            const randomCoordinate = new Coordinate(randomizedX, randomizedY);

            vertexes[vertexX].push(randomCoordinate);
        }
    }

    // Scale, rotate, translate, and store horizontal beziers first, then vertical vertexes
    for(let bezierIndex = 0; bezierIndex < horizontalBeziersSets.length; bezierIndex++) {
        const horizontalBezierSet = horizontalBeziersSets[bezierIndex];

        // Get starting and ending vertex to place beziers
        const row = Math.floor(bezierIndex / jigsawCols);
        const col = bezierIndex % jigsawCols;
        const startingVertex = vertexes[col][row];
        const endingVertex = vertexes[col + 1][row];

        // Perform fancy transformations to bezier set before drawing
        const reflect = row === 0 || row === jigsawRows ? false : imageRandom() > 0.5;
        const transformedBeziers = transformCoordinateSet(startingVertex, endingVertex, reflect, horizontalBezierSet);
        horizontalBeziersSets[bezierIndex] = transformedBeziers;
    }
    for(let bezierIndex = 0; bezierIndex < verticalBeziersSets.length; bezierIndex++) {
        const verticalBezierSet = verticalBeziersSets[bezierIndex];

        // Get starting and ending vertex to place beziers
        const row = bezierIndex % jigsawRows;
        const col = Math.floor(bezierIndex / jigsawRows);
        const startingVertex = vertexes[col][row];
        const endingVertex = vertexes[col][row + 1];

        // // Perform fancy transformations to bezier set before drawing
        const reflect = col === 0 || col === jigsawCols ? false : imageRandom() > 0.5;
        const transformedBeziers = transformCoordinateSet(startingVertex, endingVertex, reflect, verticalBezierSet, true); // Fix???
        verticalBeziersSets[bezierIndex] = transformedBeziers;
    }
    

    // Utility functions
    function outOfBounds(row: number, col: number) {
        return row < 0 || row >= jigsawRows || col < 0 || col > jigsawCols;
    }
    function middleCoordinate(coordinates: Coordinate[]) {
        if(coordinates.length % 2 == 0) {
            return coordinates[coordinates.length / 2];
        } else {
            const middleLeftIndex = Math.floor(coordinates.length / 2);
            const leftCoordinate = coordinates[middleLeftIndex];
            const rightCoordinate = coordinates[middleLeftIndex + 1];
            return new Coordinate((leftCoordinate.x + rightCoordinate.x) / 2, (leftCoordinate.y + rightCoordinate.y) / 2);
        }
    }

    // Iterate over "pieces" of jigsaw, clip before drawing image and exporting
    // Clip all transparent borders on the image before storing as base64 for rendering
    const disposableCanvas = document.createElement("canvas");
    const disposableContext = disposableCanvas.getContext("2d");
    if(!disposableContext) { throw new Error("couldn't create disposable canvas context"); }
    const jigsawDataExport: {
        imageBase64: string;
        pieces:      JigsawPieceExport[][];
    } = {
        imageBase64: imageBase64,
        pieces: [],
    };
    for(let row = 0; row < jigsawRows; row++) {
        jigsawDataExport.pieces[row] = [];
        for(let col = 0; col < jigsawCols; col++) {
            // Get edge beziers for drawing: north east south west 
            const edgeBeziers = [ // Somehow these reverses work?
                [...horizontalBeziersSets[row * jigsawCols + col]],
                [...verticalBeziersSets[(col + 1) * jigsawRows + row]],
                // Somehow these reverses are needed, move upwards?
                [...horizontalBeziersSets[(row + 1) * jigsawCols + col]].reverse(),
                [...verticalBeziersSets[col * jigsawRows + row]].reverse(),
            ];

            // Store edge piece rows and columns, undefined if edge
            const connectionCoordinates: JigsawPieceExport["connections"] = [
                !outOfBounds(row, col - 1) ? [middleCoordinate(edgeBeziers[0]), row, col - 1] : undefined,
                !outOfBounds(row - 1, col) ? [middleCoordinate(edgeBeziers[1]), row + 1, col] : undefined,
                !outOfBounds(row, col + 1) ? [middleCoordinate(edgeBeziers[2]), row, col + 1] : undefined,
                !outOfBounds(row + 1, col) ? [middleCoordinate(edgeBeziers[3]), row - 1, col] : undefined,
            ];
            // Crop bounding box to 50 pixels in each direction for optimization
            const boundingBox = [canvas.width, canvas.height, 0, 0];
            for(const connectionData of connectionCoordinates) {
                if(connectionData === undefined) { continue; }
                const [coord] = connectionData;
                if(coord.x < boundingBox[0]) { boundingBox[0] = Math.floor(coord.x) }
                if(coord.y < boundingBox[1]) { boundingBox[1] = Math.floor(coord.y) }
                if(coord.x > boundingBox[2]) { boundingBox[2] = Math.ceil(coord.x) }
                if(coord.y > boundingBox[3]) { boundingBox[3] = Math.ceil(coord.y) }
            }
            boundingBox[0] -= pixelsPerGrid;
            boundingBox[1] -= pixelsPerGrid;
            boundingBox[2] += pixelsPerGrid;
            boundingBox[3] += pixelsPerGrid;
            if(boundingBox[0] < 0) { boundingBox[0] = 0; }
            if(boundingBox[1] < 0) { boundingBox[1] = 0; }
            if(boundingBox[2] > canvas.width) { boundingBox[2] = canvas.width; }
            if(boundingBox[3] > canvas.height) { boundingBox[2] = canvas.height; }
            const boundingWidth = boundingBox[2] - boundingBox[0];
            const boundingHeight = boundingBox[3] - boundingBox[1];

            // Draw the beziers without stroking before clipping 
            context.beginPath();
            edgeBeziers.forEach(bezierSet => drawBezierCoordinates(context, bezierSet));
            context.clip();
            context.drawImage(image, 0, 0);

            // Retrieve image data and crop based on transparent borders
            // Calculate transparent borders for copying and cropping from disposable canvas
            // Implement binary search algorithm for traversing across rows and columns (9 vs 600 iters?)
            const imageData = context.getImageData(boundingBox[0], boundingBox[1], boundingWidth, boundingHeight);
            let borders = [-1, -1, -1, -1]; 
            const alphaPixels = imageData.data.filter((_, index) => index % 4 === 3);
            // Construct row and column representations for binary search

            for(let pixel = 0; pixel < alphaPixels.length; pixel++) {
                if(borders[1] != -1) { break; }
                if(alphaPixels[pixel] > 0) { 
                    const pixelRow = Math.floor(pixel / boundingWidth);
                    borders[1] = Math.floor(pixelRow + boundingBox[1]); 
                    break;              
                }
            }
            for(let pixel = alphaPixels.length - 1; pixel >= 0; pixel--) {
                if(borders[3] != -1) { break; }
                if(alphaPixels[pixel] > 0) { 
                    const pixelRow = Math.floor(pixel / boundingWidth);
                    borders[3] = Math.floor(pixelRow + boundingBox[1]); 
                    break;
                }
            }
            for(let pixelCol = 0; pixelCol < boundingWidth; pixelCol++) {
                if(borders[0] != -1) { break; }
                for(let pixel = pixelCol; pixel < alphaPixels.length; pixel += boundingWidth ?? 0) {
                    if(alphaPixels[pixel] > 0) {
                        borders[0] = Math.floor(pixelCol + boundingBox[0]);
                        break;
                    }
                }
            }
            for(let pixelCol = boundingWidth - 1; pixelCol >= 0; pixelCol--) {
                if(borders[2] != -1) { break; }
                for(let pixel = pixelCol; pixel < alphaPixels.length; pixel += boundingWidth ?? 0) {
                    if(alphaPixels[pixel] > 0) {
                        borders[2] = Math.floor(pixelCol + boundingBox[0]);
                        break;
                    }
                }
            }

            // Copy to disposable canvas then export as base64
            disposableCanvas.width = borders[2] - borders[0];
            disposableCanvas.height = borders[3] - borders[1];
            disposableContext.clearRect(0, 0, disposableCanvas.width, disposableCanvas.height);
            disposableContext.drawImage(canvas, borders[0], borders[1], disposableCanvas.width, disposableCanvas.height, 0, 0, disposableCanvas.width, disposableCanvas.height);
            const jigsawBase64 = disposableCanvas.toDataURL();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.reset()

            // Store the data along with connection info
            jigsawDataExport.pieces[row][col] = {
                connections: connectionCoordinates,
                imageBase64: jigsawBase64
            }
        }
    }

    console.log(new Date().getTime() - now)
}