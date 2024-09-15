export interface RegularityConfig {
    interval: number; // Seconds, or remaining spins
    mode:     "unlimited" | "cumulative" | "non_cumulative";
}