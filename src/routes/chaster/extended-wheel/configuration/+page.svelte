<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    // @ts-ignore
    import DurationSelect from "$lib/components/DurationSelect.svelte";
    import InputRadio from '$lib/components/InputRadio.svelte';
    import InputSelect from '$lib/components/InputSelect.svelte';
    import type { InputSelectOptionData } from '$lib/components/InputSelect';
    import type { InputRadioOption } from '$lib/components/InputRadio';
    import type { ExtendedWheelData } from "$lib/scripts/backend";
    import { generateRandomString } from '$lib/scripts/utility';
    import WheelOutcomeConfig from "$lib/components/WheelOutcomeConfig.svelte";
    import { communicationStore, selectedWheelIDStore } from "$lib/scripts/duration-tooltip";
    import bigDecimal from "js-big-decimal";
    // import ConfigDurationTooltip from "$lib/components/ConfigDurationTooltip.svelte";

    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterOAuthStoreURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster-oauth-store";
    const wheelConfigGetURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/wheel-config-get";
    const wheelConfigPutURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/wheel-config-put";

    // Everything pertaining to selected wheel including selection, creation, and deletion
    let extendedWheelOptionsData: InputSelectOptionData[] = [];
    let extendedWheelDataStore: Writable<ExtendedWheelData> = writable({ wheels: {} });
    extendedWheelDataStore.subscribe((extendedWheelData) => {
        generateWheelOptionsData();
    });
    function generateWheelOptionsData() {
        extendedWheelOptionsData = Object.entries($extendedWheelDataStore.wheels)
            .map(([wheelID, wheelData]) => ({ key: wheelID, display: wheelData.display }))
            .sort((optionDataA, optionDataB) => optionDataA.display.localeCompare(optionDataB.display));
    }
    function createWheel() {
        // Check what index to name new wheel given existing wheel names
        const wheelNames = Object.values($extendedWheelDataStore.wheels)
            .map(wheelData => wheelData.display);
        let newWheelIndex = 1;
        while(wheelNames.includes(`New Wheel ${newWheelIndex}`)) { newWheelIndex++; }
        const newWheelName = `New Wheel ${newWheelIndex}`;

        const randomID = generateRandomString(6);
        $extendedWheelDataStore.wheels[randomID] = { 
            display: newWheelName, 
            spinSetting: "normal",
            regularity: {
                interval: 3600,
                mode: "non_cumulative",
            },
            penalty: {
                requirement: 0,
                penalties: []
            },
            outcomes: []
        };
        $extendedWheelDataStore = $extendedWheelDataStore;
        // if($selectedWheelIDStore === null) { $selectedWheelIDStore = randomID; }
        // Necessary to keep Svelecte from freaking out, defer to next event loop
        setTimeout(() => { $selectedWheelIDStore = randomID; }, 0);
    }
    function deleteWheel() {
        // Set selected wheel index to previous or null
        const oldSelectedWheelOptionID = $selectedWheelIDStore as string;
        const selectedWheelOptionIndex = extendedWheelOptionsData
            .findIndex((optionData) => optionData.key === $selectedWheelIDStore);
        if(selectedWheelOptionIndex === 0) {
            if(extendedWheelOptionsData.length === 1) { 
                $selectedWheelIDStore = null; 
            } else { 
                $selectedWheelIDStore = extendedWheelOptionsData[selectedWheelOptionIndex + 1].key; 
            }
        } else {
            $selectedWheelIDStore = extendedWheelOptionsData[selectedWheelOptionIndex - 1].key;
        }
        delete $extendedWheelDataStore.wheels[oldSelectedWheelOptionID];
        $extendedWheelDataStore = $extendedWheelDataStore;
    }
    function addOutcome() {
        const wheelOutcomes = $extendedWheelDataStore.wheels[$selectedWheelIDStore as string].outcomes;
        wheelOutcomes.push({
            text: "",
            actions: [],
            percentage: "5",
            falsePercentage: "5"
        });
        $extendedWheelDataStore = $extendedWheelDataStore;
    }
    function duplicateOutcome(index: number) {
        // Duplicate outcome, use index + 1 to insert by splicing
        const wheelOutcomes = $extendedWheelDataStore.wheels[$selectedWheelIDStore as string].outcomes;
        const duplicateOutcome = JSON.parse(JSON.stringify(wheelOutcomes[index]));
        wheelOutcomes.splice(index + 1, 0, duplicateOutcome);
        $extendedWheelDataStore = $extendedWheelDataStore;
    }
    function addAction(index: number) {
        // Duplicate outcome, use index + 1 to insert by splicing
        const wheelOutcomes = $extendedWheelDataStore.wheels[$selectedWheelIDStore as string].outcomes;
        const outcomeData = wheelOutcomes[index];
        outcomeData.actions.push({
            type: "add_time",
            params: [3600]
        });
        $extendedWheelDataStore = $extendedWheelDataStore;
    }
    function deleteOutcome(index: number) {
        if($selectedWheelIDStore === null) { return; }

        // Delete outcome and dispatch duration config to rerender
        const oldOutcomeData = $extendedWheelDataStore.wheels[$selectedWheelIDStore].outcomes[index];
        $extendedWheelDataStore.wheels[$selectedWheelIDStore].outcomes.splice(index, 1);
        $extendedWheelDataStore = $extendedWheelDataStore;
        communicationStore.update([null, oldOutcomeData, "update"] as any);
    }

    let totalPercentage: string = "0";
    let falseTotalPercentage: string = "0";
    extendedWheelDataStore.subscribe(() => { updateTotalPercentage() });
    function updateTotalPercentage() {
        if($selectedWheelIDStore === null) { return; }
        const wheelData = $extendedWheelDataStore.wheels[$selectedWheelIDStore];
        let totalPercentageDecimal = new bigDecimal("0");
        let falseTotalPercentageDecimal = new bigDecimal("0");
        for(const outcomeData of wheelData.outcomes) {
            try {
                const percentageDecimal = new bigDecimal(outcomeData.percentage);
                totalPercentageDecimal = totalPercentageDecimal.add(percentageDecimal);
            } catch(_) {}
            try {
                const falsePercentageDecimal = new bigDecimal(outcomeData.falsePercentage);
                falseTotalPercentageDecimal = falseTotalPercentageDecimal.add(falsePercentageDecimal);
            } catch(_) {}
        }
        totalPercentage = totalPercentageDecimal.getValue();
        falseTotalPercentage = falseTotalPercentageDecimal.getValue();
    }

    const spinSettingOptionsData: InputRadioOption[] = [
        { key: "normal", display: "Normal" }, 
        { key: "false", display: "False Percentages", tooltip: "Displays false outcome percentages to the wearer (and shows a disclaimer).", placement: "left" }, 
        { key: "hidden", display: "Hidden Outcomes", tooltip: "Hides possible outcomes from the wearer, only revealing the spin result.", placement: "left" }
    ];
    const regularityModeOptionsData: InputRadioOption[] = [
        { key: "non_cumulative", display: "Non cumulative", tooltip: "After each spin, you will have to wait a certain amount of time before spinning again."}, 
        { key: "cumulative", display: "Cumulative", tooltip: "The number of possible wheel spins is cumulated over time."}, 
        { key: "unlimited", display: "Unlimited", tooltip: "You can spin the wheel as many times as you like."}
    ];
