import * as PIXI from "pixi.js"; 
import type { ExtensionConfig, ExtensionCustom } from "./extension";
import { renderConfigHandlebar } from "./nunjucks";

// Community extension configuration for "Jigsaw Puzzles" 
export const Slug = "jigsaw-puzzles";
export const Key  = "jigsaw_puzzles"; // Within database

// Extension configuration signature
export interface Config extends ExtensionConfig {
    config: { 
        jigsaws: JigsawData[];
    }
}
// Extension custom data signature
export interface Custom extends ExtensionCustom {
    custom: { 
        [hash: string]: {
            completed: boolean;
            encrypted: string;
        }
    };
}

// Individual jigsaw data for the Jigsaw Puzzles extension
export interface JigsawData {
    display:  string;
    imageURL: string; // Note: check whitelisted URLs (imgbox.com)
    // thumbnail URL is automatically created from image URL
    rowColsRatio: [number, number, number]; // Initialized to 0, 0, 0
    settings: {
        rotation:   number;  // 0, 15, 30, 45, 90, 180
        allowGhost: boolean; // Allow ghosting (showing final image)
        allowEdge:  boolean; // Allow filtering for only edge pieces
    };
    targetPieces?: number;
}

// Save data stored locally and in chaster_actions when completed
export interface JigsawSave {
    seed:        string;
    elapsedMS:   number;               // Elapsed time in milliseconds
    connections: [number, number][][]; // Jigsaw piece connections?
}

export function generateHandlebar(config: ExtensionConfig) {
    return renderConfigHandlebar(config, "jigsaw-puzzles")
}

// Data only for client-side
// Internal data
export interface JigsawPieceData {
    center:       PIXI.Point;
    texture:      PIXI.Texture;
    mask:         PIXI.Graphics;
};
export class JigsawSprite extends PIXI.Sprite {
    row: number = -1;
    col: number = -1;
}

export interface JigsawCompletionData {
    config: JigsawData;
    save:   Omit<JigsawSave, "connections">;
}
export type ActionType = "dragStart" | "dragEnd" | "right";

export const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                           '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                           '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                           '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                           '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                           '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                           '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                           '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                           '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                           '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];