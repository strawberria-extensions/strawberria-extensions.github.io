import type { RegularityConfig } from "./extension";
import type { ExtensionConfig, ExtensionCustom } from "./extension";
import type { LockEffectData } from "./lock_effects";
import { renderConfigHandlebar } from "./nunjucks";

// Community extension configuration for "Extended Wheel of Fortune" 
export const Slug = "extended-wheel-of-fortune";
export const Key  = "extended_wheel"; // Within database

// Extension configuration signature
export interface Config extends ExtensionConfig {
    config: { 
        wheels: { [wheelID: string]: WheelData;}
    };
}
// Extension custom data signature
export interface Custom extends ExtensionCustom {
    custom: { [wheelID: string]: WheelCustom; }
}

// Individual wheel data for the Extended Wheel of Fortune
export interface WheelData {
    display:    string;           
    note?:      string;           // Note to be displayed when user loads wheel
    settings: {
        disabled:       boolean; 
        hiddenWeights:  boolean; // Hide outcome weights for the wheel
        hiddenOutcomes: boolean; // Hide outcomes for the wheel (also hiddenEffects)
        hiddenEffects:  boolean; // Hides lock effects for outcomes before spinning
    }; 
    regularity: RegularityConfig; 
    outcomes:   OutcomeData[];    // List of outcomes for the wheel
}
// Outcome data returned to user, omits percentage in case hidden
export interface OutcomeResult {
    text:    string;
    effects: LockEffectData[]; // Lock effects to execute
}

// Individual outcome data for each wheel
export interface OutcomeData extends OutcomeResult {
    weight: string; // String type, to be parsed at runtime
}

// Custom data for each wheel, mainly just spins left and last spun
export interface WheelCustom {
    lastSpinMS:  number; // Last action time, in unix milliseconds
    // accumulated: number; // Number of accumulated spins at last check
}

export function generateHandlebar(config: ExtensionConfig) {
    return renderConfigHandlebar(config, "extended-wheel-of-fortune")
}