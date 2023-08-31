<script lang="ts">
    import type { InputRadioOption } from "./InputRadio.d.ts";
    import InformationTooltip from "./InformationTooltip.svelte";
    import { generateRandomString } from "$lib/scripts/utility";

    export let title:       string | null = null;
    export let subtitle:    string | null = null;
    export let tooltip:     string | null = null;
    export let optionsData: InputRadioOption<any>[];
    export let selected:    string = optionsData[0]?.key ?? "";

    function handleRadioClick(optionKey: string) {
        selected = optionKey;
    }
</script>

<div class="ExtensionModeInput">
    {#if title !== null}
        <div class="flex flex-row space-x-1">
            <div class:mb-2={subtitle === null}>{title}</div>
            {#if tooltip !== null}
                <InformationTooltip tooltip={tooltip} />
            {/if}
        </div>
    {/if}
    {#if subtitle !== null}
        <div class="caption mb-2">{subtitle}</div>
    {/if}
    <div class="modes">
        {#each optionsData as optionData}
            {@const randomID = generateRandomString(8)}
            <div class="custom-control custom-radio">
                <input class="custom-control-input" type="radio" id={randomID}
                    on:click={() => { handleRadioClick(optionData.key) }}
                    checked={selected === optionData.key} />
                <label title="" class="custom-control-label" for={randomID}>
                    <div class="flex flex-row space-x-[0.5em]">
                        <span>{optionData.display}</span>
                        {#if optionData.tooltip !== undefined}
                            <InformationTooltip tooltip={optionData.tooltip}
                                placement={optionData.placement ?? "top"} />
                        {/if}
                    </div>
                </label>
            </div>
        {/each}
    </div>
</div>