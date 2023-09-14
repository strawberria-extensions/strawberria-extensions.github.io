<script lang="ts">
    import { Popover } from "flowbite-svelte";
    import type { ExtendedWheelConfig_ActionData } from "$lib/scripts/backend";
    import { generateRandomString, generateTimeString } from "$lib/scripts/utility";
    import DurationSelect from "./DurationSelect.svelte";
    import { fade } from "svelte/transition";
    import type { DurationSelectSettings } from "./DurationSelect";

    export let actionData: ExtendedWheelConfig_ActionData;
    export let settings:   DurationSelectSettings = { week: false, day: true, hour: true, minute: true, second: true };

    let element: HTMLElement;
    let refElement: HTMLElement;

    const id = generateRandomString(8, "caps-alpha");
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div>
    <span class="text-link dotted-link select-none" id={id}
        bind:this={element}>
        {generateTimeString(actionData.params[0])}
        <i class="fal fa-pencil caption" />
    </span>
    <div class="absolute pointer-events-none w-16" id={`${id}_ref`}
        style={`transform: translateY(-100%); height: 1.5em`} 
        bind:this={refElement} />
</div>
{#if element !== undefined && refElement !== undefined}
    <Popover defaultClass="" 
        class="popover" transition={fade} params={{ duration: 150 }}
        triggeredBy={`#${id}`} trigger="click" arrow={true}
        reference={`#${id}_ref`}>
        <div style="border-radius: 10px">
            Time to add
            <DurationSelect bind:seconds={actionData.params[0]}
                settings={settings}
                buttons={true} />
        </div>
    </Popover>
{/if}

<style>
    :global(.popover) {
        color: #fff !important;
        background-color: #222 !important;
        border: 1px solid rgba(0,0,0,.2) !important;
        border-radius: 10px !important;
        padding: .5rem .75rem .5rem .75rem !important;
    }

    :global(.popover > .absolute) {
        border: 0
    }
</style>