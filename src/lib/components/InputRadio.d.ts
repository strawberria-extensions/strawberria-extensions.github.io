export interface InputRadioOption<KeyType> {
    key:        KeyType;
    display:    string;
    tooltip?:   string;
    placement?: "top" | "bottom" | "left" | "top";
}