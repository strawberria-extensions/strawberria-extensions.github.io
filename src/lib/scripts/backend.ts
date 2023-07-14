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
export interface ChasterCustomConfig_WeightedDice {
    // - represents bot winning
    // -1, -2, -3, -4, -5, 0, 1, 2, 3, 4, 5
    chances: [number, number, number, number, number, number, number, number, number, number, number];
    multiplier: number; // Integer, by minutes
}