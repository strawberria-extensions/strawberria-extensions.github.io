<script lang="ts">
    import { generateOutcomeEffectLabel } from "$lib/scripts/utility";
    import bigDecimal from "js-big-decimal";
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

<div class="flex flex-row justify-between">
    <div class="flex flex-col outcome-left pl-2" style={`border-left: 8px solid ${color}`}>
        <div>{outcomeData.text ?? ""}</div>
        {#if outcomeData.effects !== undefined}
            {#each outcomeData.effects as effectData}
                {@const effectText = generateOutcomeEffectLabel(effectData)}
                <div class="caption whitespace-pre-wrap text-sm">• {effectText}</div>
            {/each}
        {/if}
    </div>
    <div class="flex flex-col justify-center">
        <div class="caption">{actualPercentage}%</div>
    </div>  
</div>

<style>
    .outcome-left {
        max-width: calc(100% - 4em);
    }
</style>