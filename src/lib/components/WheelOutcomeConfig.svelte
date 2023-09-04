<script lang="ts">
    import { extendedWheelActionTemplates, type ExtendedWheel_OutcomeData, extendedWheelActions, type ExtendedWheel_ActionType, regularityModeOptionsData, extendedWheelDataStore } from "$lib/scripts/backend";
    import { createEventDispatcher } from "svelte";
    import { tippy } from "svelte-tippy";
    import ConfigDurationPopover from "./ConfigDuration_Popover.svelte";
    import InformationTooltip from "./InformationTooltip.svelte";
    import InputCheckbox from "./InputCheckbox.svelte";
    import InputRadio from "./InputRadio.svelte";
    import DurationSelect from "./DurationSelect.svelte";
    import { updateValid, type ExtendedValidData_Outcome } from "$lib/scripts/validation";

    const dispatch = createEventDispatcher();

    export let outcomeData: ExtendedWheel_OutcomeData;
    export let outcomeValidData: ExtendedValidData_Outcome;
    export let falsePercentageEnabled: boolean;
    $: outcomeData, updateValid($extendedWheelDataStore);

    // Intermediate type storage flip-flop to propagate after change
    let intermediateActionTypes: ExtendedWheel_ActionType[] = outcomeData.actions
        .map(actionData => actionData.type);
    function resetAction(index: number) {
        const newActionData = outcomeData.actions[index];
        newActionData.type = intermediateActionTypes[index];
        const newActionTemplate = extendedWheelActionTemplates[newActionData.type];
        newActionData.params = JSON.parse(JSON.stringify(newActionTemplate.default));
        outcomeData = outcomeData;
    }

    let wheelOptionsData: { key: string; display: string }[] = [];
    extendedWheelDataStore.subscribe((extendedWheelData) => {
        wheelOptionsData = Object.entries(extendedWheelData.wheels)
            .map(([wheelKey, wheelData]) => ({ key: wheelKey, display: wheelData.display }))
    })

    // const actionsOptionsData = Object.entries(extendedWheelActions)
    //     .map(([actionKey, actionText]) => ({ key: actionKey, display: actionText }));
</script>

