export interface QuizQuestionData {
    type:     "choice_multiple" | "choice_single";
    prompt:   string;
    subtext?: string
    note?:    string;
    params:   any[];
    correct:  number[];
}