</script>

<div class="container-bg w-full h-screen pl-3 pr-3">
    <div class="caption mb-1 text-center w-full">
        <b>Please ignore the extension mode setting above.</b>
    </div>
    <div class="caption">
        Configure one or more (extended) wheel of fortunes, each with their own outcomes, regularities, and wheel modes.
        OAuth2 authorization from the keyholder is required before this extension is functional.
    </div>
    <hr>
    <div class="w-full flex flex-row items-stretch space-x-4">
        <div class="w-96">
            <InputSelect title="Select" subtitle="Choose which wheel to configure" 
                bind:selected={$selectedWheelIDStore}
                optionsData={extendedWheelOptionsData} />
        </div>
        <div class="grow" />
        <div class="flex flex-col justify-center space-y-1 w-52 shrink-0">
            <button type="button" class="btn btn-primary btn-md"
                on:click={createWheel}>
                <span>Create New Wheel</span>
            </button>
            <button type="button" class="btn btn-primary btn-md"
                on:click={deleteWheel}
                disabled={$selectedWheelIDStore === null}>
                <span>Delete Wheel</span>
            </button>
        </div>
    </div>
    <!-- <InputRadio title="Mode" subtitle="Select the extension mode" optionsData={dat} /> -->
    {#if $selectedWheelIDStore !== null}
        <hr>
        <div class="flex flex-row justify-between space-x-4">
            <div class="w-96">
                <div>Name</div>
                <div class="caption mb-2">Set the wheel display name</div>
                <input class="form-control" placeholder="Mystical Wheel of Fortune"
                    bind:value={$extendedWheelDataStore.wheels[$selectedWheelIDStore].display}
                    on:change={generateWheelOptionsData} />
            </div>
            <div class="grow" />
            <div class="w-52 shrink-0">
                <InputRadio title="Spin setting" subtitle="Set the wheel spin setting"
                    optionsData={spinSettingOptionsData}
                    bind:selected={$extendedWheelDataStore.wheels[$selectedWheelIDStore].spinSetting} />
            </div>
        </div>
        <hr>
        <div class="flex flex-row justify-between space-x-4">
            <div class="w-52 shrink-0">
                <InputRadio title="Mode" 
                    subtitle="Set the wheel mode"
                    optionsData={regularityModeOptionsData}
                    bind:selected={$extendedWheelDataStore.wheels[$selectedWheelIDStore].regularity.mode} />
            </div>
            <div class="grow" />
            {#if $extendedWheelDataStore.wheels[$selectedWheelIDStore].regularity.mode !== "unlimited"}
                <div class="w-96">
                    <div>Regularity</div>
                    <div class="caption mb-2">After spinning the wheel, you will have to wait this duration before spinning again.</div>
                    <DurationSelect bind:seconds={$extendedWheelDataStore.wheels[$selectedWheelIDStore].regularity.interval}
                        settings={{ week: false, day: true, hour: true, minute: true, second: false }}
                        buttons={true} />
                </div>
            {/if}
        </div>
        <hr>
        <div class="flex flex-row space-x-[0.25em]">
            <div>Outcomes</div>
            <div class="grow" />
            <div>Real Total:</div>
            <div class="w-24 text-right">{totalPercentage}%</div>
            <div>
                {#if new bigDecimal(totalPercentage).compareTo(new bigDecimal("100")) === 0}
                    ✔️
                {:else}
                    ❌
                {/if}
            </div>
        </div>
        <div class="flex flex-row justify-between space-x-[0.25em] mb-2">
            <div class="caption">Configure outcomes for the wheel</div>
            <div class="grow" />
            <div>False Total:</div>
            <div class="w-24 text-right">{falseTotalPercentage}%</div>
            <div>
                {#if new bigDecimal(falseTotalPercentage).compareTo(new bigDecimal("100")) === 0}
                    ✔️
                {:else}
                    ❌
                {/if}
            </div>
        </div> 
        <div class="w-full flex flex-col items-stretch space-y-[0.5em] mb-3">
            {#each $extendedWheelDataStore.wheels[$selectedWheelIDStore].outcomes as outcomeData, index}
                <WheelOutcomeConfig outcomeData={outcomeData}
                    on:deleteOutcome={() => { deleteOutcome(index) }}
                    on:duplicate={() => { duplicateOutcome(index) }}
                    on:addAction={() => { addAction(index) }}
                    on:update={() => { updateTotalPercentage() }} />
            {/each}
        </div>
        <div class="w-full flex flex-col items-center">
            <button class="btn btn-primary"
                on:click={addOutcome}>
                <i class="fal fa-plus"></i>
                Add an Outcome
            </button>
        </div>

        <!-- Tooltip which kinda just hides -->
        <!-- <ConfigDurationTooltip on:update={() => { $extendedWheelDataStore = $extendedWheelDataStore }} /> -->
    {/if}
</div>

<style>
    .container-bg {
        /* background-color: #272533; */
        position: absolute;
    }
</style>