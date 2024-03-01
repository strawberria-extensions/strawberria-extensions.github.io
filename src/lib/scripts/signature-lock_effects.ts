import type { ExtendedWheelConfig_OutcomeData } from "./signature-extended_wheel";

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
    "params": [number, string]
} | {
    "key": "hygieneUnlock",
    "params": []
} | {
    "key": "requestVerification",
    "params": []
} | {
    "key": "assignTask",
    "params": [{ task: string; points: number }]
} | {
    "key": "assignTaskRandom",
    "params": [number | undefined]
} | {
    "key": "modifyTasks",
    "params": [{ task: string; points: number }[], boolean]
} | {
    "key": "updateLockDuration",
    "params": ["set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "updateLockSettings",
    "params": [boolean | undefined, boolean | undefined]
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
    "key": "shareLinkUpdateKey",
    "params": ["nbVisits" | "timeToAdd" | "timeToRemove", "set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "shareLinkSetLoggedIn",
    "params": [boolean | undefined]
} | {
    "key": "pilloryUpdateDuration",
    "params": ["set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "diceUpdateDuration",
    "params": ["set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "tasksUpdateRequiredPoints",
    "params": ["set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "randomEventsModifyDifficulty",
    "params": ["easy" | "normal" | "hard" | "expert"]
} | {
    "key": "guessTimerUpdateKey",
    "params": ["minRandomTime" | "maxRandomTime", "set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "delayLockEffect",
    "params": [LockEffectData, number];
} | {
    "key": "partnerAddRemoveReason",
    "params": [string, "add" | "remove", string];
} | {
    "key": "extendedSetDisabled",
    "params": [string, string, boolean | undefined];
} | {
    "key": "extendedAddOutcome",
    "params": [string, ExtendedWheelConfig_OutcomeData];
} | {
    "key": "extendedRemoveOutcome",
    "params": [string, string];
} | {
    "key": "extendedUpdatePercentage",
    "params": [string, string, "set" | "modify" | "multiply", number, number | undefined];
};
export type LockEffectData = LockEffectDataBase & {
    hidden?: boolean;
}