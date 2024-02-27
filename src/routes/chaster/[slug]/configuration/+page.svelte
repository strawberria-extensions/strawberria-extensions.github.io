<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { onMount } from "svelte";
    import { Validator } from "jsonschema";
    import chasterLogo from "$lib/resources/logo.png"
    import subLockEffects from "$lib/resources/schemas/sub-lockEffects.json";
    import subPenaltyData from "$lib/resources/schemas/sub-penaltyData.json";
    import schemaConfigs from "$lib/resources/schemas/schema-configs.json";

    export let data: { slug: "extended_wheel" | "strawberria_penalties" };

    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";

    let configDataStore: Writable<{}> = writable({});
    let customDataStore: Writable<{}> = writable({});
    let configText: string = "";
    let customText: string = "";
    let handlebarText: string = "";

    let configurationToken = "";
    let initialLoadMessage: string = "Loading extension data...";

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
                await fetch(chasterUtilitiesURL, {
                    method: "POST", headers: { 
                        "Authorization": `Bearer ${anonKey}`,
                    },
                    body: JSON.stringify({ 
                        action: "config-update",
                        config: {
                            ...$configDataStore,
                            handlebar: handlebarText,
                        },
                        configToken: configurationToken,
                        customKey: data.slug,
                        customData: $customDataStore,
                    }),
                });
            
                // Close the modal
                window.parent.postMessage(JSON.stringify({ type: "partner_configuration", event: "save_success" }), "*");
            }
        });

        initialLoadMessage = "Retrieving extension config...";

        // Retrieve current extension config using token
        const configGetResponse = await fetch(chasterUtilitiesURL, 
            { method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "config-get", 
                configToken: configurationToken,
                customKey: data.slug,
            }),
        });
        if(configGetResponse.status !== 200) {
            console.error(`Error retrieving config data: ${await configGetResponse.text()}`);
            return;
        }
        const configData: {
            config:     any;
            custom:     any;
        } = await configGetResponse.json();
        handlebarText = configData.config.handlebar ?? "";
        delete configData.config.handlebar;
        configDataStore.set(configData.config);
        configText = JSON.stringify($configDataStore);
        customDataStore.set(configData.custom);
        customText = JSON.stringify($customDataStore);

        initialLoadMessage = "";
    });

    const validator = new Validator();
    validator.addSchema(subLockEffects, "/lockEffects")
    validator.addSchema(subPenaltyData, "/penaltyData")

    let configJSONInvalid = false;
    $: {
        configText;
        configJSONInvalid = true;
        try {
            $configDataStore = JSON.parse(configText);
            const result = validator.validate($configDataStore, schemaConfigs[data.slug]["config"]);
            configJSONInvalid = !result.valid;
            if(result.errors.length > 0) { console.log(result.errors) } 
        } catch(_) {}
    }

    let customJSONInvalid = false;
    $: {
        customText;
        customJSONInvalid = true;
        try {
            $customDataStore = JSON.parse(customText);
            const result = validator.validate($customDataStore, schemaConfigs[data.slug]["custom"]);
            customJSONInvalid = !result.valid;
            if(result.errors.length > 0) { console.log(result.errors) } 
        } catch(_) {}
    }
</script>

<div class="container-bg w-full h-screen pl-3 pr-3 mt-2">
    {#if initialLoadMessage !== ""}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 mb-3 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else}
        <div class="space-y-[0.5em]">
            <div>
                Updated JSON Configuration
            </div>
            <textarea class="form-control resize-none" 
                class:text-invalid={configJSONInvalid}
                rows="6"
                bind:value={configText} />
        </div>
        <hr>
        {#if data.slug !== "strawberria_penalties"}
            <div class="space-y-[0.5em]">
                <div>
                    Database Custom Data
                </div>
                <textarea class="form-control resize-none" 
                    class:text-invalid={customJSONInvalid}
                    rows="2"
                    bind:value={customText} />
            </div>
            <hr>
        {/if}
        <div class="space-y-[0.5em]">
            <div>
                Handlebar Text
            </div>
            <textarea class="form-control resize-none" 
                rows="2"
                bind:value={handlebarText} />
        </div>
    {/if}
</div>

<style>
    .container-bg {
        /* background-color: #272533; */
        position: absolute;
    }
    .text-invalid {
        border-color: #e74c3c;
    }
    .text-invalid:focus {
        border-color: #e74c3c;
    }
</style>