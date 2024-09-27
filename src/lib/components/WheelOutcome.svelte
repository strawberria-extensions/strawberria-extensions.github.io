<script lang="ts">
    import bigDecimal from "js-big-decimal";
    import SvelteMarkdown from "svelte-markdown";
    import * as ExtendedWheel from "$lib/import/extension-extended_wheel";
    import { renderLockEffect } from "$lib/import/nunjucks";

    export let outcomeData: ExtendedWheel.OutcomeData;
    export let settings: ExtendedWheel.Config["config"]["wheels"][string]["settings"];
    export let userRole: "keyholder" | "wearer";
    export let totalPercentage: number;
    export let color: string;

    let actualPercentage = (settings.hiddenWeights && userRole !== "keyholder")
        ? "???" : new bigDecimal(outcomeData.weight)
            .divide(new bigDecimal(totalPercentage), 8)
            .multiply(new bigDecimal(100))
            .round(3).getValue()
            .replace(/\.0+$|([^\.])0+$/, "$1");
</script>

<div class="flex flex-row justify-between space-x-[1em]">
    <div class="flex flex-col l outcome-left pl-[0.75em]" style={`border-left: 8px solid ${color}`}>
        <div class="leading-5">{outcomeData.text ?? ""}</div>
        {#if outcomeData.effects.length > 0}
            <ul class="list mt-[0.25em]">
                {#each outcomeData.effects as effectData}
                    {#if !effectData.hidden}
                        {@const effectText = renderLockEffect(effectData)}
                        <li class="caption whitespace-pre-wrap text-sm">
                            <SvelteMarkdown source={effectText} isInline />   
                        </li>
                    {/if}
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