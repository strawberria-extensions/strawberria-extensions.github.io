<script lang="ts">
    import { chineseWhisper, generateTimeString, randomInt } from "$lib/scripts/utility";
    import { onMount } from "svelte";

    // Phrase generation using Math.random, not seeded though
    let phrases = [
        "I'm a dumb puppy who deserves to stay denied and desperate.",
        "I'm a dumb kitten who deserves to be locked into a cage.",
    ];
    let currentPhraseIndex = randomInt(0, phrases.length);
    let timesRequired = 40;
    let settings = {
        hidden: true,  // Total lines hidden from wearer
        chinese: true, // Randomize a character every mistake
    };

    // History and current line progress
    let linesHistory: [string, string][] = [
        // ["I'm a dumb puppy who deserves to stay denied and desperate.",""],
        // ["Thank you Sir for keeping my needy pussy locked in chastity.",""],
        // ["Please Sir, keep me locked in chastity for as long as you desire!",""],
        // ["Please Sir, ","☐"],
    ];
    let started = false;
    let timesCorrect = 0;
    let timesMistake = 0;
    let currentTypedLine = "";

    // Statistics including number of characters per minute
    let characterCount = 0;
    let startingTimeMS = 0;
    let lastKeystrokeMS = 0;
    let charactersPerMinute = 0;
    let sinceLastKeystrokeS = 0;
    let totalTimeS = 0;

    // Mistake and interruption information
    let bottomDiv: HTMLDivElement;
    let mistake = false;

    // Handle type event, checking whether the typed character is correct
    function handleKeypress(key: string) {
        // Check whether typed data is EN-US characters
        const keyCode = key.charCodeAt(0);
        if(key.length > 1 || keyCode < 32 || keyCode > 126
            || mistake === true) {
            return;
        } 

        lastKeystrokeMS = new Date().getTime();

        // Check whether character matches that of current phrase
        const currentPhrase = phrases[currentPhraseIndex]
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
                currentPhraseIndex = randomInt(0, phrases.length);
            }
            characterCount++;
        } else {
            // Append line history and reset phrase
            linesHistory.push([currentTypedLine, key !== " " ? key : "☐"]);
            linesHistory = linesHistory;
            currentTypedLine = "";
            timesMistake++;

            // If chinese whisper is enabled, randomize character in string
            if(settings.chinese === true) {
                phrases[currentPhraseIndex] = chineseWhisper(phrases[currentPhraseIndex]);
                phrases = phrases;
            }

            // Set mistake and untoggle after 2 seconds
            mistake = true;
            setTimeout(() => { mistake = false; }, 1000);
        }

        // Begin the characters per minute calculation if not already
        if(started === false) {
            startingTimeMS = new Date().getTime();
            setInterval(() => {
                // Recalculate statistics
                const currentTimeMS = new Date().getTime();
                const minutes = (currentTimeMS - startingTimeMS) / 60000;
                charactersPerMinute = Math.floor(characterCount / minutes);
                sinceLastKeystrokeS = Math.floor((currentTimeMS - lastKeystrokeMS) / 1000);
                totalTimeS = Math.floor((currentTimeMS - startingTimeMS) / 1000);
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
            <!-- <div class="shrink bg-card p-[0.75em]"
                bind:this={assignedLineDiv}>
                {phrases[currentPhraseIndex]}
            </div> -->
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
                <!-- <input class="w-full h-full cursor-default opacity-0 grid-1 z-10 absolute" 
                    type="text" 
                    on:input={typeEvent}
                    autofocus /> -->
                {#if started === false}
                    <div class="font-semibold bg-darker p-[0.675em] text-2xl text-center text-red-500">
                        Start typing to begin...
                    </div>
                {:else}
                    <!-- Note: bug for long lines, won't overflow with flex center -->
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

<style>
    :global(html) {
        scrollbar-gutter: unset !important;
    }

    :global(body) {
        background-color: #272533;
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