import type { ChasterRegularityMode } from "./signature-chaster.ts";

export type LockModificationType = "set" | "modify" | "multiply";

export type LockEffectData = {
    key:    "lock-time-modify" | "share_link-add_time-modify" | "share_link-remove_time-modify" 
            | "share_link-requirement-modify" | "pillory-duration-modify" | "dice-multiplier-modify"
            | "tasks-task_points-modify" | "guess_timer-min_time-modify" | "guess_timer-max_time-modify";
    params: [LockModificationType, number] // Modify type, duration / multiplier / modifier
} | {
    key:    "lock-show_timer" | "lock-hide_timer" | "lock-show_history" | "lock-hide_history"
            | "lock-freeze" | "lock-unfreeze" | "lock-toggle_freeze" | "lock-unlock" 
            | "hygiene-unlock";
    params: []
} | {
    key:    "share_link-logged_in-set";
    params: [boolean] // Boolean
} | {
    key:    "dice-regularity-set" | "tasks-regularity-set";
    params: [[ChasterRegularityMode, number]]; // Regularity
} | {
    key:    "tasks-task-add";
    params: [string, number]; // Text and number (points)
} | {
    key:    "tasks-task-add" | "tasks-task-remove";
    params: [string]; // Text 
} | {
    key:    "extension-enable" | "extension-disable";
    params: [ExtensionSlug]; // Extension slug
} | {
    key:    "random-events-difficulty";
    params: ["easy" | "normal" | "hard" | "expert"]; // Difficulty
} | {
    key:    "pillory-put";
    params: [number, string]; // Duration and reason
}
export type LockEffectKey = LockEffectData["key"]

export const lockEffectTypes: { [key in LockEffectData["key"]]-?: any } = {
    "extension-enable": "extension-update",
    "extension-disable": "extension-update",
    "lock-time-modify": "lock-update",
    "lock-show_timer": "lock-update",
    "lock-hide_timer": "lock-update",
    "lock-show_history": "lock-update",
    "lock-hide_history": "lock-update",
    "lock-freeze": "lock-update",
    "lock-unfreeze": "lock-update",
    "lock-toggle_freeze": "lock-update",
    "lock-unlock": "lock-update",
    "share_link-requirement-modify": "extension-update",
    "share_link-add_time-modify": "extension-update",
    "share_link-remove_time-modify": "extension-update",
    "share_link-logged_in-set": "extension-update",
    "pillory-put": "extension-action",
    "pillory-duration-modify": "extension-update",
    "hygiene-unlock": "extension-action",
    "dice-regularity-set": "extension-update",
    "dice-multiplier-modify": "extension-update",
    "tasks-regularity-set": "extension-update",
    "tasks-task_points-modify": "extension-update",
    "tasks-task-add": "extension-update",
    "tasks-task-remove": "extension-update",
    "random-events-difficulty": "extension-update",
    "guess_timer-min_time-modify": "extension-update",
    "guess_timer-max_time-modify": "extension-update",
} as const;

// TODO add complex typing stuff
export const effectExtensionSlugs = {
    "share_link-requirement-modify": "link",
    "share_link-add_time-modify": "link",
    "share_link-remove_time-modify": "link",
    "share_link-logged_in-set": "link",
    "pillory-put": "pillory",
    "pillory-duration-modify": "pillory",
    "hygiene-unlock": "temporary-opening",
    "dice-regularity-set": "dice",
    "dice-multiplier-modify": "dice",
    "tasks-regularity-set": "tasks",
    "tasks-task_points-modify": "tasks",
    "tasks-task-add": "tasks",
    "tasks-task-remove": "tasks",
    "random-events-difficulty": "random-events",
    "guess_timer-min_time-modify": "guess-timer",
    "guess_timer-max_time-modify": "guess-timer",
} as const;
export type ExtensionSlug = typeof effectExtensionSlugs[keyof typeof effectExtensionSlugs];