import * as ExtendedWheel from "$lib/import/extension-extended_wheel"
import * as JigsawPuzzles from "$lib/import/extension-jigsaw_puzzles"

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
    // "database_utilities": {
    //     "chaster_access-check": {
    //         chasterUserID: string;
    //     };
    // };
}

export interface BackendResponseSignature {
    "chaster_utilities": {
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
    // "database_utilities": {
    //     "chaster_custom-get": {
    //         exists: boolean;
    //     };
    // };
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