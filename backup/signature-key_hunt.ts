import type { LockEffectData } from "./signature-lock_effects.ts";
import type { RegularityConfig } from "../src/lib/scripts/signature-shared.ts"

export interface KeyHuntConfig {
    startingCards: KeyHuntCardCount[];
    customCards:   { [key: string]: KeyHuntCustomCard };
    regularity:    RegularityConfig;
    settings: {
        needAllKeys:       boolean; // Whether you need all keys or one key to escape 
        showKeysRemaining: boolean; // Show the number of keys remaining
        showOnConfig:      boolean; // Show initial data in shared lock handlebar
        detail:            "showCount" | "showType" | "hidden";
    };
    params: {
        freezeTimeMS:   number; // Milliseconds to freeze on freeze
        yellowModifier: number; // (-m, +m) random range
        multiplier:     number;
    }
}

export type HuntEffectKey = "modify" | "multiply" | "reset";
export interface HuntEffectData {
    key:    HuntEffectKey;
    params: any[];
}

export type KeyHuntCardType = "key" | "red" | "sticky" | "yellow" | "reset" | "freeze" | "multiply" | "custom";
export interface KeyHuntCard {
    type:    KeyHuntCardType;
    custom?: string;
}
export interface KeyHuntCardCount extends KeyHuntCard {
    count: number;
}
export interface KeyHuntCustomCard {
    name:           string;
    color:          string; // Hex color including #
    emoji?:         string; // Optional emoji for card
    lockEffects:    LockEffectData[];
    keyHuntEffects: HuntEffectData[];
    again:          boolean; // Whether you can pick again after this card
}

export interface KeyHuntCustom {
    remaining:       KeyHuntCardCount[];
    freezeStartMS:   number;
    lastPickTimeMS:  number;  
    completed:       boolean;
}

/**
 * User-redacted Key Hunt config / custom data
 */
export interface KeyHuntConfig_User extends KeyHuntConfig {
    // startingCards might be redacted depending on setting
    // customCards   might be redacted depending on setting
}
export interface KeyHuntCustom_User extends KeyHuntCustom {
    // remaining might be redacted depending on setting
}