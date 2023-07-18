<script lang="ts">
    import chasterLogo from "$lib/images/logo.png"
    import type { ChasterCustomConfig_WeightedDice, ChasterTrimmedExtensionSession, WeightedDiceRollResponse } from "$lib/scripts/backend";
    import { generateTimeString, randomInt, sleep } from "$lib/scripts/utility";
    import { onMount } from "svelte";

    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const tokenSessionGetURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/token-session-get";
    const weightedRuntimeRollURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/weighted-runtime-roll";

    let mainToken = "";
    let extensionSessionData: ChasterTrimmedExtensionSession<ChasterCustomConfig_WeightedDice>;
    let initialLoadMessage: string = "Loading extension data...";
    let timeDifference: number = 0; // Resulting time difference in minutes
    let constructedAlertString = "";
    let nextActionText = "";
    let midRoll = false;

    // Initialize random 'starting' dice value if no previous within storage
    let diceValues: [number, number] = [randomInt(1, 6), randomInt(1, 6)]; 

    onMount(async function() {
        // Set previous dice roll if history exists within local storage
        const previousDiceRoll = localStorage.getItem("weighted-dice_roll");
        if(previousDiceRoll !== null) { // Previous dice roll within storage, display this instead
            diceValues = previousDiceRoll.split("").map(v => parseInt(v)) as [number, number];
        }

        // Retrieve main token from page URL
        const hash = window.location.hash.substring(1);
        if(hash !== "") {
            const params = JSON.parse(decodeURIComponent(hash));
            mainToken = params.mainToken;
        }

        // Retrieve current session data given main token
        const extensionSessionResponse = await fetch(tokenSessionGetURL, 
                { method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
                body: JSON.stringify({ mainToken: mainToken }),
            });
        if(extensionSessionResponse.status !== 200) {
            console.error(`Error retrieving session data: ${await extensionSessionResponse.text()}`);
            return;
        }
        extensionSessionData = await extensionSessionResponse.json();

        // Check whether action is available based on nextActionDate
        if(extensionSessionData.regular.nextActionDate !== undefined && extensionSessionData.role === "wearer") { // undefined or null?
            await startTimerCountdown();
        }

        initialLoadMessage = "";
    });

    let countdownInterval = -1;
    function generateNextAction(nextActionTimeS: number) {
        // Create countdown string every second
        const currentTimeS = Math.floor(new Date().getTime() / 1000);
        if(currentTimeS <= 0) { 
            clearInterval(countdownInterval); 
            nextActionText = "";
            countdownInterval = -1;
        } else {
            const timeString = generateTimeString(nextActionTimeS - currentTimeS, true);
            nextActionText = `Next action in ${timeString}`;
        }
    }

    function startTimerCountdown() {
        // Just in case, don't countdown if keyholder
        if(extensionSessionData.role === "keyholder") { return; }
        // Action not available, disable roll and set interval
        if(extensionSessionData.regular.nextActionDate === null
            || extensionSessionData.regular.nbActionsRemaining === -1) { return; }
        if(countdownInterval === -1) {
            const currentTimeS = Math.floor(new Date().getTime() / 1000);
            const nextActionTimeS = Math.floor(new Date(extensionSessionData.regular.nextActionDate as string).getTime() / 1000);
            if(currentTimeS - nextActionTimeS < 0) {
                generateNextAction(nextActionTimeS);
                countdownInterval = setInterval(generateNextAction, 1000, nextActionTimeS);
            }
        }
    }

    async function rollDice() {
        midRoll = true;

        // Continuously scramble dice values every 100ms until finished
        const scrambleInterval = setInterval(() => {
            diceValues = [randomInt(1, 6), randomInt(1, 6)];
        }, 100);

        // Transmit weighted dice roll request and wait for result
        const rollDiceResponse = await fetch(weightedRuntimeRollURL, {
            method: "POST", headers: { 
                "Authorization": `Bearer ${anonKey}`,
            },
            body: JSON.stringify({ mainToken: mainToken }),
        });
        if(rollDiceResponse.status !== 200) {
            console.error(`Error rolling dice: ${await rollDiceResponse.text()}`);
            return;
        }
        const [rollResults, rollTimeDifference, nextActionDate]: WeightedDiceRollResponse = await rollDiceResponse.json();
        localStorage.setItem("weighted-dice_roll", rollResults.join(""));

        // Stop scrambling, show dice result, and show time difference
        clearInterval(scrambleInterval);
        diceValues = rollResults;
        timeDifference = rollTimeDifference;
        constructedAlertString = timeDifference === 0
            ? "Draw!" : (timeDifference > 0 ? "Added " : "Removed ")
                + generateTimeString(Math.abs(timeDifference)) + "!";
        if(extensionSessionData.role === "wearer") {
            extensionSessionData.regular.nextActionDate = nextActionDate;
            startTimerCountdown();
        }

        midRoll = false;
    }

    function closeAlert() { constructedAlertString = ""; }
</script>

<div class="container-bg w-full h-screen pl-4 pr-4">
    {#if initialLoadMessage !== ""}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else}
        <div class="dice-container-row">
            <div class="dice-container">
                <div class="DiceExtension card-content flex flex-col items-center">
                    <div class="flex flex-row justify-between w-full">
                        <div class="flex flex-col">
                            <h4 class="w-full">Roll the dice</h4>
                            <p class="caption">
                                If you score lower than the bot, time will be added. If you do better, time will be removed.
                                <br>
                                Though, upon first glance these dice seem somewhat... unnatural. Still feeling lucky?
                            </p>
                        </div>
                        <span class="caption">Developer: @strawberria</span>
                    </div>
                    <div class="dices w-full">
                        <div class="dice-col">
                            <div class="DiceFace">
                                <div class="dice" data-side={diceValues[0]} style="background-color: #f7dcda">
                                    {#each { length: diceValues[0] } as _, __}
                                        <span class="dot"></span>
                                    {/each}
                                </div>
                            </div>
                            <div class="mt-2">You</div>
                        </div>
                        <div class="dice-col">
                            <div class="DiceFace">
                                <div class="dice" data-side={diceValues[1]} style="background-color: #f7dcda">
                                    {#each { length: diceValues[1] } as _, __}
                                        <span class="dot"></span>
                                    {/each}
                                </div>
                            </div>
                            <div class="mt-2">The bot</div>
                        </div>
                    </div>
                    <div class="mt-4 w-full" class:hidden={constructedAlertString === ""}>
                        <div role="alert" class="alert alert-dismissible"
                            class:alert-success={timeDifference <= 0}
                            class:alert-danger={timeDifference > 0}>
                            <button type="button" class="close" on:click={closeAlert}>
                                <span aria-hidden="true">×</span>
                                <span class="sr-only">Close alert</span>
                            </button>
                            <span>{constructedAlertString}</span>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="button" class="mb-2 btn btn-primary"
                            disabled={midRoll || nextActionText !== ""}
                            on:click={rollDice}>
                            Roll the dice
                        </button>
                    </div>
                    {#if nextActionText !== ""}
                        <div>{nextActionText}</div>
                    {/if}
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