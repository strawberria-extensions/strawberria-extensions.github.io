export interface DurationDisplaySettings { 
    day:    boolean; 
    hour:   boolean; 
    minute: boolean; 
    second: boolean 
}

export interface DurationMappings {
    day:    DurationMapped;
    hour:   DurationMapped;
    minute: DurationMapped;
    second: DurationMapped;
}

export interface DurationMapped {
    tens: string;
    ones: string;
}