<script lang="ts">
    import tickAudioFile from "$lib/resources/tick.mp3";
    import wheelBgOverlayFile from "$lib/resources/wheel-bg-overlay.svg"
    import { Wheel } from '$lib/resources/spin-wheel.js';
    import type { ChasterCustomConfig_ExtendedWheel } from '$lib/scripts/backend';
    import { easeSinInOut } from 'd3-ease';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import WheelOutcome from "$lib/WheelOutcome.svelte";
    import { generateOutcomeActionLabel, truncateWords } from "$lib/scripts/utility";
    
    // Supabase anon key has no database access due to RLS
    const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmpsYmpwY2ZlYnFwYXFrcGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM0NTgsImV4cCI6MjAwNDExOTQ1OH0.CsGySz2c8bIWphE6--T51CsmSeBQajfwvBYfTkjviM4";
    const wheelColors: string[] = [ 
        // 200-darkness wheel colors from Tailwind CSS (for convenience)
        "#fecaca", "#fed7aa", "#fde68a", "#fef08a", "#d9f99d", "#bbf7d0",
        "#a7f3d0", "#99f6e4", "#a5f3fc", "#bae6fd", "#bfdbfe", "#c7d2fe",
        "#ddd6fe", "#e9d5ff", "#f5d0fe", "#fbcfe8", "#fecdd3"
    ];
    const tickAudios: HTMLAudioElement[] = Array(16).fill(0).map(_ => {
        const audio = new Audio(tickAudioFile);
        audio.volume = 0.6;
        return audio;
    }); let audioIndex = 0;
    
    let maintoken = "";
    // let extensionSessionData: ChasterTrimmedExtensionSession<ChasterCustomConfig_ExtendedWheel>;
    // let extensionCustomData: ChasterCustomData_ExtendedWheel;
    let extensionSessionConfigStore: Writable<ChasterCustomConfig_ExtendedWheel> = writable({ outcomes: [] });
    extensionSessionConfigStore.update(_ => {
        const data: ChasterCustomConfig_ExtendedWheel = { 
            outcomes: [
                { percentage: "5", text: "After spending an entire day stumbling through the forest, you find yourself exactly back where you started.", key: "add_time", params: [60 * 60 * 24] },
                { percentage: "10", text: "You make significant progress during your exploration, getting closer and closer to civilization.", key: "remove_time", params: [12 * 60 * 60] }
            ] 
        };
        data.outcomes.forEach(outcomeData => { outcomeData.label = generateOutcomeActionLabel(outcomeData); });
        return data;
    });

    // Wheel-related logic including spawning, etc.
    let wheelContainer: HTMLDivElement;
    let propsStore: Writable<any> = writable();
    let spinWheel: any;
    function spinTheWheel() {
        spinWheel.spinToItem(Math.floor(Math.random() * 14), 5000, false, 8, 1, easeSinInOut as any)
    }

    onMount(() => {
        propsStore.subscribe(() => { 
            const items = $extensionSessionConfigStore.outcomes.map(
                outcomeData => {
                    const label = outcomeData.label ?? "";
                    const truncatedLabel = [truncateWords(label, 24), label.length >= 32 ? "..." : ""].join("");
                    return { label: truncatedLabel };
                }
            );
            console.log(items)
            const wheelProps = {
                items: items,
                pointerAngle: 270,
                itemBackgroundColors: wheelColors,
                itemLabelRadiusMax: 0.3,
                itemLabelRadius: 0.825,
                itemLabelAlign: "left",
                itemLabelRotation: 180,
                isInteractive: false,
                borderWidth: 2,
                overlayImage: wheelBgOverlayFile,
            }
            
            // Initialize spinWheel if not already defined
            wheelContainer.innerHTML = "";
            spinWheel = new Wheel(wheelContainer, wheelProps);
            spinWheel.onCurrentIndexChange = () => { 
                audioIndex = (audioIndex + 1) < tickAudios.length
                    ? audioIndex + 1 : 0;
                tickAudios[audioIndex].play();
            }
        });
        // setTimeout(() => {
        //     $propsStore.items.push({ label: "four" });
        //     $propsStore = $propsStore;
        // }, 8000)
    });


    // Store widths and heights for determining layout
    let frameWidth: number; 
    let frameHeight: number;
    let wheelWidth: number;
    let pageContainer: HTMLDivElement;
    let emValue: number = 0;
    let necessaryWidth: number = 0;
    let shouldHorizontal = true;
    $: { pageContainer; if(pageContainer !== undefined) { 
        emValue = parseFloat(getComputedStyle(pageContainer).fontSize); 
        necessaryWidth = (wheelWidth * 2) + (4 * emValue * 4) + (4 * emValue + 4);
        shouldHorizontal = frameWidth > necessaryWidth;
    }}
</script>

<svelte:window bind:innerWidth={frameWidth} bind:innerHeight={frameHeight} />
<div class="container-bg min-w-0 min-h-0 p-4 space-y-2 grow" 
    bind:this={pageContainer}>
    <div class="card-wrapper card-content grow">
        <div class="w-full h-full flex flex-row">
            <div class="h-full flex flex-col" class:card-horizontal={shouldHorizontal}>
                <h4 class="w-full">Extended Wheel of Fortune</h4>
                <div class="caption mb-2">
                    Try your luck and spin the <b>extended</b> wheel of fortune! <br>
                    Now supporting additional actions and multiple wheels with individual cooldowns!
                </div>
                <div class="flex flex-col grow items-center">
                    <div class="aspect-square grow mt-1 wheel-container" 
                        bind:this={wheelContainer} bind:clientWidth={wheelWidth} />
                </div>
                <hr>
                <div class="w-full flex flex-row items-stretch space-x-4">
                    <div class="grow">
                        <div>Select</div>
                        <div class="caption mb-2">Choose which wheel to spin with</div>
                        <div class="w-full">
                            <select class="form-control">
                                <option value="add_time">Task Wheel</option>
                                <option value="freeze">Freeze</option>
                                <option value="pillory">Pillory</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center ml-6 mr-6">
                        <button type="button" class="btn btn-primary btn-lg"
                            on:click={spinTheWheel}>
                            <span>Spin the wheel!</span>
                        </button>
                    </div>
                </div>
                {#if !shouldHorizontal}
                    <hr>
                    <div>Outcomes</div>
                {/if}
            </div>
            {#if shouldHorizontal}
                <div class="h-full flex flex-col ml-4" style={`width: ${wheelWidth}px`}>
                    <div>Outcomes</div>
                    <div class="caption mb-2">
                        View possible outcomes for the wheel
                    </div>
                    {#if $extensionSessionConfigStore.outcomes.length > 0}
                        <div class="card-content outcomes-list flex flex-col space-y-1 items-stretch">
                            {#each $extensionSessionConfigStore.outcomes as outcomeData, index}
                                <WheelOutcome outcomeData={outcomeData} color={outcomeData.} />
                                {#if index !== $extensionSessionConfigStore.outcomes.length - 1}
                                    <hr class="mt-0.5 mb-0.5">
                                {/if}
                            {/each}
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
    <!-- <div class="card-wrapper card-content m-0" style={`width: ${cardWidth}px`}>
        <div>Wheel Outcomes</div>
    </div> -->
</div>

<style>
    .container-bg {
        background-color: #272533;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wheel-container {
        max-width: 36em;
    }

    .card-horizontal {
        padding-right: 2em;
        border-right: 1px solid black;
    }
    
    .outcomes-list {
        background-color: #3d3b4d;
        border-radius: 16px;
    }
</style>