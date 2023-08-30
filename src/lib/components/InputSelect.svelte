<script lang="ts">
    // @ts-ignore
    import Svelecte from 'svelecte'; 
    import type { InputSelectOptionData } from "./InputSelect";
    import InputSelectDropdown from './InputSelectDropdown.svelte';
    import InformationTooltip from "./InformationTooltip.svelte";

    export let title:        string | null = null;
    export let subtitle:     string | null = null;
    export let tooltip:      string | null = null;
    export let optionsData:  InputSelectOptionData[];
    export let selected:     string | null = null;
    
    let svelecteOptions: { id: string, name: string }[] = [];
    $: {
        svelecteOptions = optionsData.map((optionData) => { return {
            id: optionData.key,
            name: optionData.display,
            disabled: optionData.disabled,
        }});
    }
</script>

<div class="w-full">
    {#if title !== null}
        <div class="flex flex-row space-x-1">
            <div>{title}</div>
            {#if tooltip !== null}
                <InformationTooltip tooltip={tooltip} />
            {/if}
        </div>
    {/if}
    {#if subtitle !== null}
        <div class="caption mb-2">{subtitle}</div>
    {/if}
    <!-- Force rerender every time something changes -->
    {#key optionsData}
        <Svelecte class="input-select"
            bind:value={selected}
            options={svelecteOptions}
            dropdownItem={InputSelectDropdown}
            searchable={false}
            disabled={optionsData.length === 0}
            placeholder="">
            <b slot="icon" style="margin-left: 0.6em"></b>
        </Svelecte>
    {/key}
</div>

<style>
    :global(.input-select) {
        font-size: 16px;
        background-clip: padding-box;
        background-color: #22212c;
        border: 1px solid #1e1c27;
        border-radius: 15px;
        display: block;
        font-size: 1rem;
        font-weight: 400;
        height: calc(1.5em + 0.75rem + 2px);
        line-height: 1.5;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        width: 100%;
    }
    :global(.input-select.is-disabled) {
        background-color: #312f3d;
    }
    :global(.input-select:focus-within) {
        background-color: #22212c;
        border-color: #ced3f0;
        box-shadow: 0 0 0 .2rem rgba(109,125,209,.25);
        color: #e2e2e2;
        outline: 0
    }
    :global(.sv-item-content) {
        cursor: default;
    }
    :global(.sv-dropdown > div) {
        padding: 0 !important;
    }
</style>