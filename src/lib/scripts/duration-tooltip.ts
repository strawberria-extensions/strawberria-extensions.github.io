import { writable, type Writable } from "svelte/store";

export const selectedWheelIDStore: Writable<string | null> = writable(null);
export const communicationStore: Writable<
    [HTMLElement, [any[], number], "click"] | 
    [HTMLElement, [any[], number], "destroy"] | 
    [null, [any[], number], "update"] | 
    [null, null, null]
> = writable([null, null, null]);