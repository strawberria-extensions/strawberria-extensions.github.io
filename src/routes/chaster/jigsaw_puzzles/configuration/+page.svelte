<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { onMount } from "svelte";
    import { Validator } from "jsonschema";
    import chasterLogo from "$lib/resources/logo.png"
    import subLockEffect from "$lib/resources/schemas/sub-lockEffect.json";
    import subLockEffects from "$lib/resources/schemas/sub-lockEffects.json";
    import subPenaltyData from "$lib/resources/schemas/sub-penaltyData.json";
    import schemaConfigs from "$lib/resources/schemas/schema-configs.json";
    import InputCheckbox from "$lib/components/InputCheckbox.svelte";
    import * as JigsawPuzzles from "$lib/import/extension-jigsaw_puzzles";
    import JigsawPuzzle from "$lib/components/JigsawPuzzle.svelte";

    const data = { slug: "jigsaw_puzzles" } as const;
    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";

    let configDataStore: Writable<JigsawPuzzles.Config> = writable({ config: { jigsaws: [] }, base: { actions: {}, periodic: {}, events: {}, penalties: {} }});
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
            if(event.data.startsWith("[")) { return; }
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
            config: JigsawPuzzles.Config;
            custom: JigsawPuzzles.Custom;
        } = await configGetResponse.json();
        handlebarText = configData.config.handlebar ?? "";
        delete configData.config.handlebar;
        configDataStore.set(configData.config);
        configText = JSON.stringify($configDataStore);
        customDataStore.set(configData.custom || {});
        customText = JSON.stringify($customDataStore);

        initialLoadMessage = "";
    });

    const validator = new Validator();
    validator.addSchema(subLockEffect, "/lockEffect")
    validator.addSchema(subLockEffects, "/lockEffects")
    validator.addSchema(subPenaltyData, "/penaltyData")

    // let configJSONInvalid = false;
    // $: {
    //     configText;
    //     configJSONInvalid = true;
    //     try {
    //         $configDataStore = JSON.parse(configText);
    //         const result = validator.validate($configDataStore, schemaConfigs[data.slug]["config"]);
    //         configJSONInvalid = !result.valid;
    //         if(result.errors.length > 0) { console.log(result.errors) } 
    //     } catch(_) {}
    // }

    // let customJSONInvalid = false;
    // $: {
    //     customText;
    //     customJSONInvalid = true;
    //     try {
    //         $customDataStore = JSON.parse(customText);
    //         const result = validator.validate($customDataStore, schemaConfigs[data.slug]["custom"]);
    //         customJSONInvalid = !result.valid;
    //         if(result.errors.length > 0) { console.log(result.errors) } 
    //     } catch(_) {}
    // }

    let rotations = [0, 15, 30, 45, 60, 90, 180]
    function updateRotation(index: number, diff: number) {
        const currentRotation = $configDataStore.config.jigsaws[index].settings.rotation;
        const currentRotationIndex = rotations.indexOf(currentRotation);
        if(currentRotationIndex === -1) { return; }

        let newRotationIndex = currentRotationIndex + diff;
        if(newRotationIndex >= rotations.length) { newRotationIndex -= rotations.length; }
        else if(newRotationIndex < 0) { newRotationIndex += rotations.length; }

        const newRotation = rotations[newRotationIndex];
        $configDataStore.config.jigsaws[index].settings.rotation = newRotation;
    }
    function deletePuzzle(index: number) {
        $configDataStore.config.jigsaws.splice(index, 1);
        $configDataStore.config.jigsaws = $configDataStore.config.jigsaws;
    }
    function addPuzzle() {
        $configDataStore.config.jigsaws.push({
            display: "",
            imageURL: "",
            rowColsRatio: [0, 0, 0],
            targetPieces: undefined,
            settings: {
                rotation: 0,
                allowGhost: false,
                allowEdge: false
            }
        });
        $configDataStore.config.jigsaws = $configDataStore.config.jigsaws;
    }
    function copyConfig() {
        navigator.clipboard.writeText(JSON.stringify($configDataStore))
    }
    async function pasteConfig() {
        try {
            const parsed = JSON.parse(await navigator.clipboard.readText());
            $configDataStore = parsed;
        } catch(err) {
            alert("Invalid JSON specified!");
        }
    }
