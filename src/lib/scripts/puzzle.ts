import seedrandom from "seedrandom";
import { hashSHA256 } from "./utility";

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
            .reverse();
    }
    newCoordinates = generateNewCoordinates(newCoordinates, newCoordinates[0], newCoordinates[coordinates.length-1], scaleRatio, rotationDeg, translate, false);

    return newCoordinates;
}

// Draw bezier coordinates onto a canvas, stroking if stroke = true
export function drawBezierCoordinates(context: CanvasRenderingContext2D, coordinates: Coordinate[], stroke?: string) {
    // If stroking, make sure to move - otherwise assume continuous
    if(stroke) { 
        context.beginPath(); context.strokeStyle = stroke; 
        context.moveTo(coordinates[0].x, coordinates[0].y)
    }

    for(let index = 0; index < coordinates.length - 1; index++) {
        const previousCoordinates = coordinates[index];
        const currentCoordinates = coordinates[index + 1];
        const xc = (currentCoordinates.x + previousCoordinates.x) / 2;
        const yc = (currentCoordinates.y + previousCoordinates.y) / 2;
        context.quadraticCurveTo(previousCoordinates.x, previousCoordinates.y, xc, yc);
    }
    context.lineTo(coordinates[coordinates.length-1].x, coordinates[coordinates.length-1].y);

    if(stroke) { context.stroke(); }

    for(let index = 0; index < coordinates.length - 1; index++) {
        context.beginPath();
        context.strokeStyle = stroke ?? "red";
        context.arc(coordinates[index].x, coordinates[index].y, index === 0 ? 10 : 3, 0, Math.PI * 2, false);
        context.stroke();
    }
}

const random = true;

// Generate base64 representations of jigsaw puzzle pieces from image using invisible canvas
export async function generateJigsawPieces(image: HTMLImageElement, pixelsPerGrid: number, canvas?: HTMLCanvasElement) {
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
    hashContext.drawImage(image, 0, 0);
    const imageBase64 = hashCanvas.toDataURL();
    const imageHash = await hashSHA256(imageBase64);
    hashContext.clearRect(0, 0, hashCanvas.width, hashCanvas.height);
    const imageRandom = seedrandom(imageBase64 + `${random ? Math.random() : 0}`);

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

            context.beginPath();
            context.strokeStyle = "orange";
            context.arc(randomizedX, randomizedY, 5, 0, 2 * Math.PI, false);
            context.stroke();

            vertexes[vertexX].push(randomCoordinate);
        }
    }

    // Scale, rotate, translate, and draw horizontal beziers first, then vertical vertexes
    // const colors = ["red", "green", "blue", "violet", "white", "yellow"];
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
        drawBezierCoordinates(context, transformedBeziers, "red");
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
        drawBezierCoordinates(context, transformedBeziers, "green");
    }
}