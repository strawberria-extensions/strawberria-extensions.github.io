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
    spinSetting: "normal" | "false" | "hidden";
    regularity:  {
        interval: number; // Seconds
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

export const extendedWheelActions = {
    "set_time": "Set time",
    "add_time": "Add time",
    "remove_time": "Remove time",
    "multiply_time": "Multiply time",
    "lock-freeze": "Freeze the lock",
    "lock-unfreeze": "Unfreeze the lock",
    "lock-toggle_freeze": "Freeze or unfreeze the lock",
    "lock-unlock": "Unlock the wearer",
    "share_link-requirement-increase": "[Share Link] Increase link requirement",
    "share_link-requirement-decrease": "[Share Link] Decrease link requirement",
    "share_link-requirement-multiply": "[Share Link] Multiply link requirement",
    "share_link-add_time-set": "[Share Link] Set link time added",
    "share_link-remove_time-set": "[Share Link] Set link time removed",
    "share_link-logged_in-set": "[Share Link] Set logged-in requirement",
    "pillory-put": "[Pillory] Put the wearer in pillory",
    "pillory-duration-set": "[Pillory] Set pillory time added",
    "hygiene-unlock": "[Hygiene Unlock] Perform an unlock",
    "dice-regularitys-set": "[Dice] Set regularity",
    "dice-multiplier-set": "[Dice] Set time multiplier",
    "tasks-regularitys-set": "[Tasks] Set regularity",
    "tasks-task_points-increase": "[Tasks] Increase points requirement",
    "tasks-task_points-decrease": "[Tasks] Decrease points requirement",
    "tasks-task_points-multiply": "[Tasks] Multiply points requirement",
    "tasks-task-add": "[Tasks] Add task",
    "tasks-task-remove": "[Tasks] Remove task",
    "extended_wof-mode-set": "[Extended WoF] Set wheel mode",
    "extended_wof-regularitys-set": "[Extended WoF] Set wheel regularity",
} as const;
export type ExtendedWheel_ActionType = keyof typeof extendedWheelActions;
export const extendedWheelActionTemplates: {
    [key: string]: {
        tooltip: string;
        params:  { 
            type: "boolean" | "duration" | "number" | "regularity" | "spin_mode" | "text"; 
            label: string; 
            class?: string;
            params: { [key: string]: any };
        }[];
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
        params: [{ type: "number", label: "Time Multiplier", class: "w-[16em]", params: { suffix: "x" } }],
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
    "share_link-requirement-increase": {
        tooltip: "Increase the share link requirement.",
        params: [{ type: "number", label: "Requirement Increase", params: {} }],
        default: [1],
    },
    "share_link-requirement-decrease": {
        tooltip: "Decrease the share link requirement.",
        params: [{ type: "number", label: "Requirement Decrease", params: {} }],
        default: [1],
    },
    "share_link-requirement-multiply": {
        tooltip: "Multiply the share link requirement.",
        params: [{ type: "number", label: "Requirement Multiplier", params: { suffix: "x" } }],
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
        params: [{ type: "boolean", label: "Logged-in Required", params: {} }],
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
    "dice-regularitys-set": {
        tooltip: "Set dice regularity (mode and interval).",
        params: [],
        default: ["non_cumulative", 3600],
    },
    "dice-multiplier-set": {
        tooltip: "Set dice duration multiplier.",
        params: [{ type: "duration", label: "Multiplication Duration", params: {} }],
        default: [3600],
    },
    "tasks-regularitys-set": {
        tooltip: "Set tasks regularity (mode and interval).",
        params: [],
        default: ["non_cumulative", 3600],
    },
    "tasks-task_points-increase": {
        tooltip: "Increase the task points requirement.",
        params: [{ type: "number", label: "Requirement Increase", params: {} }],
        default: [0],
    },
    "tasks-task_points-decrease": {
        tooltip: "Decrease the task points requirement.",
        params: [{ type: "number", label: "Requirement Decrease", params: {} }],
        default: [0],
    },
    "tasks-task_points-multiply": {
        tooltip: "Multiply the task points requirement.",
        params: [{ type: "number", label: "Requirement Multiplier", params: { suffix: "x" } }],
        default: [1],
    },
    "tasks-task-add": {
        tooltip: "Add a task with the given text (note: 60-character limit).",
        params: [{ type: "text", label: "Task Text", params: { limit: 60 } }],
        default: [""],
    },
    "tasks-task-remove": {
        tooltip: "Remove a task with the given text.",
        params: [{ type: "text", label: "Task Text", params: { limit: 60 } }],
        default: [""],
    },
    "extended_wof-mode-set": {
        tooltip: "Set the current wheel's spin mode.",
        params: [{ type: "spin_mode", label: "Wheel Mode", params: {} }],
        default: ["normal"],
    },
    "extended_wof-regularitys-set": {
        tooltip: "Set the current wheel's regularity (mode and interval).",
        params: [{ type: "regularity", label: "Wheel Regularity", params: {} }],
        default: ["non_cumulative", 3600],
    },
}