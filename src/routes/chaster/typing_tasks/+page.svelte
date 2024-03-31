<script lang="ts">
    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import chasterLogo from "$lib/resources/logo.png"
    import type { BackendResponseSignature } from '$lib/scripts/signature-backend';
    import type { TypingTasksConfig_User } from "$lib/scripts/signature-typing_tasks";
    import { chineseWhisper, generateTimeString, randomInt } from "$lib/scripts/utility";

    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const chasterUtilitiesURL = "https://bpnjlbjpcfebqpaqkphy.supabase.co/functions/v1/chaster_utilities";
    
    let initialLoadMessage: string = "Loading extension data...";

    let mainToken = "";
    let selectedTaskIDStore: Writable<string | undefined> = writable(undefined);
    let typingTasksConfigStore: Writable<TypingTasksConfig_User> = writable({"tasks": {}});
    // let extendedWheelCustomStore: Writable<TypingTasksCustom> = writable({});

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

        // Retrieve typing tasks data
        const tasksMainResponse = await fetch(chasterUtilitiesURL, {
            method: "POST", headers: { "Authorization": `Bearer ${anonKey}` },
            body: JSON.stringify({ 
                action: "typing_tasks-page",
                mainToken: mainToken,
            })
        });
        if(tasksMainResponse.status !== 200) {
            console.error(`Error retrieving session data: ${await tasksMainResponse.text()}`);
            throw new Error("error retrieving session data");
        }
        const tasksMainData: BackendResponseSignature["chaster_utilities"]["typing_tasks-page"] 
            = await tasksMainResponse.json();
        $typingTasksConfigStore = tasksMainData.config;

        initialLoadMessage = "";
    });

    // Handle task selection and initialize statistics
    let currentPhraseIndex = 0;
    let linesHistory: [string, string][] = []; // Current phrase, wrong character
    let started = false; let timesCorrect = 0; let timesMistake = 0;
    let sinceLastKeystrokeMS = 0; let lastKeystrokeMS = 0; 
    let charactersPerMinute = 0; let startingTimeMS = 0; let totalTimeMS = 0;
    let currentTypedLine = ""; let characterCount = 0; 
    selectedTaskIDStore.subscribe(selectedTaskID => {
        currentPhraseIndex = selectedTaskID !== undefined
            ? randomInt(0, $typingTasksConfigStore.tasks[selectedTaskID].phrases.length) : 0;
        linesHistory = [];
        started = false; timesCorrect = 0; timesMistake = 0;
        sinceLastKeystrokeMS = 0; lastKeystrokeMS = 0; 
        charactersPerMinute = 0; startingTimeMS = 0; totalTimeMS = 0;
        currentTypedLine = ""; characterCount = 0;
    });

    // Mistake, interruption, and extra information
    let bottomDiv: HTMLDivElement;
    let mistake = false;
    let delayed = false;
    let extra = 0;
    let finished = false;

    // Handle type event, checking whether the typed character is correct
    function handleKeypress(key: string) {
        // Return if task isn't selected
        if($selectedTaskIDStore === undefined || finished === true) {
            return;
        }
        const selectedTaskData = $typingTasksConfigStore.tasks[$selectedTaskIDStore];

        // Check whether typed data is EN-US characters
        const keyCode = key.charCodeAt(0);
        if(key.length > 1 || keyCode < 32 || keyCode > 126
            || mistake === true) {
            return;
        } 

        lastKeystrokeMS = new Date().getTime();

        // Check whether character matches that of current phrase
        const currentPhrase = selectedTaskData.phrases[currentPhraseIndex]
        if(currentPhrase.charAt(currentTypedLine.length) === key) {
            // Valid input, check whether end of phrase has been reached
            currentTypedLine += key;
            if(currentTypedLine.length === currentPhrase.length) {
                // End of phrase: increment times, reset char index, append line history, 
                // reset line, choose new phrase
                timesCorrect++;
                linesHistory.push([currentTypedLine, ""]);
                linesHistory = linesHistory;
                currentTypedLine = "";
                currentPhraseIndex = randomInt(0, selectedTaskData.phrases.length);

                // If done with phrases to type, then quit
                if(timesCorrect === selectedTaskData.settings.times + extra) {
                    finished = true;
                    alert("Finished!");
                }
            }
            characterCount++;
        } else {
            // Append line history and reset phrase
            linesHistory.push([currentTypedLine, key !== " " ? key : "☐"]);
            linesHistory = linesHistory;
            currentTypedLine = "";
            timesMistake++;

            // If chinese whisper is enabled, randomize character in string
            if(selectedTaskData.settings.chinese === true) {
                selectedTaskData.phrases[currentPhraseIndex] = chineseWhisper(selectedTaskData.phrases[currentPhraseIndex]);
                $typingTasksConfigStore = $typingTasksConfigStore;
            }

            // Set mistake and untoggle after 2 seconds
            mistake = true;
            extra += selectedTaskData.settings.extra;
            setTimeout(() => { 
                mistake = false; 
                // Don't let delay affect stats?
                lastKeystrokeMS = new Date().getTime();
            }, 1000);
        }

        // Begin the characters per minute calculation if not already
        if(started === false) {
            startingTimeMS = new Date().getTime();
            setInterval(() => {
                // Recalculate statistics
                const currentTimeMS = new Date().getTime();
                const minutes = (currentTimeMS - startingTimeMS) / 60000;
                charactersPerMinute = Math.floor(characterCount / minutes);
                sinceLastKeystrokeMS = currentTimeMS - lastKeystrokeMS;
                totalTimeMS = currentTimeMS - startingTimeMS;

                if(delayed === false && sinceLastKeystrokeMS > selectedTaskData.settings.delayMS) {
                    delayed = true;
                    extra += selectedTaskData.settings.extra;
                    setTimeout(() => { delayed = false; }, 1000);
                }
            }, 25);
            started = true;
        }

        try { bottomDiv.scrollIntoView({ behavior: "smooth"}); } catch(err) {}
    }

    onMount(() => {
        document.addEventListener("keypress", (event) => {
            handleKeypress(event.key);
        });
    })
