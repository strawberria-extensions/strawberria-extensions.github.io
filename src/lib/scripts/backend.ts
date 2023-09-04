import type { InputRadioOption } from "$lib/components/InputRadio";
import { get, writable, type Writable } from "svelte/store";
import { updateValid, validateWheels } from "./validation";

export type WeightedDiceRollResponse = [[number, number], number, string | null];

export interface ChasterTrimmedExtensionSession<ExtensionConfig> {
    role:      "wearer" | "keyholder";
    config:    ExtensionConfig;
    regular: {
        mode:               "unlimited" | "cumulative" | "non_cumulative";
        regularity:         number; // In seconds...
        nbActionsRemaining: number; // -1 = unlimited?
        nextActionDate:     string | null;
    };
    session:   any; // User session data
    sessionID: string;
}
export interface ChasterExtensionConfiguration<Config> {
    config:        Config;
    user:          string; // Assuming ID
    sessionId:     string;
    extensionSlug: string;
    createdAt:     string; // "2023-07-12T20:27:19.007Z"
}
export interface ChasterCustomConfig_WeightedDice {
    // - represents bot winning
    // -1, -2, -3, -4, -5, 0, 1, 2, 3, 4, 5
    chances: [number, number, number, number, number, number, number, number, number, number, number];
    multiplier:     number; // Integer, by minutes
    multiplierText: string; // For handlebar
}
export type ChasterCustomConfig_WeightedDice_Payload = Omit<ChasterCustomConfig_WeightedDice, "multiplierText">;

export interface ChasterCustomConfig_ExtendedWheel {
    outcomes:   ChasterExtendedWheelData[];
    handleText: "";
}
export interface ChasterExtendedWheelData {
    // Emulate regular actions for individual wheels
    // action: {
    //     mode:       "cumulative" | "non_cumulative" | "unlimited";
    //     regularity: number;
    // };
    text:       string;
    label?:     string;
    percentage: string;
    key:        ExtendedWheel_ActionType;
    params:     any[];
}

export interface ChasterCustomData_ExtendedWheel {
    action: {
        nbActionsRemaining: number;
        nextActionDate?:    string;
    };
}

export interface ExtendedWheelData {
    wheels:   { [key: string]: ExtendedWheel_WheelData };
}
export interface ExtendedWheel_WheelData {
    display:     string;
    settings:    {
        disabled:         boolean;
        availableSpins:   boolean;
        falsePercentages: boolean;
        hiddenActions:    boolean;
        hiddenOutcomes:   boolean;
    }
    remainingSpins: string; // Only for setting in config
    regularity:  {
        interval: number; // Seconds, or remaining spins
        mode:     "unlimited" | "cumulative" | "non_cumulative";
    }
    penalty: {
        requirement: number;
        penalties:   {
            type:   ExtendedWheel_ActionType;
            params: any[];
        }[];
    }
    outcomes:    ExtendedWheel_OutcomeData[];
}
export interface ExtendedWheel_OutcomeData {
    text:            string;
    actions:         ExtendedWheel_ActionData[];
    percentage:      string;
    falsePercentage: string; // Default same?
}
export interface ExtendedWheel_ActionData {
    type:           ExtendedWheel_ActionType;
    params:         any[];
}

export const extendedWheelDataStore: Writable<ExtendedWheelData> = writable({ wheels: {} });

export const regularityModeOptionsData: InputRadioOption<string>[] = [
    { key: "non_cumulative", display: "Non cumulative", tooltip: "After each spin, you will have to wait a certain amount of time before spinning again."}, 
    { key: "cumulative", display: "Cumulative", tooltip: "The number of possible wheel spins is cumulated over time."}, 
    { key: "unlimited", display: "Unlimited", tooltip: "You can spin the wheel as many times as you like."}
];

