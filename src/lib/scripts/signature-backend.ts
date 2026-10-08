import type * as ExtendedWheel from "$lib/import/extension-extended_wheel"
import type * as JigsawPuzzles from "$lib/import/extension-jigsaw_puzzles"
import type * as TTLockOwnership from "$lib/import/extension-ttlock_ownership"
import type { LockEffectData } from "$lib/import/lock_effects"

export type ChasterOAuthCredentials =
    | { mainToken: string; configToken?: never }
    | { configToken: string; mainToken?: never };

export interface ChasterOAuthConnection {
    status: "connected" | "reauthorization_required" | "not_connected";
    chasterUserID: string;
    scopes: string;
    accessExpire: string | null;
    refreshExpire: string | null;
}

export interface BackendRequestSignature {
    "chaster_utilities": {
        "ttlock_ownership-page": { mainToken: string };
        "ttlock_ownership-update-account": { mainToken: string; username: string };
        "ttlock_ownership-transfer-status": { mainToken: string; username: string; identifier: string };
        "ttlock_ownership-username": { mainToken: string; username: string };
        "ttlock_ownership-locks": { mainToken: string; username: string };
        "ttlock_ownership-bind": { mainToken: string; lockId: number; username?: string };
        "ttlock_ownership-passcode": { mainToken: string; refresh: boolean };
        "extended-config-page": {
            configToken: string;
        };
        "extended-main-page": {
            mainToken: string;
        };
        "extended-main-spin": {
            mainToken: string;
            wheelID:   string;
        };
    };
    "database_utilities": {
        "chaster_access-start": { redirect?: string };
        "chaster_access-set": { authorizationCode: string; state: string };
        "chaster_access-check": ChasterOAuthCredentials;
    };
}

export interface BackendResponseSignature {
    "chaster_utilities": {
        "ttlock_ownership-page": TTLockOwnership.Page;
        "ttlock_ownership-update-account": { boundAccount: string };
        "ttlock_ownership-transfer-status": { transferred: boolean; page: TTLockOwnership.Page | null };
        "ttlock_ownership-username": { username: string };
        "ttlock_ownership-locks": { locks: TTLockOwnership.Device[] };
        "ttlock_ownership-bind": TTLockOwnership.Page;
        "ttlock_ownership-passcode": { passcode: TTLockOwnership.Passcode };
        "extended-config-page": {
            config: ExtendedWheel.Config;
        };
        "extended-main-page": {
            keyholder?: string, // Keyholder name or undefined
            userRole:   "keyholder" | "wearer";
            config:     ExtendedWheel.Config, 
            customData: ExtendedWheel.Custom, // Available spins for each wheel
        }; 
        "extended-main-spin": {
            index?:     number; // Not present for hidden outcome
            result:     ExtendedWheel.OutcomeResult, 
            customData: ExtendedWheel.Custom, // Return for all wheels?
        }; 
        // "strawberria_penalties-page": {
        //     lockID: string;
        //     data:   IndividualPenaltyData[];
        // };
        // "typing_tasks-page": {
        //     config: TypingTasksConfig_User;
        // };
        "jigsaw_puzzles-page": {
            config: JigsawPuzzles.Config;
            custom: JigsawPuzzles.Custom;
        };
        // "key_hunt-page": {
        //     userRole:    "keyholder" | "wearer";
        //     config:      KeyHuntConfig_User, 
        //     customData:  KeyHuntCustom_User,
        //     count?:      number,
        // };
        // "key_hunt-pick": {
        //     chosenCardType:    KeyHuntCardType;
        //     chosenCardCustom?: KeyHuntCustomCard; 
        //     customData:        KeyHuntCustom_User;         
        //     count?:            number;                   
        // }
    };
    "database_utilities": {
        "chaster_access-start": { authorizationURL: string; state: string; expiresAt: string };
        "chaster_access-set": ChasterOAuthConnection & { redirect: string | null };
        "chaster_access-check": ChasterOAuthConnection;
    };
}

export interface IndividualPenaltyData {
    extensionData: {
        _id: string;
        slug: string;
        display: string;
    };
    penaltyConfig: {
        action: string;
        subkey: string;
        display: string;
        required: number;
        interval: number;
        effects: LockEffectData[];
    };
    penaltyData: { lastPenaltyMS: number; current: number };
}

// export interface IndividualPenaltyData {
//     extensionData: { 
//         _id:     string; 
//         slug:    string; 
//         display: string;
//     };
//     penaltyConfig: { 
//         action:   string;
//         subkey:   string;
//         display:  string; 
//         required: number; 
//         interval: number; 
//         effects: LockEffectData[];
//     };
//     penaltyData: { lastPenaltyMS: number; current: number };
// }
