<script lang="ts">
    import type { ChasterExtendedWheelData } from "./scripts/backend";
    import { generateOutcomeActionText } from "./scripts/utility";

    export let outcomeData: ChasterExtendedWheelData;
    const outcomeActionText = generateOutcomeActionText(outcomeData);
</script>

<div class="flex flex-row justify-between">
    <div class="flex flex-col outcome-left">
        <div>{outcomeActionText}</div>
        {#if outcomeData.text !== ""}
            <div class="caption whitespace-pre-wrap text-sm">{outcomeData.text}</div>
        {/if}
    </div>
    <div class="flex flex-col justify-center">
        <div>{outcomeData.percentage}%</div>
    </div>  
</div>

<style>
    .outcome-left {
        max-width: calc(100% - 6em)
    }
</style>