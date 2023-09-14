<script lang="ts">
    import { extendedValidDataStore } from '$lib/scripts/validation';
    // @ts-ignore
    import { itemActions } from 'svelecte/item';
  
    // these properties can be used
    export let index: number;
    export let item:  { id: string; name: string, disabled?: boolean };
    export let formatter, isDisabled, inputValue, disableHighlight;
</script>

{#if $extendedValidDataStore[1][item.id]}
    <div use:itemActions={{item, index}}
        class="flex flex-row dropdown-hover"
        class:dropdown-disabled={item["disabled"]}
        class:dropdown-invalid={!$extendedValidDataStore[1][item.id][0]}
        on:select
        on:deselect
        on:hover>
        {item["name"]}
        <div class="grow" />
        {#if $extendedValidDataStore[1][item.id][0] === false}
        ❌
        {/if}
    </div>
{/if}

<style>
    .dropdown-hover {
        background-color: #22212c;
        padding: 2px 0px 2px 14px;
        user-select: none;
        margin: 0;
        border: 1px solid #22212c;
    }
    .dropdown-invalid {
        border-color: #e74c3c;
    }
    .dropdown-disabled {
        background-color: #35343f !important;
        color: #dddddd;
    }
    .dropdown-hover:hover {
        background-color: #2067d1;
    }
    :global(.sv-dropdown-scroll) {
        background-color: #22212c;
        border-radius: 0;
        padding: 0;
        border: 1px solid grey
    }
</style>