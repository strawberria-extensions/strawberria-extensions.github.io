<script lang="ts">
    import InformationTooltip from "./InformationTooltip.svelte";

    export let value: boolean;
    export let display: string;
    export let tooltip: string | undefined = undefined;
</script>

<div class="flex flex-row space-x-[0.5em] items-center">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="CustomCheckbox mr-[0.25em]" 
        on:click={() => { value = !value }}>
        <input type="checkbox" 
            bind:checked={value}>
        <span class="checkmark">
            <span class="check">
                <i class="fas fa-check" />
            </span>
        </span>
    </div>
    <div>{display}</div>
    {#if tooltip !== undefined}
        <InformationTooltip tooltip={tooltip} />
    {/if}
</div>