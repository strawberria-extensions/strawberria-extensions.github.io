import type { ExtendedWheelConfig, ExtendedWheelConfig_OutcomeData_Result, ExtendedWheelConfig_User, ExtendedWheelCustom } from "./signature-extended_wheel";

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
        }
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
            hasKeyholder: boolean, // Whether user has keyholder (false = not allowed)
            userRole:     "keyholder" | "wearer";
            config:       ExtendedWheelConfig_User, 
            customData:   ExtendedWheelCustom, // Available spins for each wheel
        }; 
        "extended-main-spin": {
            index?:     number; // Not present for hidden outcome
            result:     ExtendedWheelConfig_OutcomeData_Result, 
            customData: ExtendedWheelCustom, // Return for all wheels?
        }; 
    };
    "database_utilities": {
        "chaster_custom-get": {
            exists: boolean;
        };
    };
}