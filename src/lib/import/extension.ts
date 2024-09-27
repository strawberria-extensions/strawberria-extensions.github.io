import type { LockEffectData } from "./lock_effects";

// Base extension configuration including miscellaneous definitions
export interface ExtensionConfig {
    base: {
        actions:   ExtensionActionsConfig;
        events:    ExtensionEventsConfig;
        penalties: ExtensionPenaltiesConfig; 
        periodic:  ExtensionPeriodicsConfig;  
    };
    handlebar?: string;           // Generated server-side during config update
    // config: any;
}
// Base extension custom data with some data which persists between resets
export interface ExtensionCustom {
    persistent: { [key: string]: number }; // Multipliers and stuff for games
    penalties:  { [key: string]: number }; // Last penalty time
    periodics:  { [key: string]: number }; // Last periodic time
    // custom: any;
}

// Effects which occur when specific actions are triggered
// Triggered on database insertion or from the calling script itself?
export interface ExtensionActionsConfig {
    // Key is composed of action_key or `${action_key}/${action_subkey}`
    [key: string]: ExtensionActionConfig;
}
export interface ExtensionActionConfig {
    effects: LockEffectData[]; // Lock effects to be executed
}

// Effects which occur at certain events (from action log), matched using a capturing regular expression
// - Capturing regular expression can also just be webhook event enums like "extension_session.created"
// TODO: eventually migrate to using enums altogether for convenience purposes
export interface ExtensionEventsConfig {
    [captureRegex: string]: ExtensionEventsConfig;
}
export interface ExtensionEventConfig {
    effects: LockEffectData[];
}

// Effects which occur periodically during a lock
export interface ExtensionPeriodicsConfig {
    [key: string]: ExtensionPeriodicConfig;
}
export interface ExtensionPeriodicConfig {
    interval: number;           // Periodicity in milliseconds
    effects:  LockEffectData[]; // Lock effects to be executed 
}

// Effects which occur when a penalty has elapsed (tracked through chaster_actions)
export interface ExtensionPenaltiesConfig {
    // Key is composed of action_key or `${action_key}/${action_subkey}`
    [key: string]: ExtensionPenaltyConfig;
}
export interface ExtensionPenaltyConfig {
    interval: number;           // Penalty interval in milliseconds
    required: number;           // Number required per penalty interval
    block:    boolean;          // Whether to block unlocking before completed
    effects:  LockEffectData[]; // Lock effects to be executed
}

// Regularity information for extensions
export interface RegularityConfig {
    interval: number; // Seconds, or remaining spins
    mode:     "unlimited" | "cumulative" | "non_cumulative";
}