<div class="card-content card-border !px-[0.5em] !py-[0.75em] rounded-[1.5em]"
    class:is-invalid-min={!outcomeValidData[0]}>
    <div class="flex flex-col items-stretch w-full space-y-[0.75em]">
        <div class="flex flex-row items-stretch justify-between space-x-[0.5em]">
            <div class="flex flex-col justify-around mx-[0.25em]">
                <!-- <button class="btn btn-primary mb-1"
                    on:click={() => { dispatch("addAction") }}>
                    <i class="fal fa-plus"></i>
                    Add an Action
                </button> -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span class="icon-button p-[0.25em]"
                    use:tippy={{ content: "Add Action", placement: "top", arrow: true, theme: "tooltip",
                        duration: 150, animation: "fade" }}
                    on:click={() => { dispatch("addAction") }}>
                    <!-- <i class="fal fa-plus-circle" /> -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[1.5em] h-[1.5em]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- <span class="text-link p-2 text"
                    use:tippy={{ content: "Duplicate", placement: "top", arrow: true, theme: "tooltip",
                        duration: 150, animation: "fade" }}
                    on:click={() => { dispatch("duplicate") }}>
                    <i class="fal fa-copy" />
                </span> -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span class="icon-button p-[0.25em]"
                    use:tippy={{ content: "Delete Outcome", placement: "top", arrow: true, theme: "tooltip",
                        duration: 150, animation: "fade" }}
                    on:click={() => { dispatch("deleteOutcome") }}>
                    <!-- <i class="fal fa-trash-alt" /> -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>                      
                </span>
            </div>
            <div class="flex flex-col items-start grow !mr-[0.75em]">
                <textarea class="form-control resize-none" 
                    rows="3"
                    placeholder="Flavor Text"
                    bind:value={outcomeData.text} />
                <!-- <input class="form-control"
                    placeholder="Flavor Text"
                    bind:value={outcomeData.text} /> -->
            </div>
            <div class="flex flex-col justify-between w-[9em] space-y-[0.25em]">
                <div class="flex flex-row items-center">
                    <div class="w-[4em]">Real</div>
                    <div class="grow" />
                    <input class="form-control !pr-[2em] !w-[6em]" 
                        class:is-invalid-min={!outcomeValidData[1].percentage}
                        bind:value={outcomeData.percentage}
                        on:input={() => { 
                            dispatch("update");  
                            // Replicate to false percentage if disabled
                            // if(falsePercentageEnabled === false) {
                            //     outcomeData.falsePercentage = outcomeData.percentage;
                            // }
                        }}
                    />
                    <div class="relative text-sm">
                        <div class="absolute"
                            style="transform: translate(-1.5em, -50%)">
                            %
                        </div>
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    {#if falsePercentageEnabled}
                        <div class="w-[5em]">False</div>
                        <div class="grow" />
                        <input class="form-control !pr-[2em] !w-[6em]" 
                            class:is-invalid-min={!outcomeValidData[1].falsePercentage}
                            bind:value={outcomeData.falsePercentage}
                            on:input={() => { dispatch("update"); }}
                        />
                        <div class="relative text-sm">
                            <div class="absolute"
                                style="transform: translate(-1.5em, -50%)">
                                %
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
            <!-- <ConfigDuration outcomeData={outcomeData} /> -->
            <!-- <ConfigDurationPopover outcomeData={outcomeData} /> -->
        </div>
        {#each outcomeData.actions as actionData, actionIndex}
            {@const actionTemplateData = extendedWheelActionTemplates[actionData.type]}
            {@const actionValidData = outcomeValidData[1].actions[actionIndex]}
            <hr />
            <div class="flex flex-col w-full space-y-[0.5em]">
                <div class="flex flex-col">
                    <div class="flex flex-row items-center justify-around mx-[0.25rem] space-x-[0.75em] pr-[0.25em]">
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <span class="icon-button p-[0.25em]"
                            use:tippy={{ content: "Delete Action", placement: "top", arrow: true, theme: "tooltip",
                                duration: 150, animation: "fade" }}
                            on:click={() => { dispatch("deleteAction", actionIndex) }}>
                            <div class="flex flex-row items-center h-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[1.5em] h-[1.5em]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </span>
                        <!-- <InputSelect optionsData={actionsOptionsData}
                            bind:selected={actionData.type} /> -->
                            <select class="form-control" 
                            bind:value={intermediateActionTypes[actionIndex]}
                            on:change={() => { resetAction(actionIndex); }}>
                            {#each Object.entries(extendedWheelActions) as [actionKey, actionText]}
                                <option value={actionKey}>{actionText}</option>
                            {/each}
                        </select>
                        <div class="flex flex-row items-center text-lg">
                            <InformationTooltip tooltip={actionTemplateData.tooltip}
                                placement={"top"} />
                        </div>
                    </div>
                </div>
                {#if actionTemplateData.params.length > 0}
                    <div class="flex flex-col items-start space-y-[1em] px-[1em]">
                        <!-- {#key actionTemplateData} -->
                            {#each actionTemplateData.params as paramData, paramIndex}
                                <!-- {#if paramIndex !== 0}
                                    <div class="h-[2em] border-l-[1px] border-black">
                                        <span />
                                    </div>
                                {/if} -->
                                <div class={`flex flex-col items-start space-y-[0.25em] ${paramData.class ?? ""}`}>
                                    {#if paramData.label !== "" && paramData.type !== "boolean" && paramData.type !== "regularity"}
                                        <div class="caption">
                                            {paramData.label}
                                        </div>
                                    {/if}
                                    {#if paramData.type === "boolean"}
                                        <InputCheckbox bind:value={actionData.params[paramIndex]}
                                            display={paramData.label}
                                            tooltip={paramData.params["tooltip"]} />
                                    {:else if paramData.type === "duration"}
                                        <ConfigDurationPopover actionData={actionData}
                                            settings={{ week: true, day: true, hour: true, minute: true, second: true }} />
                                    {:else if paramData.type === "number"}
                                        <div class="flex flex-row items-center">
                                            <input class={`form-control !w-[6em]
                                                ${paramData.params["suffix"] ? "!pr-[2em]" : ""}`}
                                                class:is-invalid-min={!actionValidData[1][paramIndex]}
                                                bind:value={actionData.params[paramIndex]}
                                                on:input={() => { dispatch("update"); }}
                                            />
                                            {#if paramData.params["suffix"]}
                                                <div class="relative text-sm">
                                                    <div class="absolute"
                                                        style="transform: translate(-1.5em, -50%)">
                                                        {paramData.params["suffix"]}
                                                    </div>
                                                </div>
                                            {/if}
                                        </div>
                                    {:else if paramData.type === "select" || paramData.type === "select_wheel"}
                                        <div class={paramData.class} >
                                            <select class="form-control" 
                                                class:is-invalid-min={!actionValidData[1][paramIndex]}
                                                bind:value={actionData.params[paramIndex]}>
                                                {#if paramData.type === "select"}
                                                    {#each paramData.params["options"] as paramOptionData}
                                                        <option value={paramOptionData.key}>{paramOptionData.display}</option>
                                                    {/each}
                                                {:else}
                                                    {#each wheelOptionsData as wheelOptionData}
                                                        <option value={wheelOptionData.key}>{wheelOptionData.display}</option>
                                                    {/each}
                                                {/if}
                                            </select> 
                                        </div>
                                    {:else if paramData.type === "regularity"}
                                        <div class="flex flex-row justify-between space-x-4">
                                            <div class="shrink-0">
                                                <InputRadio title="Mode"
                                                    optionsData={regularityModeOptionsData}
                                                    bind:selected={actionData.params[paramIndex][0]} />
                                            </div>
                                            <div class="grow" />
                                            {#if actionData.params[paramIndex][0] !== "unlimited"}
                                                <div>
                                                    <div class="mb-2">Regularity</div>
                                                    <DurationSelect bind:seconds={actionData.params[paramIndex][1]}
                                                        settings={{ week: false, day: true, hour: true, minute: true, second: false }}
                                                        buttons={true} />
                                                </div>
                                            {/if}
                                        </div>
                                    {:else if paramData.type === "text"}
                                        <div class={`flex flex-row items-center ${paramData.params["innerClass"] ?? ""}`}>
                                            <input class="form-control"
                                                class:is-invalid-min={!actionValidData[1][paramIndex]}
                                                bind:value={actionData.params[paramIndex]}
                                                on:input={() => { dispatch("update"); }}
                                            />
                                        </div>
                                    <!-- omit radio for now -->
                                    {/if}
                                </div>  
                            {/each}
                        <!-- {/key} -->
                    </div>
                {/if}
            </div>
            <!-- <div class="border-l-[0.5em] border-red-700 pr-[0.5em]" /> -->
        {/each}
    </div>
</div>

<style>
    :global(.sv-dropdown) {
        height: calc((1.5em + 2px * 2) * 16);
    }

    .card-border {
        border: 1px solid #343241;
    }

    /* .param-tooltip {
        text-decoration: underline dotted;
        cursor: help;
    } */
</style>