export interface TypingTasksConfig {
    tasks: { [key: string]: TypingTasksConfig_TaskData };
}
export type TypingTasksConfig_Payload = TypingTasksConfig;

export interface TypingTasksConfig_TaskData {
    display:   string;
    note?:     string;
    feedback?: string;
    settings:  {
        times:      number;
        extra:      number;
        delayMS:    number;
        delayExtra: number;
        hidden:     boolean;
        chinese:    boolean;
    };
    phrases: string[];
}

export interface TypingTasksCustom {
}

export interface TypingTasksConfig_User {
    tasks: { [key: string]: TypingTasksConfig_TaskData_User };
}
export interface TypingTasksConfig_TaskData_User extends Omit<TypingTasksConfig_TaskData, "feedback"> {   
}