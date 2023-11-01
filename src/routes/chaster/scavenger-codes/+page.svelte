<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import chasterLogo from "$lib/resources/logo.png"
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { generateTimeString } from "$lib/scripts/utility";

    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";
    
    let nextActionDate: Date = new Date();
    let codeResult: "valid" | "invalid" | "used" | "regularity" | undefined = undefined;
    let codeInput: string = "";

    let mainToken = "";
    let initialLoadMessage: string = "Loading extension data...";

    let hash: string = "";
    onMount(async () => {
        // Retrieve main token from page URL
        hash = window.location.hash.substring(1).split("?")[0];
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if(hash !== "") {
            const params = JSON.parse(decodeURIComponent(hash));
            mainToken = params.mainToken;
        } else {
            // Check whether main token was moved to query params after OAuth
            const stateTokenData = urlParams.get("state");
            if(stateTokenData !== null) {
                const stateParams = JSON.parse(decodeURIComponent(stateTokenData));
                mainToken = stateParams.mainToken;
            }
        }

        // Retrieve current extension config using token
        const scavengerMainPageResponse = await fetch(chasterUtilitiesURL, 
            { method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "scavenger-main-page", 
                mainToken: mainToken 
            }),
        });
        if(scavengerMainPageResponse.status !== 200) {
            console.error(`Error retrieving page data: ${await scavengerMainPageResponse.text()}`);
            return;
        }
        const pageData: {
            nextActionDate: string;
        } = await scavengerMainPageResponse.json();
        nextActionDate = new Date(pageData.nextActionDate);
        const nextActionTimeS = nextActionDate.getTime() / 1000;
        generateNextAction(nextActionTimeS);
        countdownInterval = setInterval(generateNextAction, 1000, nextActionTimeS) as any;

        initialLoadMessage = "";
    });

    let processing = false;
    async function submitCode() {
        processing = true;

        const scavengerSubmitResponse = await fetch(chasterUtilitiesURL, 
            { method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "scavenger-main-submit", 
                mainToken: mainToken,
                code: codeInput
            }),
        });
        const scavengerSubmitData: {
            result: "valid" | "invalid" | "used" | "regularity",
            nextActionDate: string
        } = await scavengerSubmitResponse.json();
        codeResult = scavengerSubmitData.result;

        const nextActionDate = new Date(scavengerSubmitData.nextActionDate);
        if(new Date().getTime() < nextActionDate.getTime()) {
            const nextActionTimeS = nextActionDate.getTime() / 1000;
            generateNextAction(nextActionTimeS);
            countdownInterval = setInterval(generateNextAction, 1000, nextActionTimeS) as any;
        }

        processing = false;
    }

    let nextActionText = "";
    let countdownInterval = -1;
    function generateNextAction(nextActionTimeS: number) {
        // Create countdown string every second
        const currentTimeS = Math.floor(new Date().getTime() / 1000);
        if(nextActionTimeS - currentTimeS <= 1) { 
            clearInterval(countdownInterval); 
            nextActionText = "";
            countdownInterval = -1;
        } else {
            const timeString = generateTimeString(nextActionTimeS - currentTimeS, true);
            nextActionText = `Next action in ${timeString}`;
        }
    }
</script>

<div class="container-bg w-full h-screen p-4">
    {#if initialLoadMessage !== ""}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else}
        <div class="w-full h-full flex flex-col items-center justify-center">
            <div class="flex flex-col items-center card-content"
                style="width: 32em">
                <div class="flex flex-col items-center mb-[1em]">
                    <div class="text-4xl text-center font-bold">
                        Scavenger Codes
                    </div>
                    <div class="caption">
                        Developed by @strawberria
                    </div>
                </div>
                <div class="flex flex-col items-center w-full space-y-[0.25em] mb-[1.5em]">
                    <div class="text-lg text-center">Apply a scavenger code below!</div>
                    <input class="form-control text-center font-mono mb-[em]"
                        style="font-size: 160%; width: 12em"
                        bind:value={codeInput} />
                </div>
                <button type="button" class="btn btn-primary btn-lg mb-[0.5em]"
                    class:cursor-not-allowed={nextActionText !== "" || processing || codeInput.length === 0}
                    disabled={nextActionText !== "" || processing || codeInput.length === 0}
                    on:click={submitCode}>
                    <span>Submit</span>
                </button>
                <div class="space-y-[0.25em] w-full flex flex-col items-center"
                    style="min-height: 3.25em">
                    <div class="caption" 
                        style="min-height: 1.5em">
                        {nextActionText}
                    </div>
                    <div style="min-height: 1.5em" 
                        class:text-green-500={codeResult === "valid"}
                        class:text-red-500={codeResult === "invalid"}>
                        {#if codeResult === "valid"}
                            Code successfully applied!
                        {:else if codeResult === "invalid"}
                            Invalid code specified.
                        {:else if codeResult === "used"}
                            Code already used.
                        {:else if codeResult === "regularity"}
                            Error: regularity not yet elapsed
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .container-bg {
        background-color: #272533;
        position: absolute;
    }
</style>