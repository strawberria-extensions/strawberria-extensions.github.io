<script lang="ts">
    import bigDecimal from "js-big-decimal";
    import SvelteMarkdown from "svelte-markdown";
    import { generateOutcomeEffectLabel } from "$lib/scripts/utility";
    import type { ExtendedWheelConfig_OutcomeData_User, ExtendedWheelConfig_User } from "../scripts/signature-extended_wheel";

    export let outcomeData: ExtendedWheelConfig_OutcomeData_User;
    export let settings: ExtendedWheelConfig_User["wheels"][string]["settings"];
    export let userRole: "keyholder" | "wearer";
    export let totalPercentage: number;
    export let color: string;

    let actualPercentage = (settings.hiddenPercentages && userRole !== "keyholder")
        ? "???" : new bigDecimal(outcomeData.percentage)
            .divide(new bigDecimal(totalPercentage), 8)
            .multiply(new bigDecimal(100))
            .round(3).getValue()
            .replace(/\.0+$|([^\.])0+$/, "$1");
</script>

<div class="flex flex-row justify-between space-x-[1em]">
    <div class="flex flex-col l outcome-left pl-[0.75em]" style={`border-left: 8px solid ${color}`}>
        <div class="mb-[0.25em] leading-5">{outcomeData.text ?? ""}</div>
        {#if outcomeData.effects !== undefined}
            <ul class="list">
                {#each outcomeData.effects as effectData}
                    {@const effectText = generateOutcomeEffectLabel(effectData)}
                    <li class="caption whitespace-pre-wrap text-sm">
                        <SvelteMarkdown source={effectText} isInline />   
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
    <div class="flex flex-col justify-center w-[5.5em] text-right">
        <div class="caption">{actualPercentage}%</div>
    </div>  
</div>

<style>
    .outcome-left {
        max-width: calc(100% - 4em);
    }

    .list {
        list-style: inside;
        list-style-position: outside;
        margin-left: 1em;
        margin-bottom: 0;
    }
</style>