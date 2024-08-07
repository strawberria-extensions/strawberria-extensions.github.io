// Custom block definitions for Blockly, including validators (but NOT code generation)
const genericExtendedWheelEffect: string[] = [
    "extended_wheel-effect-reset_lock"
];
const blocksExtendedWheel: any[] = [
    {
        // - Missing regularity and settings within definition (space saving?)
        "type": "extended_wheel-wheel_define",
        "message0": "wheel named %1 with note %2",
        "message1": "regularity %1 every %2 seconds",
        "message2": "with outcomes:",
        "args0": [
            { 
                "type": "field_input", 
                "name": "display" 
            },
            { 
                "type": "field_input", 
                "name": "note" 
            },
        ],
        "args1": [
            { 
                "type": "field_dropdown", 
                "name": "regularity.mode",
                "options": [
                    ["unlimited", "unlimited"],
                    ["cumulative", "cumulative"],
                    ["non_cumulative", "non_cumulative"]
                ]
            },
            { 
                "type": "field_number", 
                "name": "regularity.interval",
                "min": 0,
                "precision": 1
            },
        ],
        "args2": [
            { 
                "type": "input_statement", 
                "name": "outcomes",
                "check": ["extended_wheel-wheel_outcome"]
            },
        ],
        "nextStatement": "extended_wheel-wheel_define",
        "previousStatement": "extended_wheel-wheel_define"
    },
    {
        // - Percentage is currently defined as number instead of string, manually cast
        "type": "extended_wheel-wheel_outcome",
        "message0": "outcome named %1 and weight %2",
        "messsage1": "with effects:",
        "args0": [
            { 
                "type": "field_input", 
                "name": "text" 
            },
            { 
                "type": "field_number", 
                "name": "percentage",
                "min": 1,
                "precision": 1
            },
        ],
        "args1": [
            { 
                "type": "input_statement", 
                "name": "effects",
                "check": ["extended_wheel-wheel_effect"]
            },
        ],
        "previousStatement": ["extended_wheel-wheel_define", "extended_wheel-wheel_outcome"],
        "nextStatement": "extended_wheel-wheel_outcome"
    },
    {
        "type": "extended_wheel-effect-resetLock",
        "message0": "reset lock to initial state",
        "previousStatement": ["extended_wheel-wheel_outcome", ...genericExtendedWheelEffect],
        "nextStatement": genericExtendedWheelEffect
    },
    {
        "type": "extended_wheel-effect-unlock",
        "message0": "unlock the lock",
        "previousStatement": ["extended_wheel-wheel_outcome", ...genericExtendedWheelEffect],
        "nextStatement": genericExtendedWheelEffect
    },
    {
        // Boolean is "freeze" / "unfreeze" / "toggle freeze" - serializes to 0?
        "type": "extended_wheel-effect-freeze",
        "message0": "%1 on the lock",
        "args0": [
            {
                "type": "field_dropdown", 
                "name": "action",
                "options": [
                    ["freeze", "freeze"],
                    ["unfreeze", "unfreeze"],
                    ["toggle freeze", "toggle freeze"]
                ]
            }
        ],
        "previousStatement": ["extended_wheel-wheel_outcome", ...genericExtendedWheelEffect],
        "nextStatement": genericExtendedWheelEffect
    },
    {
        "type": "extended_wheel-effect-pillory",
        "message0": "pillory for %1 seconds with reason %2",
        "args0": [
            { 
                "type": "field_number", 
                "name": "duration",
                "min": 300,
                "max": 86400,
                "precision": 1
            },
            { 
                "type": "field_input", 
                "name": "reason" 
            },
        ],
        "previousStatement": ["extended_wheel-wheel_outcome", ...genericExtendedWheelEffect],
        "nextStatement": genericExtendedWheelEffect
    },
    {
        "type": "extended_wheel-effect-hygieneUnlock",
        "message0": "perform a hygiene unlock",
        "previousStatement": ["extended_wheel-wheel_outcome", ...genericExtendedWheelEffect],
        "nextStatement": genericExtendedWheelEffect
    },
    {
        "type": "extended_wheel-effect-requestVerification",
        "message0": "request a verification picture",
        "previousStatement": ["extended_wheel-wheel_outcome", ...genericExtendedWheelEffect],
        "nextStatement": genericExtendedWheelEffect
    },
    {
        "type": "extended_wheel-effect-assignTask",
        "message0": "assign the task named %1 worth %2 points",
        "args0": [
            { 
                "type": "field_input", 
                "name": "task" 
            },
            { 
                "type": "field_number", 
                "name": "points",
                "min": 0,
                "precision": 1
            },
        ],
        "previousStatement": ["extended_wheel-wheel_outcome", ...genericExtendedWheelEffect],
        "nextStatement": genericExtendedWheelEffect
    },
    {
        "type": "extended_wheel-effect-assignTaskRandom",
        "message0": "assign task through vote in %1 seconds",
        "args0": [
            { 
                "type": "field_number", 
                "name": "voteDuration",
                "min": 300,
                "max": 86400,
                "precision": 1
            },
        ],
        "previousStatement": ["extended_wheel-wheel_outcome", ...genericExtendedWheelEffect],
        "nextStatement": genericExtendedWheelEffect
    },
    // modifyTasks has been purposefully omitted for now
    
]