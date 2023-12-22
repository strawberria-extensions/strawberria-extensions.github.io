export type BezierCut = number[][];
export const bezierCutClassic: BezierCut = [
    [0,0,448,-224,448,-96],
    [448,-32,384,-32,384,64],
    [384,160,448,192,512,192],
    [576,192,640,160,640,64],
    [640,-32,576,-32,576,-96],
    [576,-224,1024,0,1024,0]
];

export interface JigsawPuzzleSettings {
    imageURL: string; // URL to load image from, proxy through Supabase / only allow ibb.co?
}

// Jigsaw puzzle handling logic, with attached canvas?
export class JigsawPuzzle {
    complexity: number           = 7;
    numSteps:   number           = 24;
    numPieces:  number           = 120;
    bezierCut:  BezierCut        = bezierCutClassic;
    // =============================================
    imageData:       HTMLImageElement = new Image(); // Initially undefined
    actualNumPieces: number           = 0;

    constructor() {
    }

    // Initialize jigsaw puzzle from settings, returning data when finished?
    async initialize(settings: JigsawPuzzleSettings) {
        // Wait for image to finish loading - perhaps proxy?
        await new Promise((resolve) => {
            this.imageData.onload = resolve;
            this.imageData.src = settings.imageURL;
        });

        // Determine piece size matching desired number of pieces
        let pieceSidePixels = 1;
        while(true) { // Iterate until 'maximum' piece size found, then exit
            const rowsFloor = Math.floor(this.imageData.height / pieceSidePixels);
            const colsFloor = Math.floor(this.imageData.width / pieceSidePixels);
            this.actualNumPieces = rowsFloor * colsFloor;
            if(this.actualNumPieces <= this.numPieces) { break; } 
            pieceSidePixels++;
        }

        this.imageData.src = settings.imageURL;
        this.imageData.onload
    }


    numRows: number = -1;
    numCols: number = -1;
    
}