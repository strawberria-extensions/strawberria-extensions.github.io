<script lang="ts">
    import type { ExtendedWheelConfig_ActionData } from "$lib/scripts/backend";
    import { communicationStore } from "$lib/scripts/duration-tooltip";
    import { generateTimeString } from "$lib/scripts/utility";
    import { onDestroy } from "svelte";

    export let bindData: any[];
    export let index: number;

    onDestroy(() => {
        communicationStore.set([element, [bindData, index], "destroy"]);
    })

    let element: HTMLSpanElement;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="text-link dotted-link" title="Edit duration"
    on:click={() => { communicationStore.set([element, [bindData, index], "click"]); }}
    bind:this={element}>
    {generateTimeString(bindData[0])}
    <i class="fal fa-pencil caption" />
</span>