import nunjucks from "nunjucks";
import { template as TemplateHandlebarGeneric } from "../_resources/handlebar-generic.ts";
import { template as TemplateHandlebarExtendedWheel } from "../_resources/handlebar-extended_wheel.ts";
import { template as TemplateHandlebarJigsawPuzzles } from "../_resources/handlebar-jigsaw_puzzles.ts";
import { template as TemplateLockEffect } from "../_resources/lock_effect.ts";
import type { ExtensionConfig } from "./extension.ts";
import type { LockEffectData } from "./lock_effects.ts";
import { generateTimeString } from "../scripts/utility.ts";

// Lookup from slug to Nunjucks handlebar configuration template
const nunjucksTemplateLookup = {
    "extended-wheel-of-fortune": TemplateHandlebarExtendedWheel,
    "jigsaw-puzzles": TemplateHandlebarJigsawPuzzles,
}

// Setup nunjucks before usage, returning cross-template handlers
function configureNunjucks(): nunjucks.Environment {
    (window as any).configureNunjucks = configureNunjucks;
    const environment = nunjucks.configure("default", {
        trimBlocks: true,
        lstripBlocks: true,
    });
    // deno-lint-ignore no-explicit-any
    environment.addFilter("generateConfigHandlebar", (baseConfig: any) => 
        nunjucks.renderString(TemplateHandlebarGeneric as string, baseConfig).trim());
    // deno-lint-ignore no-explicit-any
    environment.addFilter("generateLockEffect", (lockEffect: any) => 
        nunjucks.renderString(TemplateLockEffect as string, { topLockEffect: lockEffect }).trim());
    environment.addFilter("generateTimeString", (value: number, milliseconds: true) => {
        let inputValue = value;
        if(milliseconds) { inputValue = Math.floor(inputValue / 1000); }
        return generateTimeString(inputValue);
    });

    return environment;
}

// Generate handlebar using Nunjucks for the given slug and config
export function renderConfigHandlebar(config: ExtensionConfig, slug: keyof typeof nunjucksTemplateLookup): string {
    const environment = configureNunjucks();
    const template = nunjucksTemplateLookup[slug];
    if(template === undefined) { return ""; } // Invalid slug
    // deno-lint-ignore no-explicit-any
    return environment.renderString(template, config as any).trim();
}

// Generate lock effect using Nunjucks for the given lock effect
// deno-lint-ignore no-explicit-any
export function renderLockEffect(lockEffect: LockEffectData, fullConfigData?: any) {
    console.log(lockEffect);
    (window as any).templateLockEffect = TemplateLockEffect;

    const environment = configureNunjucks();
    // deno-lint-ignore no-explicit-any
    const data: any = { ...lockEffect };
    if(fullConfigData !== undefined) {
        // Include full config data from Chaster config
        data["lookup"] = fullConfigData;
    }
    return environment.renderString(TemplateLockEffect as string, { topLockEffect: data }).trim();
} 

// const val: ExtendedWheel.Config = {
//     config: {
//         wheels: {
//             test: {
//                 display: "Test Wheel",
//                 note: "OWO",
//                 settings: {
//                     disabled: false,
//                     hiddenWeights: false,
//                     hiddenOutcomes: false,
//                     hiddenEffects: false,
//                 },
//                 regularity: {
//                     interval: 60000,
//                     mode: "cumulative"
//                 },
//                 outcomes: [
//                     {
//                         weight: "5",
//                         text: "Don't you know?",
//                         effects: []
//                     }
//                 ]
//             }
//         }
//     },
//     base: {
//         actions: {
//             "spin/test": {
//                 effects: [
//                     { key: "freeze", params: [false] },
//                 ]
//             }
//         },
//         events: {},
//         penalties: {
//             "spin/test": {
//                 interval: 86400000,
//                 required: 5,
//                 block: false,
//                 effects: [
//                     { key: "freeze", params: [true] }
//                 ]
//             }
//         },
//         periodic: []
//     }
// }
// console.log(renderConfigHandlebar(val, "extended-wheel-of-fortune"))