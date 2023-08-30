<script lang="ts">
    import type { ChasterExtendedWheelData } from "../scripts/backend";

    export let outcomeData: ChasterExtendedWheelData;
    export let color: string;
</script>

<div class="flex flex-row justify-between">
    <div class="flex flex-col outcome-left pl-2" style={`border-left: 8px solid ${color}`}>
        <div>{outcomeData.label ?? ""}</div>
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
        max-width: calc(100% - 4em);
    }
</style>