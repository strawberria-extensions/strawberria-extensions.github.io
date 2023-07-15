<script lang="ts">
    import bigDecimal from 'js-big-decimal';
    import DurationDisplay from "$lib/DurationDisplay.svelte";
    import chasterLogo from "$lib/images/logo.png"
    import type { ChasterCustomConfig_WeightedDice, ChasterExtensionConfiguration } from "$lib/scripts/backend";
    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";

    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const weightedConfigGetURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/weighted-config-get";
    const weightedConfigPutURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/weighted-config-put";
    const ordering = [-1, -2, -3, -4, -5, 0, 1, 2, 3, 4, 5];

    let configurationToken = "";
    let extensionConfigData: ChasterCustomConfig_WeightedDice;
    let initialLoadMessage: string = "Loading extension data...";
    let chanceInputs = ["", "", "", "", "", "", "", "", "", "", ""];
    let previousChanceInputs = ["", "", "", "", "", "", "", "", "", "", ""];
    let chanceElements: HTMLInputElement[] = [];
    let invalidMessage = "";
    const multiplierSecondsStore: Writable<number> = writable(3600);

    onMount(async function() {
        // Retrieve configuration token from page URL
        const hash = window.location.hash.substring(1);
        if(hash !== "") {
            const params = JSON.parse(decodeURIComponent(hash));
            configurationToken = params.partnerConfigurationToken;
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
                const lockConfigurationResponse = await fetch(weightedConfigPutURL, {
                    method: "POST", headers: { 
                        "Authorization": `Bearer ${anonKey}`,
                    },
                    body: JSON.stringify({ 
                        configurationToken: configurationToken,
                        config: { chances: chanceInputs.map(v => new bigDecimal(v).getValue()), multiplier: $multiplierSecondsStore }
                    }),
                });
            
                // Close the modal
                window.parent.postMessage(JSON.stringify({ type: "partner_configuration", event: "save_success" }), "*");
            }
        });

        // Retrieve current config data given main token
        const extensionConfigResponse = await fetch(weightedConfigGetURL, 
                { method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
                body: JSON.stringify({ configurationToken: configurationToken }),
            });
        if(extensionConfigResponse.status !== 200) {
            console.error(`Error retrieving extension configuration: ${await extensionConfigResponse.text()}`);
            return;
        }
        extensionConfigData = await extensionConfigResponse.json();

        // Populate current chances and multiplier
        chanceInputs = extensionConfigData.chances.map(v => `${v}`);
        previousChanceInputs = extensionConfigData.chances.map(v => `${v}`); // Deep copy
        multiplierSecondsStore.set(extensionConfigData.multiplier);

        initialLoadMessage = "";
    });

    // Checks whether all percentages match up or not
    function checkInvalidPercentage() {
        let totalPercentage = new bigDecimal(0);
        
        for(const chanceRaw of chanceInputs) {
            if(validInputValue(chanceRaw) === true) {
                totalPercentage = totalPercentage.add(new bigDecimal(chanceRaw));
            }
        }

        if(bigDecimal.compareTo(totalPercentage.getValue(), "100") !== 0) {
            invalidMessage = `Invalid total percentage, got ${totalPercentage.getValue()}% but expected 100%`
        } else {
            invalidMessage = "";
        }
    }

    // Restricts input for the given textbox to the given inputFilter.
    // https://stackoverflow.com/questions/13952686/how-to-make-html-input-tag-only-accept-numerical-values
    function validate(index: number) {
        const textbox = chanceElements[index];
        const value = textbox.value;
        if(validInputValue(value) === true) {
            previousChanceInputs[index] = value;
            (textbox as any).oldSelectionStart = (textbox as any).selectionStart;
            (textbox as any).oldSelectionEnd = (textbox as any).selectionEnd;
        } else {
            textbox.value = previousChanceInputs[index];
            (textbox as any).setSelectionRange(
                (textbox as any).oldSelectionStart, (textbox as any).oldSelectionEnd);
        }

        checkInvalidPercentage();
    }
    function validInputValue(value: string) {
        if(value == "") { return true; }
        if(value.match(/^[0-9\.]+$/) === null) { return false; }
        const parsed = parseFloat(value);
        if(isNaN(parsed)) { return false; }
        if(parsed < 0 || parsed > 100) { return false; }
        return true;
    }
</script>

<div class="container-bg w-full h-screen pl-4 pr-4">
    {#if initialLoadMessage !== ""}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-full flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else}
        <div class="page-top">Time multiplier</div>
        <div class="caption mb-2">The difference between the two dice will be multiplied by this time.</div>
        <div class="d-flex justify-content-center">
            <DurationDisplay secondsStore={multiplierSecondsStore} 
                settings={{ day: true, hour: true, minute: true, second: false }}
                buttons={true} />
        </div>
        <div class="page-top" style="margin-top: 1em">Weighted Dice Outcomes</div>
        <div class="caption mb-2">Configure the outcomes of your weighted dice</div>
        <div class="dice-config actions mb-4">
            <div style="display: flex; flex-direction: row; width: 100%">
                <div style="padding-right: 1em; border-right: thin solid #a4a7b7" class="dice-config-col">
                    <p class="dice-col-header">Wearer Loses</p>
                    {#each [0, 1, 2, 3, 4] as index}
                        <div class="dice-config-row">
                            <div>Difference = </div>
                            <div class="dice-config-diffnum">{ordering[index]}</div>
                            <input class="dice-config-input form-control" placeholder="0"
                                bind:value={chanceInputs[index]}
                                bind:this={chanceElements[index]}
                                on:input={() => { validate(index) }} />
                            %
                        </div>
                    {/each}
                </div>
                <div style="padding-left: 1em" class="dice-config-col">
                    <p class="dice-col-header">Wearer Wins</p>
                    {#each [6, 7, 8, 9, 10] as index}
                        <div class="dice-config-row">
                            <div>Difference = </div>
                            <div class="dice-config-diffnum">+{ordering[index]}</div>
                            <input class="dice-config-input form-control" placeholder="0"
                                bind:value={chanceInputs[index]}
                                bind:this={chanceElements[index]}
                                on:input={() => { validate(index) }} />
                            %
                        </div>
                    {/each}
                </div>
            </div>
            <div class="dice-config-draw">
                <div style="width: 50%">
                    <div class="dice-config-row">
                        <div>Difference = </div>
                        <div class="dice-config-diffnum">0</div>
                        <input class="dice-config-input form-control" placeholder="0"
                            bind:value={chanceInputs[5]}
                            bind:this={chanceElements[5]}
                            on:input={() => { validate(5) }} />
                        %
                    </div>
                </div>
            </div>
            <p class="invalid" style="font-size: 100%"
                class:hidden={invalidMessage === ""}>
                {invalidMessage}
            </p>
        </div>
    {/if}
</div>

<style>
    .container-bg {
        /* background-color: #272533; */
        position: absolute;
    }
</style>