export const extendedWheelActions = {
    "set_time": "Set time",
    "add_time": "Add time",
    "remove_time": "Remove time",
    "multiply_time": "Multiply time",
    "lock-freeze": "Freeze the lock",
    "lock-unfreeze": "Unfreeze the lock",
    "lock-toggle_freeze": "Freeze or unfreeze the lock",
    "lock-unlock": "Unlock the wearer",
    "share_link-requirement-set": "[Share Link] Set the share link requirement",
    "share_link-requirement-modify": "[Share Link] Modify the share link requirement",
    "share_link-requirement-multiply": "[Share Link] Multiply the share link requirement",
    "share_link-add_time-set": "[Share Link] Set share link time added",
    "share_link-remove_time-set": "[Share Link] Set share link time removed",
    "share_link-logged_in-set": "[Share Link] Set share link logged-in requirement",
    "pillory-put": "[Pillory] Put the wearer in pillory",
    "pillory-duration-set": "[Pillory] Set pillory time added",
    "hygiene-unlock": "[Hygiene Unlock] Perform an unlock",
    "dice-regularity-set": "[Dice] Set the regularity",
    "dice-multiplier-set": "[Dice] Set the duration multiplier",
    "tasks-regularity-set": "[Tasks] Set the regularity",
    "tasks-task_points-set": "[Tasks] Set the task points requirement",
    "tasks-task_points-modify": "[Tasks] Modify the task points requirement",
    "tasks-task_points-multiply": "[Tasks] Multiply the task points requirement",
    "tasks-task-add": "[Tasks] Add task by text",
    "tasks-task-remove": "[Tasks] Remove task by text",
    "extended_wof-wheel": "[Extended WoF] Enable or disable wheel",
    "extended_wof-mode-settings": "[Extended WoF] Set wheel settings",
    "extended_wof-regularity-set": "[Extended WoF] Set wheel regularity",
    "extended_wof-available-set": "[Extended WoF] Set available wheel spins",
    "extended_wof-available-modify": "[Extended WoF] Modify available wheel spins",
} as const;
export type ExtendedWheel_ActionType = keyof typeof extendedWheelActions;

