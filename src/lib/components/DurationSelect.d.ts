export interface DurationSelectSettings { 
    week:   boolean;
    day:    boolean; 
    hour:   boolean; 
    minute: boolean; 
    second: boolean; 
}

export interface DurationMappings {
    week:   DurationMapped;
    day:    DurationMapped;
    hour:   DurationMapped;
    minute: DurationMapped;
    second: DurationMapped;
}

export interface DurationMapped {
    tens: string;
    ones: string;
}