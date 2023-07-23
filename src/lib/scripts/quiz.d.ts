export interface QuizQuestionData {
    type:    "choice_multiple" | "choice_single";
    prompt:  string;
    note?:   string;
    params:  any[];
    correct: number[];
}