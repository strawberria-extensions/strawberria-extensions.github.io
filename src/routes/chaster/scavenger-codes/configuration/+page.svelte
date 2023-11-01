<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import chasterLogo from "$lib/resources/logo.png"
    import { onMount } from "svelte";

    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";
    
    let configDataStore: Writable<{

    }> = writable({});
    let configText: string = "";
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
                const lockConfigurationResponse = await fetch(chasterUtilitiesURL, {
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
                configToken: configurationToken 
            }),
        });
        if(configGetResponse.status !== 200) {
            console.error(`Error retrieving config data: ${await configGetResponse.text()}`);
            return;
        }
        const configData = await configGetResponse.json();
        handlebarText = configData.handlebar ?? "";
        delete configData.handlebar;
        configDataStore.set(configData);
        configText = JSON.stringify(configData);

        initialLoadMessage = "";
    });

    let configJSONInvalid = false;
    $: {
        configText;
        configJSONInvalid = true;
        try {
            $configDataStore = JSON.parse(configText);
            configJSONInvalid = false;
        } catch(_) {}
    }
</script>

<div class="container-bg w-full h-screen pl-3 pr-3">
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
                rows="12"
                bind:value={configText} />
        </div>
        <hr>
        <div class="space-y-[0.5em]">
            <div>
                Handlebar Text
            </div>
            <textarea class="form-control resize-none" 
                rows="4"
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
</style>