</script>

<svelte:window />
<!-- Note: p-4 moved inside -->
<div class="container-bg min-w-0 min-h-0 space-y-2 grow">
    {#if initialLoadMessage !== ""}
        <!-- While extension data is loading, show Chaster logo -->
        <div class="w-full h-screen flex flex-col items-center justify-center p-4">
            <img src={chasterLogo} alt="Chaster logo">
            <div class="mt-4 caption text-lg">{initialLoadMessage}</div>
        </div>
    {:else if $selectedTaskIDStore === undefined}
        <div class="flex flex-col space-y-[1.5em] w-[65.5em] p-4">
            <div class="card-content card-wrapper-desktop">
                <div class="flex items-end justify-between mb-2 flex-row space-x-1">
                        <h4 class="mb-0">[🍓] Typing Tasks</h4>
                        <span class="caption">Developer: <a href="https://chaster.app/user/strawberria" target="_blank">@strawberria</a></span>
                    </div>
                <div class="caption">
                    Devious typing tasks with numerous hidden features, sure to keep your fingers busy! <br>
                    Somewhat similar to <a href="https://writeforme.org/" target="_blank">writeforme</a>, but with some additional features!
                </div>
            </div>
            <div class="grid gap-[1.5em] grid-cols-1">
                {#each Object.entries($typingTasksConfigStore.tasks) as [taskID, taskData]}
                    <div class="card-content flex flex-col space-y-[0.5em] w-[32em]">
                        <div class="flex flex-row space-x-[1em] items-center">
                            <div class="flex flex-col">
                                <h5 class="mb-[0.25em]">{taskData.display}</h5>
                                {#if taskData.note !== undefined}
                                    <div class="caption">{taskData.note}</div>
                                {/if}
                            </div>
                            <div class="grow" />
                            <a target="_blank" class="btn btn-outline-primary"
                                on:click={() => {$selectedTaskIDStore = taskID}}>Begin</a>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        {@const selectedTaskData = $typingTasksConfigStore.tasks[$selectedTaskIDStore]}
        <div class="w-full h-full grid">
            <div class="w-full h-full flex flex-col items-center overlay p-4">
                <div class="flex flex-col h-full p-4 space-y-[0.5em]"
                    style="width: min(100%, 64em)">
                    <div class="font-medium text-left text-xl pl-[0.5em]">
                        Your currently assigned line ...
                    </div>
                    <div class="shrink bg-card p-[0.75em] !sticky top-0">
                        {selectedTaskData.phrases[currentPhraseIndex]}
                    </div>
                    <div class="font-medium text-right text-xl pr-[0.5em] !mb-[1em]">
                        <div>
                            {#if selectedTaskData.settings.hidden}
                                ... until your assignment is complete.
                            {:else}
                                ... in total, {selectedTaskData.settings.times} times correctly.
                            {/if}
                        </div>
                    </div>
                    <div class="font-semibold bg-darker">
                        {#if started === false}
                            <div class="font-semibold bg-darker p-[0.675em] text-2xl text-center text-red-500">
                                Start typing to begin...
                            </div>
                        {:else}
                            <div class="w-full h-full items-stretch whitespace-pre">
                                <div class="flex flex-col space-y-[0.5em] p-[1.25em]"
                                    style="overflow-wrap: break-word">
                                    {#each linesHistory as lineHistory}
                                        <div class="flex flex-row">
                                            <span>{lineHistory[0]}</span>
                                            {#if lineHistory[1].length > 0}
                                                <span class="underline"
                                                    style="color: #ef4444">
                                                    {lineHistory[1]}
                                                </span>
                                            {:else}
                                                <span class="ml-[0.25em]">
                                                    ✔️
                                                </span>
                                            {/if}
                                        </div>
                                    {/each}
                                    <div class="blink-cursor"
                                        class:no-gap={currentTypedLine.length === 0}>
                                        <div class="max-w-full min-h-[1.5em] relative"
                                            style="color: #bbbcc9">
                                            {currentTypedLine}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                    <div class="flex flex-row space-x-[1.5em] w-full justify-center !mt-[1em]">
                        <div class="flex flex-col items-end">
                            <div>Lines Remaining</div>
                            <div>Lines Completed</div>
                            <div>Mistakes</div>
                            <div>Total time</div>
                            <div>Since last keystroke</div>
                            <div>Characters per minute</div>
                        </div>
                        <div class="flex flex-col items-start w-[12em]"
                            style="color: #ef4444">
                            <div>{selectedTaskData.settings.hidden ? "???" : selectedTaskData.settings.times - timesCorrect + extra}</div>
                            <div>{timesCorrect}</div>
                            <div>{timesMistake}</div>
                            <div>{generateTimeString(Math.floor(totalTimeMS / 1000), true)}</div>
                            <div>{generateTimeString(Math.floor(sinceLastKeystrokeMS / 1000), true)}</div>
                            <div>{charactersPerMinute}</div>
                        </div>
                    </div>
                    <div bind:this={bottomDiv} />
                </div>
            </div>
            <div class="w-full h-full flex flex-col items-center justify-center overlay z-10"
                class:bg-darker={mistake}>
                <svg class="fade-in opacity-0"
                    class:fade-in={mistake} 
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlns:xlink="http://www.w3.org/1999/xlink" 
                    fill="#ef4444" height="16em" width="16em" version="1.1" id="Capa_1" viewBox="0 0 460.775 460.775" xml:space="preserve">
                    <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
                </svg>
            </div>
        </div>
    {/if}
</div>  

<!--
<div class="w-full h-screen grid">
    <div class="w-full h-full flex flex-col items-center overlay">
        <div class="flex flex-col h-full p-4 space-y-[0.5em]"
            style="width: min(100%, 64em)">
            <div class="font-medium text-left text-xl pl-[0.5em]">
                Your currently assigned line ...
            </div>
            <div class="shrink bg-card p-[0.75em] !sticky top-0">
                {phrases[currentPhraseIndex]}
            </div>
            <div class="shrink bg-card p-[0.75em]"
                bind:this={assignedLineDiv}>
                {phrases[currentPhraseIndex]}
            </div>
            <div class="font-medium text-right text-xl pr-[0.5em] !mb-[1em]">
                <div>
                    {#if settings.hidden}
                        ... until your assignment is complete.
                    {:else}
                        ... in total, {timesRequired} times correctly.
                    {/if}
                </div>
            </div>
            <div class="font-semibold bg-darker">
                <input class="w-full h-full cursor-default opacity-0 grid-1 z-10 absolute" 
                    type="text" 
                    on:input={typeEvent}
                    autofocus />
                {#if started === false}
                    <div class="font-semibold bg-darker p-[0.675em] text-2xl text-center text-red-500">
                        Start typing to begin...
                    </div>
                {:else}
                    <div class="w-full h-full items-stretch whitespace-pre">
                        <div class="flex flex-col space-y-[0.5em] p-[1.25em]"
                            style="overflow-wrap: break-word">
                            {#each linesHistory as lineHistory}
                                <div class="flex flex-row">
                                    <span>{lineHistory[0]}</span>
                                    {#if lineHistory[1].length > 0}
                                        <span class="underline"
                                            style="color: #ef4444">
                                            {lineHistory[1]}
                                        </span>
                                    {:else}
                                        <span class="ml-[0.25em]">
                                            ✔️
                                        </span>
                                    {/if}
                                </div>
                            {/each}
                            <div class="blink-cursor"
                                class:no-gap={currentTypedLine.length === 0}>
                                <div class="max-w-full min-h-[1.5em] relative"
                                    style="color: #bbbcc9">
                                    {currentTypedLine}
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            <div class="flex flex-row space-x-[1.5em] w-full justify-center !mt-[1em]">
                <div class="flex flex-col items-end">
                    <div>Lines Remaining</div>
                    <div>Lines Completed</div>
                    <div>Mistakes</div>
                    <div>Total time</div>
                    <div>Since last keystroke</div>
                    <div>Characters per minute</div>
                </div>
                <div class="flex flex-col items-start w-[12em]"
                    style="color: #ef4444">
                    <div>{settings.hidden ? "???" : timesRequired - timesCorrect}</div>
                    <div>{timesCorrect}</div>
                    <div>{timesMistake}</div>
                    <div>{generateTimeString(totalTimeS, true)}</div>
                    <div>{generateTimeString(sinceLastKeystrokeS, true)}</div>
                    <div>{charactersPerMinute}</div>
                </div>
            </div>
            <div bind:this={bottomDiv} />
        </div>
    </div>
    <div class="w-full h-full flex flex-col items-center justify-center overlay z-10"
        class:bg-darker={mistake}>
        <svg class="fade-in opacity-0"
            class:fade-in={mistake} 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            fill="#ef4444" height="16em" width="16em" version="1.1" id="Capa_1" viewBox="0 0 460.775 460.775" xml:space="preserve">
            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
        </svg>
    </div>
</div>
-->

<style>
    :global(html) {
        scrollbar-gutter: unset !important;
    }

    .container-bg {
        background-color: #272533;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .overlay {
        grid-area: 1 / 1;
    }

    :global(.bg-card) {
        background-color: #343241;
    }

    :global(.bg-darker) {
        background-color: #1f1d2b;
    }

    .blink-cursor:last-child {
        display: flex;
        min-width: 0px;
        gap: 2px;
    }
    .no-gap:last-child {
        gap: 0px !important;
    }
    .blink-cursor:last-child::after {
        content: "";
        width: 3px;
        height: 22px;
        background: #b91c1c;
        display: inline-block;
        /* animation: cursor-blink 1.5s steps(2) infinite; */
    }

    @keyframes cursor-blink {
        0% {
            opacity: 0;
        }
    }

    .fade-in {
        opacity: 1;
        transition: opacity 0.2s;
    }
</style>