export type ActionTemplateParamData = { 
    type:   "boolean" | "duration" | "number" | "regularity" | "select" | "select_wheel" | "radio" | "text"; 
    label:  string; 
    class?: string;
    regex?: RegExp;
    params: { [key: string]: any };
}
// TODO add modular enable/disable/toggle to boolean
export const extendedWheelActionTemplates: {
    [key: string]: {
        tooltip: string;
        params:  ActionTemplateParamData[];
        default: any[];
    }
} = {
    "set_time": {
        tooltip: "Set the remaining lock time.",
        params: [{ type: "duration", label: "Set Time", class: "w-[16em]", params: {} }],
        default: [3600],
    },
    "add_time": {
        tooltip: "Add to the remaining lock time.",
        params: [{ type: "duration", label: "Add Duration", class: "w-[16em]", params: {} }],
        default: [3600],
    },
    "remove_time": {
        tooltip: "Remove from the remaining lock time.",
        params: [{ type: "duration", label: "Remove Duration", class: "w-[16em]", params: {} }],
        default: [3600],
    },
    "multiply_time": {
        tooltip: "Multiply the remaining lock time.",
        params: [{ type: "number", label: "Time Multiplier", regex: new RegExp(String.raw`^\d+(\.\d+)?$`), class: "w-[16em]", params: { suffix: "X" } }],
        default: [1],
    },
    "lock-freeze": {
        tooltip: "Freeze the lock if currently unfrozen.",
        params: [],
        default: [],
    },
    "lock-unfreeze": {
        tooltip: "Unfreeze the lock if currently frozen.",
        params: [],
        default: [],
    },
    "lock-toggle_freeze": {
        tooltip: "Freeze or unfreeze the lock, toggling between both states.",
        params: [],
        default: [],
    },
    "lock-unlock": {
        tooltip: "Unlock the wearer from the lock.",
        params: [],
        default: [],
    },
    "share_link-requirement-set": {
        tooltip: "Set the share link requirement.",
        params: [{ type: "number", label: "Requirement", regex: new RegExp(String.raw`^\d+$`), params: {} }],
        default: [1],
    },
    "share_link-requirement-modify": {
        tooltip: "Increase or decrease the share link requirement.",
        params: [{ type: "number", label: "Requirement Change", regex: new RegExp(String.raw`^-?\d+$`), params: {} }],
        default: [1],
    },
    "share_link-requirement-multiply": {
        tooltip: "Multiply the share link requirement.",
        params: [{ type: "number", label: "Requirement Multiplier", regex: new RegExp(String.raw`^\d+(\.\d+)?$`), params: { suffix: "X" } }],
        default: [1],
    },
    "share_link-add_time-set": {
        tooltip: "Set time added per share link.",
        params: [{ type: "duration", label: "Duration Added", params: {} }],
        default: [3600],
    },
    "share_link-remove_time-set": {
        tooltip: "Set time removed per share link.",
        params: [{ type: "duration", label: "Duration Removed", params: {} }],
        default: [3600],
    },
    "share_link-logged_in-set": {
        tooltip: "Set logged-in requirement for share links.",
        params: [{ type: "boolean", label: "Only allow logged-in people to vote", params: {
            tooltip: "If you enable this option, visitors will need to be logged in to add or remove time."
        }}],
        default: [true],
    },
    "pillory-put": {
        tooltip: "Put the wearer into the pillory.",
        params: [],
        default: [],
    },
    "pillory-duration-set": {
        tooltip: "Set time added per pillory vote.",
        params: [{ type: "duration", label: "Duration Added", params: {} }],
        default: [3600],
    },
    "hygiene-unlock": {
        tooltip: "Perform a keyholder-initiated hygiene unlock.",
        params: [],
        default: [],
    },
    "dice-regularity-set": {
        tooltip: "Set dice regularity (mode and interval).",
        params: [{ type: "regularity", label: "", params: {} }],
        default: [["non_cumulative", 3600]],
    },
    "dice-multiplier-set": {
        tooltip: "Set dice duration multiplier.",
        params: [{ type: "duration", label: "Multiplication Duration", params: {} }],
        default: [3600],
    },
    "tasks-regularity-set": {
        tooltip: "Set tasks regularity (mode and interval).",
        params: [{ type: "regularity", label: "", params: {} }],
        default: [["non_cumulative", 3600]],
    },
    "tasks-task_points-set": {
        tooltip: "Set the task points requirement.",
        params: [{ type: "number", label: "Requirement", regex: new RegExp(String.raw`^\d+$`), params: {} }],
        default: [0],
    },
    "tasks-task_points-modify": {
        tooltip: "Increase or decrease the task points requirement.",
        params: [{ type: "number", label: "Requirement Change", regex: new RegExp(String.raw`^-?\d+(\.\d+)?$`), params: {} }],
        default: [0],
    },
    "tasks-task_points-multiply": {
        tooltip: "Multiply the task points requirement.",
        params: [{ type: "number", label: "Requirement Multiplier", regex: new RegExp(String.raw`^\d+(\.\d+)?$`), params: { suffix: "X" } }],
        default: [1],
    },
    "tasks-task-add": {
        tooltip: "Add a task with the given text (note: 60-character limit).",
        params: [{ type: "text", label: "Task Text", regex: new RegExp(String.raw`.+`), class: "!grow", params: { limit: 60, innerClass: "w-full" } }],
        default: [""],
    },
    "tasks-task-remove": {
        tooltip: "Remove a task with the given text (note: 60-character limit).",
        params: [{ type: "text", label: "Task Text", regex: new RegExp(String.raw`.+`), class: "!grow", params: { limit: 60, innerClass: "w-full" } }],
        default: [""],
    },
    "extended_wof-wheel": {
        tooltip: "Enable or disable this and other wheels.",
        params: [
            { type: "select_wheel", label: "Selected Wheel", class: "!w-[16em]", params: {}}, 
            { type: "boolean", label: "Enable this wheel", params: []}
        ],
        default: ["", true],
    },
    "extended_wof-mode-settings": {
        tooltip: "Enable or disable various wheel settings.",
        params: [{ type: "select", label: "Selected Wheel Setting", class: "!w-[16em]", params: {
            options: [
                { key: "disabled", display: "Disabled" },
                { key: "falsePercentages", display: "False Percentages" },
                { key: "hiddenActions", display: "Hidden Actions" },
                { key: "hiddenOutcomes", display: "Hidden Outcomes" },
                { key: "availableSpins", display: "Count Available Spins" },
            ]
        }}, { type: "boolean", label: "Enable this setting", params: []}],
        default: ["falsePercentages", false],
    },
    "extended_wof-regularity-set": {
        tooltip: "Set the wheel regularity (mode and interval).",
        params: [
            { type: "select_wheel", label: "Selected Wheel", class: "!w-[16em]", params: {}}, 
            { type: "regularity", label: "", params: {} }
        ],
        default: ["", ["non_cumulative", 3600]],
    },
    "extended_wof-available-set": {
        tooltip: "Set the wheel available spins.",
        params: [
            { type: "select_wheel", label: "Selected Wheel", class: "!w-[16em]", params: {}}, 
            { type: "number", label: "Available Spins", regex: new RegExp(String.raw`^\d+$`), params: {} }
        ],
        default: ["", 0],
    },
    "extended_wof-available-modify": {
        tooltip: "Increase or decrease the wheel available spins.",
        params: [
            { type: "select_wheel", label: "Selected Wheel", class: "!w-[16em]", params: {}}, 
            { type: "number", label: "Available Spins Change", regex: new RegExp(String.raw`^-\d+(\.\d+)?$`), params: {} },
        ],
        default: ["", 0],
    },
}