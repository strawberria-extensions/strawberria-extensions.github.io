export type LockEffectData = {
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
    "key": "shareLinkModifyKey",
    "params": ["nbVisits" | "timeToAdd" | "timeToRemove", "set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "shareLinkSetLoggedIn",
    "params": [boolean | undefined]
} | {
    "key": "pilloryModifyDuration",
    "params": ["set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "diceModifyDuration",
    "params": ["set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "tasksModifyRequiredPoints",
    "params": ["set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "randomEventsModifyDifficulty",
    "params": ["easy" | "normal" | "hard" | "expert"]
} | {
    "key": "guessTimerModifyKey",
    "params": ["minRandomTime" | "maxRandomTime", "set" | "modify" | "multiply", number, number | undefined]
} | {
    "key": "delayLockEffects",
    "params": [LockEffectData[], number];
};