import * as ExtendedWheel from "./extension-extended_wheel.ts";

export type WheelNumberExpression = number | `{{${string}}}`;

export type LockEffectDataBase = {
    "key": "customText",
    "params": [string];
} | {
    "key": "resetLock",
    "params": []
} | {
    "key": "unlock",
    "params": []
} | {
    "key": "freeze",
    "params": [boolean | undefined]
} | {
    "key": "pillory",
    "params": [WheelNumberExpression, string]
} | {
    "key": "hygieneUnlock",
    "params": []
} | {
    "key": "requestVerification",
    "params": []
} | {
    "key": "assignTask",
    "params": [string]
} | {
    "key": "assignTaskRandom",
    "params": [number | undefined]
} | {
    "key": "modifyTasks",
    "params": [{ task: string; points: number }[], boolean]
} | {
    "key": "updateLockDuration",
    "params": ["set" | "modify" | "multiply", WheelNumberExpression, WheelNumberExpression | undefined]
} | {
    "key": "updateLockDisplay",
    "params": [boolean | undefined]
} | {
    "key": "updateLockHide",
    "params": [boolean | undefined]
} | {
    "key": "disableExtension",
    "params": [string]
} | {
    "key": "enableExtension",
    "params": [string, any, "unlimited" | "cumulative" | "non_cumulative", number]
} | {
    "key": "resetTaskPoints",
    "params": []
} | {
    "key": "shareLinkModifyKey",
    "params": ["nbVisits" | "timeToAdd" | "timeToRemove", "set" | "modify" | "multiply", WheelNumberExpression, WheelNumberExpression | undefined]
} | {
    "key": "shareLinkSetLoggedIn",
    "params": [boolean | undefined]
} | {
    "key": "pilloryUpdateDuration",
    "params": ["set" | "modify" | "multiply", WheelNumberExpression, WheelNumberExpression | undefined]
} | {
    "key": "diceUpdateDuration",
    "params": ["set" | "modify" | "multiply", WheelNumberExpression, WheelNumberExpression | undefined]
} | {
    "key": "tasksUpdateRequiredPoints",
    "params": ["set" | "modify" | "multiply", WheelNumberExpression, WheelNumberExpression | undefined]
} | {
    "key": "randomEventsModifyDifficulty",
    "params": ["easy" | "normal" | "hard" | "expert"]
} | {
    "key": "guessTimerUpdateKey",
    "params": ["minRandomTime" | "maxRandomTime", "set" | "modify" | "multiply", WheelNumberExpression, WheelNumberExpression | undefined]
} | {
    "key": "delayLockEffect",
    "params": [LockEffectData, WheelNumberExpression];
} | {
    "key": "randomLockEffect",
    "params": [LockEffectData[], number[]];
} | {
    "key": "partnerAddRemoveReason",
    "params": [string, "add" | "remove", string];
} | {
    "key": "extendedSetDisabled",
    "params": [string, boolean | undefined];
} | {
    "key": "extendedAddOutcome",
    "params": [string, ExtendedWheel.OutcomeData];
} | {
    "key": "extendedRemoveOutcome",
    "params": [string, string];
} | {
    "key": "extendedUpdateWeight",
    "params": [string, string, "set" | "modify" | "multiply", number, number | undefined];
} | {
    "key": "resetCooldown",
    "params": [string, string]
};
export type LockEffectData = LockEffectDataBase & {
    hidden?: boolean;
    unit?: "seconds";
}
