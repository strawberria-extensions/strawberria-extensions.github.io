import type { LockEffectData } from "./signature-lock_effects";
import type { ExtendedWheelConfig, ExtendedWheelConfig_OutcomeData_Result, ExtendedWheelConfig_User, ExtendedWheelCustom } from "./signature-extended_wheel";
import type { TypingTasksConfig_User } from "./signature-typing_tasks";
import type { JigsawPuzzlesConfig } from "./signature-puzzle";
import type { KeyHuntCardType, KeyHuntConfig_User, KeyHuntCustom_User, KeyHuntCustomCard } from "$lib/scripts/signature-key_hunt";

export interface BackendRequestSignature {
    "chaster_utilities": {
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
        "chaster_access-check": {
            chasterUserID: string;
        };
    };
}

export interface BackendResponseSignature {
    "chaster_utilities": {
        "extended-config-page": {
            config: ExtendedWheelConfig;
        };
        "extended-main-page": {
            keyholder?: string, // Keyholder name or undefined
            userRole:   "keyholder" | "wearer";
            config:     ExtendedWheelConfig_User, 
            customData: ExtendedWheelCustom, // Available spins for each wheel
        }; 
        "extended-main-spin": {
            index?:     number; // Not present for hidden outcome
            result:     ExtendedWheelConfig_OutcomeData_Result, 
            customData: ExtendedWheelCustom, // Return for all wheels?
        }; 
        "strawberria_penalties-page": {
            lockID: string;
            data:   IndividualPenaltyData[];
        };
        "typing_tasks-page": {
            config: TypingTasksConfig_User;
        };
        "jigsaw_puzzles-page": {
            config: JigsawPuzzlesConfig;
            custom: { [key: string]: string };
        };
        "key_hunt-page": {
            userRole:    "keyholder" | "wearer";
            config:      KeyHuntConfig_User, 
            customData:  KeyHuntCustom_User,
            count?:      number,
        };
        "key_hunt-pick": {
            chosenCardType:    KeyHuntCardType;
            chosenCardCustom?: KeyHuntCustomCard; 
            customData:        KeyHuntCustom_User;         
            count?:            number;                   
        }
    };
    "database_utilities": {
        "chaster_custom-get": {
            exists: boolean;
        };
    };
}

export interface IndividualPenaltyData {
    extensionData: { 
        _id:     string; 
        slug:    string; 
        display: string;
    };
    penaltyConfig: { 
        action:   string;
        subkey:   string;
        display:  string; 
        required: number; 
        interval: number; 
        effects: LockEffectData[];
    };
    penaltyData: { lastPenaltyMS: number; current: number };
}