<script lang="ts">
    import { onDestroy } from "svelte";
    import SvelteMarkdown from "svelte-markdown";
    import type { IndividualPenaltyData } from "$lib/scripts/signature-backend";
    import { generateOutcomeEffectLabel, generateTimeStringPenalties } from "$lib/scripts/utility";

    export let shouldHorizontal: boolean;
    export let lockID: string;
    export let extensionLookup: { key: string; what: string };
    export let individualPenaltyData: IndividualPenaltyData;
    
    const href=`https://chaster.app/locks/${lockID}/extensions/${individualPenaltyData.extensionData._id}`;
    const todoSubtitle = extensionLookup.key === "extended_wheel"
        ? `Spin the wheel named '${individualPenaltyData.penaltyConfig.display}'` 
        : extensionLookup.key === "jigsaw_puzzles"
            ? `Complete ${individualPenaltyData.penaltyConfig.required} new jigsaw puzzles`
            : "";
    let widthPercentage = individualPenaltyData.penaltyData.current / individualPenaltyData.penaltyConfig.required * 100;
    if(widthPercentage > 100) { widthPercentage = 100; }
    
    let remainingTimestamp: string = "";
    let interval = setInterval(() => {
        const currentTimeMS = new Date().getTime();
        const timeDifferenceMS = individualPenaltyData.penaltyData.lastPenaltyMS + individualPenaltyData.penaltyConfig.interval - currentTimeMS;
        remainingTimestamp = timeDifferenceMS > 0
            ? generateTimeStringPenalties(Math.floor(timeDifferenceMS / 1000))
            : individualPenaltyData.penaltyData.current > individualPenaltyData.penaltyConfig.required
                ? "Completed! Waiting for system..." : "Too late! Waiting for system...";
    }, 200)
    onDestroy(() => { clearInterval(interval); })
</script>

<div class={`card-content flex flex-col space-y-[0.5em] ${shouldHorizontal ? "w-[32em]" : "w-full"}`}>
    <div class="flex flex-row space-x-[1em] items-center mb-[0.75em]">
        <div class="flex flex-col">
            <h5 class="mb-[0.25em]">{individualPenaltyData.extensionData.display}</h5>
            <div class="caption">{todoSubtitle}</div>
        </div>
        <div class="grow" />
        <a href={href} target="_blank" class="btn btn-outline-primary">Open</a>
    </div>
    <div>{remainingTimestamp}</div>
    <div class="progress">
        <div role="progressbar" class="progress-bar"
            style={`width: ${widthPercentage}%`}></div>
    </div>
    <div class="flex flex-row items-start text-sm whitespace-pre-wrap space-x-[1em]">
        <div class="flex flex-col grow">
            <div>Penalty effects:</div>
            {#if individualPenaltyData.penaltyConfig.effects.length > 0}
                <ul class="flex flex-col list effect-list caption pl-[0.25em] mt-[0.125em]">
                    {#each individualPenaltyData.penaltyConfig.effects as effectData}
                        {@const effectText = generateOutcomeEffectLabel(effectData)}
                        <li><SvelteMarkdown source={effectText} isInline /></li>
                    {/each}
                </ul>
            {/if}
        </div>
        <div class="shrink-0 caption">{individualPenaltyData.penaltyData.current} / {individualPenaltyData.penaltyConfig.required} 
            {extensionLookup.what}{individualPenaltyData.penaltyConfig.required > 0 ? "s" : ""}</div>
    </div>
</div>

<style>
    .effect-list {
        list-style: inside;
        list-style-position: outside;
        margin-left: 1em;
        margin-bottom: 0;
    }
</style>