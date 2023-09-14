<script lang="ts">
    import bigDecimal from "js-big-decimal";
    import chasterLogo from "$lib/resources/logo.png"
    import DurationSelect from "$lib/components/DurationSelect.svelte";
    import InputRadio from '$lib/components/InputRadio.svelte';
    import InputSelect from '$lib/components/InputSelect.svelte';
    import type { InputSelectOptionData } from '$lib/components/InputSelect';
    import type { InputRadioOption } from '$lib/components/InputRadio';
    import { regularityModeOptionsData, extendedWheelDataStore, type ChasterCustomConfig_ExtendedWheel, type ChasterCustomData_ExtendedWheel, extendedWheelSpinsStore } from "$lib/scripts/backend";
    import { generateRandomString } from '$lib/scripts/utility';
    import WheelOutcomeConfig from "$lib/components/WheelOutcomeConfig.svelte";
    import { selectedWheelIDStore } from "$lib/scripts/duration-tooltip";
    import InputCheckbox from "$lib/components/InputCheckbox.svelte";
    import { extendedValidDataStore, updateValid } from "$lib/scripts/validation";
    import { onMount } from "svelte";
    import { generateExtendedWheelText } from "$lib/scripts/handlebar";
    import InformationTooltip from "$lib/components/InformationTooltip.svelte";

    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterOAuthStoreURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster-oauth-store";
    const wheelSessionGetURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/wheel-session-get";
    const wheelConfigGetURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/wheel-config-get";
    const wheelConfigPutURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/wheel-config-put";
    extendedWheelDataStore.subscribe(() => updateValid($extendedWheelDataStore));
    
    let wheelCustomData: ChasterCustomData_ExtendedWheel | undefined = undefined;
    // extendedWheelDataStore.subscribe(() => { 
    //     if(wheelCustomData === undefined) { return; }
    //     console.log(generateExtendedWheelText($extendedWheelDataStore, wheelCustomData))
    // })

    let configurationToken = "";
    let initialLoadMessage: string = "Loading extension data...";
    let hasUserOAuth = false;
    let existingSpinAmount = 0;

    let hash: string = "";
    onMount(async () => {
        // Retrieve configuration token from page URL
        hash = window.location.hash.substring(1).split("?")[0];
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if(hash !== "") {
            const params = JSON.parse(decodeURIComponent(hash));
            configurationToken = params.partnerConfigurationToken;
        } else {
            // Check whether main token was moved to query params after OAuth
            const stateTokenData = urlParams.get("state");
            if(stateTokenData !== null && stateTokenData !== "") {
                const stateParams = JSON.parse(decodeURIComponent(stateTokenData));
                configurationToken = stateParams.partnerConfigurationToken;
            }
        }

        // Communicate to Chaster that save capability is supported
        if(window.parent) {
            window.parent.postMessage(
                JSON.stringify({
                    type: "partner_configuration",
                    event: "capabilities",
                    payload: { features: { save: true } },
                })
            , "*");
        }

        // Add an event listener to receive events from Chaster
        window.addEventListener("message", async (event) => {
            if (typeof event.data !== "string") { return; }
            const eventData = JSON.parse(event.data);

            if (eventData.type === "chaster" && eventData.event === "partner_configuration_save") {
                window.parent.postMessage(JSON.stringify({ type: "partner_configuration", event: "save_loading" }), "*");

                // Send the configuration to your backend to save it
                const lockConfigurationResponse = await fetch(wheelConfigPutURL, {
                    method: "POST", headers: { 
                        "Authorization": `Bearer ${anonKey}`,
                    },
                    body: JSON.stringify({ 
                        configurationToken: configurationToken,
                        config: $extendedWheelDataStore,
                        customData: $extendedWheelSpinsStore,
                    }),
                });
            
                // Close the modal
                window.parent.postMessage(JSON.stringify({ type: "partner_configuration", event: "save_success" }), "*");
            }
        });

        // Asynchronously check whether page loaded from OAuth response 
        const authorizationCode = urlParams.get("code");
        if(authorizationCode !== null) {
            // Valid authorization code, call oauth database store function
            const redirectURI = window.location.href.split("?")[0];
            await fetch(chasterOAuthStoreURL, {
                method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
                body: JSON.stringify({ 
                    authorizationCode: authorizationCode, 
                    redirectURI: redirectURI,
                    scopes: oAuthRequestedScopes,
                }),
            });

            // Afterwards, set URI back to normal hash style
            const url = new URL(window.location.href);
            const state = url.searchParams.get("state") as string;
            url.searchParams.delete("state");
            url.searchParams.delete("session_state");
            url.searchParams.delete("code");
            url.hash = encodeURIComponent(state);
            // window.location.href = url.toString();
            history.pushState(null, "", url.toString());
        }

        initialLoadMessage = "Checking OAuth permissions...";

        // Retrieve current session data and keyholder authorization given main token
        const wheelConfigGetResponse = await fetch(wheelConfigGetURL, 
            { method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ configurationToken: configurationToken }),
        });
        if(wheelConfigGetResponse.status !== 200) {
            console.error(`Error retrieving config data: ${await wheelConfigGetResponse.text()}`);
            return;
        }
        const wheelConfigGetData: {
            config: ChasterCustomConfig_ExtendedWheel;
            customData: ChasterCustomData_ExtendedWheel | undefined;
            hasUserOAuth: boolean
        } = await wheelConfigGetResponse.json();
        wheelCustomData = wheelConfigGetData.customData;
        for(const wheelID of Object.keys(wheelConfigGetData.config.wheels)) {
            $extendedWheelSpinsStore[wheelID] = wheelCustomData !== undefined
                ? `${wheelCustomData[wheelID]}` : "0";
        }
        $extendedWheelDataStore = wheelConfigGetData.config;
        hasUserOAuth = wheelConfigGetData.hasUserOAuth;
        $selectedWheelIDStore = Object.keys($extendedWheelDataStore.wheels)[0] ?? null;

        initialLoadMessage = "";
    });

    // Everything pertaining to selected wheel including selection, creation, and deletion
    let extendedWheelOptionsData: InputSelectOptionData[] = [];
    extendedWheelDataStore.subscribe((extendedWheelData) => {
        generateWheelOptionsData();
    });
    function generateWheelOptionsData() {
        extendedWheelOptionsData = Object.entries($extendedWheelDataStore.wheels)
            .map(([wheelID, wheelData]) => ({ 
                key: wheelID, 
                display: wheelData.display,
            }))
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
        $extendedWheelSpinsStore[randomID] = "";
        $extendedWheelDataStore.wheels[randomID] = { 
            display: newWheelName, 
            settings: {
                disabled: false,
                availableSpins: false,
                falsePercentages: false,
                hiddenActions: false,
                hiddenOutcomes: false,
                initialSpins: 0,
            },
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
        delete $extendedWheelSpinsStore[oldSelectedWheelOptionID];
        $extendedWheelSpinsStore = $extendedWheelSpinsStore;
        delete $extendedWheelDataStore.wheels[oldSelectedWheelOptionID];
        $extendedWheelDataStore = $extendedWheelDataStore;
    }
    function addOutcome() {
        if($selectedWheelIDStore === null) { return; }
        const wheelOutcomes = $extendedWheelDataStore.wheels[$selectedWheelIDStore].outcomes;
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
    function deleteOutcome(index: number) {
        if($selectedWheelIDStore === null) { return; }

        // Delete outcome and dispatch duration config to rerender
        // const oldOutcomeData = $extendedWheelDataStore.wheels[$selectedWheelIDStore].outcomes[index];
        $extendedWheelDataStore.wheels[$selectedWheelIDStore].outcomes.splice(index, 1);
        $extendedWheelDataStore = $extendedWheelDataStore;
        // communicationStore.update([null, oldOutcomeData, "update"] as any);
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
    function deleteAction(index: number, actionIndex: number) {
        const wheelOutcomes = $extendedWheelDataStore.wheels[$selectedWheelIDStore as string].outcomes;
        const wheelActions = wheelOutcomes[index];
        wheelActions.actions.splice(actionIndex, 1);
        $extendedWheelDataStore = $extendedWheelDataStore;
    }

    // Utility for updating total percentage of outcomes
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

    // When keyholder not already authorized, redirect to OAuth
    const oAuthClientID = "extensions-318826";
    const oAuthRequestedScopes = "profile,locks,shared_locks,keyholder";
    function redirectOAuth() {
        // Construct redirect URL from current URL, manually add main token
        let currentURL = encodeURIComponent(window.location.href.split("#")[0]);
        const urlChunks = [
            "https://sso.chaster.app/auth/realms/app/protocol/openid-connect/auth?",
            `client_id=${oAuthClientID}&`,
            `redirect_uri=${currentURL}&`,
            `response_type=code&${oAuthRequestedScopes}&state=${hash}`,
        ];
        const redirectURL = urlChunks.join("");
        window.location.href = redirectURL;
        // window.open(redirectURL);
    }

    const wheelSettingsOptionsData: InputRadioOption<"disabled" | "falsePercentages" | "hiddenActions" | "hiddenOutcomes" | "availableSpins">[] = [
        { key: "disabled", display: "Disabled", tooltip: "Disable this wheel of fortune.", placement: "left" }, 
        { key: "falsePercentages", display: "False Percentages", tooltip: "Display false outcome percentages to the wearer.", placement: "left" }, 
        { key: "hiddenActions", display: "Hidden Actions", tooltip: "Hides outcome actions from the wearer including from the spin result.", placement: "left" },
        { key: "hiddenOutcomes", display: "Hidden Outcomes", tooltip: "Hides possible outcomes from the wearer, only revealing the spin result.", placement: "left" },
    ];
</script>

<div class="container-bg w-full h-screen pl-3 pr-3">
    {#if false}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 mb-3 caption text-lg">{initialLoadMessage}</div>
            <button type="button" class="text-lg invisible btn btn-primary btn-md"
                on:click={redirectOAuth}>
                Authorize Permissions
            </button>
        </div>
    {:else if hasUserOAuth === false}
        <!-- Display logo and button to connect with OAuth -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 mb-3 caption text-lg">Keyholder OAuth connection necessary for extension functionality.</div>
            <button type="button" class="text-lg btn btn-primary btn-md"
                on:click={redirectOAuth}>
                Authorize Permissions
            </button>
        </div>
    {:else}
        <div class="caption">
            Configure one or more (extended) wheel of fortunes, each with their own outcomes, regularities, and wheel modes.
            OAuth2 authorization from the keyholder is required before this extension is functional.
        </div>
        <hr>
        <div class="w-full flex flex-row items-stretch space-x-4">
            <div class="w-[24em]">
                <InputSelect title="Select" 
                    subtitle="Choose which wheel to configure" 
                    bind:selected={$selectedWheelIDStore}
                    optionsData={extendedWheelOptionsData}
                    invalid={!$extendedValidDataStore[0]} />
                <div class="feedback"
                    class:invalid-feedback-min={!$extendedValidDataStore[0]}>
                    One or more wheels are invalid!
                </div>
            </div>
            <div class="grow" />
            <div class="flex flex-col justify-center space-y-1 w-[13em] shrink-0">
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
            <div class="flex flex-row justify-between space-x-[1em]">
                <div class="flex flex-col space-y-[0.75em] w-[24em]">
                    <div class="flex flex-col">
                        <div>Name</div>
                        <div class="caption mb-2">Set the wheel display name</div>
                        <input class="form-control"
                            class:is-invalid={!$extendedValidDataStore[1][$selectedWheelIDStore][1].display} 
                            placeholder="Mystical Wheel of Fortune"
                            bind:value={$extendedWheelDataStore.wheels[$selectedWheelIDStore].display}
                            on:change={generateWheelOptionsData} />
                    </div>
                </div>
                <div class="grow" />
                <div class="w-[13em] shrink-0">
                    <div>Wheel settings</div>
                    <div class="caption mb-2">Set the wheel settings</div>
                    <div class="flex flex-col space-y-[0.25em]">
                        {#each wheelSettingsOptionsData as optionData}
                            <InputCheckbox bind:value={$extendedWheelDataStore.wheels[$selectedWheelIDStore].settings[optionData.key]}
                                display={optionData.display}
                                tooltip={optionData.tooltip} />
                        {/each}
                    </div>
                </div>
            </div>
            <hr>
            <div class="flex flex-row justify-between space-x-[1em]">
                <div class="w-[22em]">
                    <div>Count Available Spins</div>
                    <div class="caption mb-2">
                        When the number of available spins reaches zero, the wheel will become unspinnable (only for the wearer).
                    </div>
                    <InputCheckbox bind:value={$extendedWheelDataStore.wheels[$selectedWheelIDStore].settings.availableSpins}
                        display="Enable counting spins" />
                </div>
                <div class="grow" />
                {#if $extendedWheelDataStore.wheels[$selectedWheelIDStore].settings.availableSpins}
                    <div class="flex flex-col space-y-[0.75em]">
                        <div class="w-[13em] shrink-0">
                            <div class="mb-[0.5em]">Set Initial Spins</div>
                            <input class="form-control !w-[11em]" type="number"
                                class:is-invalid-min={!$extendedValidDataStore[1][$selectedWheelIDStore][1].initialSpins} 
                                disabled={wheelCustomData !== undefined}
                                placeholder={`Existing: ${existingSpinAmount}`}
                                bind:value={$extendedWheelDataStore.wheels[$selectedWheelIDStore].settings.initialSpins}
                                on:input={() => { updateValid($extendedWheelDataStore) }} />
                        </div>
                        <div class="w-[13em] shrink-0">
                            <div class="flex flex-row space-x-[0.5em] mb-[0.5em]">
                                <div>Set Available Spins</div>
                                <InformationTooltip tooltip="Leave blank to maintain existing number of available spins" />
                            </div>
                            <input class="form-control !w-[11em]" type="number"
                                class:is-invalid-min={!$extendedValidDataStore[1][$selectedWheelIDStore][1].remainingSpins} 
                                disabled={wheelCustomData === undefined}
                                placeholder={`Existing: ${existingSpinAmount}`}
                                bind:value={$extendedWheelSpinsStore[$selectedWheelIDStore]}
                                on:input={() => { updateValid($extendedWheelDataStore) }} />
                        </div>
                    </div>
                {/if}
            </div>
            <hr>
            <div class="flex flex-row justify-between space-x-4">
                <div class="w-[13em] shrink-0">
                    <InputRadio title="Mode" 
                        subtitle="Set the wheel mode"
                        optionsData={regularityModeOptionsData}
                        bind:selected={$extendedWheelDataStore.wheels[$selectedWheelIDStore].regularity.mode} />
                </div>
                <div class="grow" />
                {#if $extendedWheelDataStore.wheels[$selectedWheelIDStore].regularity.mode !== "unlimited"}
                    <div class="w-[24em]">
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
                {#if $extendedWheelDataStore.wheels[$selectedWheelIDStore].settings.falsePercentages}
                    <div>False Total:</div>
                    <div class="w-24 text-right">{falseTotalPercentage}%</div>
                    <div>
                        {#if new bigDecimal(falseTotalPercentage).compareTo(new bigDecimal("100")) === 0}
                            ✔️
                        {:else}
                            ❌
                        {/if}
                    </div>
                {/if}
            </div> 
            <div class="w-full flex flex-col items-stretch space-y-[0.5em] mb-3">
                {#each $extendedWheelDataStore.wheels[$selectedWheelIDStore].outcomes as outcomeData, index}
                    {@const outcomeValidData = $extendedValidDataStore[1][$selectedWheelIDStore][1].outcomes[index]}
                    <WheelOutcomeConfig outcomeData={outcomeData}
                        outcomeValidData={outcomeValidData}
                        falsePercentageEnabled={$extendedWheelDataStore.wheels[$selectedWheelIDStore].settings.falsePercentages}
                        on:deleteOutcome={() => { deleteOutcome(index) }}
                        on:deleteAction={(event) => { deleteAction(index, event.detail) }}
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
    {/if}
</div>

<style>
    .container-bg {
        /* background-color: #272533; */
        position: absolute;
    }
    .feedback {
        color: #e74c3c;
        font-size: 80%;
        margin-top: 0.25rem;
        width: 100%;
        visibility: hidden;
    }
    .invalid-feedback-min {
        visibility: visible;
    }
</style>