</script>

<div class="container-bg w-full h-screen pl-3 pr-3 mt-2 overflow-y-auto">
    {#if initialLoadMessage !== ""}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 mb-3 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else}
        <div class="w-full flex flex-col overflow-y-auto">
            <div>Jigsaw Puzzles</div>
            <div class="caption">Configure jigsaw puzzles from images</div>
            <div class="w-full flex flex-col space-y-[0.5em] my-[0.5em]">
                {#each $configDataStore.config.jigsaws as jigsawData, index}
                    <div class="flex flex-col card-content p-3 w-full space-y-[0.5em]">
                        <div class="w-full flex flex-row space-x-[1em] items-stretch">
                            <div class="flex flex-col w-full max-w-[32em] space-y-[0.5em]">
                                <div class="flex flex-row space-x-[0.5em]">
                                    <input class="form-control"
                                        class:is-invalid={jigsawData.display.length === 0} 
                                        placeholder="Puzzle Name"
                                        bind:value={jigsawData.display} />
                                    <input min="1" max="1000" type="number" 
                                        class="!w-[5em] form-control" 
                                        class:is-invalid={!jigsawData.targetPieces || jigsawData.targetPieces < 2
                                            || Number.isInteger(jigsawData.targetPieces) === false}
                                        bind:value={jigsawData.targetPieces}
                                        placeholder="Pieces"/>
                                </div>
                                <input class="form-control w-full"
                                    class:is-invalid={jigsawData.imageURL.length === 0} 
                                    placeholder="Image URL (imgbox.com)"
                                    bind:value={jigsawData.imageURL} />
                            </div>
                            <div class="grow !m-0" />
                            <div class="flex flex-col space-y-[0.45em]">
                                <InputCheckbox display="Ghosting Allowed"
                                    bind:value={jigsawData.settings.allowGhost} />
                                <InputCheckbox display="Show Edge Allowed" 
                                    bind:value={jigsawData.settings.allowEdge} />
                                <div class="flex flex-row items-center">
                                    <div>Rotation</div>
                                    <div class="ml-[0.5em] mr-[0.25em]">=</div>
                                    <button class="mx-[0.25em]"
                                        on:click={() => { updateRotation(index, -1) }}>
                                        <i class="text-sm fas fa-chevron-left" />
                                    </button>
                                    <div class="mx-[0.25em] w-[5em] text-center">
                                        {#if jigsawData.settings.rotation !== 0}
                                            {jigsawData.settings.rotation}°
                                        {:else}
                                            Disabled
                                        {/if}
                                    </div>
                                    <button class="px-[0.25em]"
                                        on:click={() => { updateRotation(index, 1) }}>
                                        <i class="text-sm fas fa-chevron-right" />
                                    </button>
                                </div>
                            </div>
                            <div class="grow !m-0" />
                            <div class="flex flex-col items-center justify-center">
                                <button on:click={() => { deletePuzzle(index) }}>
                                    <i class="fal fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="w-full flex flex-row items-center justify-around mt-[0.5em] mb-[2em]">
                <button type="button" class="btn btn-primary"
                    on:click={() => { copyConfig() }}>
                    <i class="fas fa-plus text-sm mr-[0.125em]"></i>
                    Copy Config
                </button>
                <button type="button" class="btn btn-primary"
                    on:click={() => { addPuzzle() }}>
                    <i class="fas fa-plus text-sm mr-[0.125em]"></i>
                    Add a puzzle
                </button>
                <button type="button" class="btn btn-primary"
                    on:click={() => { pasteConfig() }}>
                    <i class="fas fa-plus text-sm mr-[0.125em]"></i>
                    Paste Config
                </button>
            </div>
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