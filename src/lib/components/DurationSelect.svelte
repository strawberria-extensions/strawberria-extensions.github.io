<script lang="ts">
    import type { DurationSelectSettings, DurationMappings } from "./DurationSelect";

    const displayKeys: ("week" | "day" | "hour" | "minute" | "second")[]
        = ["week", "day", "hour", "minute", "second"];
    const multipliers = {
        "week": 7 * 24 * 60 * 60,
        "day": 24 * 60 * 60,
        "hour": 60 * 60,
        "minute": 60,
        "second": 1
    };
    let durationMappings: DurationMappings = {
        week: { tens: "0", ones: "0" },
        day: { tens: "0", ones: "0" },
        hour: { tens: "0", ones: "0" },
        minute: { tens: "0", ones: "0" },
        second: { tens: "0", ones: "0" },
    };

    export let seconds: number; // Seconds in current display
    export let settings: DurationSelectSettings;
    export let buttons: boolean = false;
    export let minSeconds: number = 1;

    // Whenever seconds changes, modify duration display
    $: {
        seconds;
        let remainingSeconds = seconds;
        for(const key of displayKeys) {
            const multiplier = multipliers[key];
            const value = Math.floor(remainingSeconds / multiplier);
            remainingSeconds -= value * multiplier;
            const [tens, ones] = `${value}`.padStart(2, "0").split("");
            durationMappings[key].tens = tens;
            durationMappings[key].ones = ones;
        }
    }

    // Update seconds with given difference unless it goes negative
    function updateSeconds(diff: number) {
        if(seconds + diff >= minSeconds) {
            seconds += diff;
        } else {
            seconds = minSeconds;
        }
    }
</script>

<div class="d-flex justify-content-center">
    <div class="DurationSelector" aria-label="Select a duration">
        <!-- Display selector and optional button for each -->
        {#each displayKeys as key}
            {@const keyMappings = durationMappings[key]}
            {@const keyMultiplier = multipliers[key]}
            {#if settings[key] === true}
                <div class="DurationSelectorItem duration-item small">
                    <!-- svelte-ignore a11y-no-interactive-element-to-noninteractive-role -->
                    <button role="presentation" aria-label={`Add ${key}`} type="button" class="sc-ikJzcn fJNrxx"
                        class:hidden={buttons === false}
                        on:click={() => { updateSeconds(keyMultiplier) }}>
                        <!-- <div class="duration-btn duration-plus" style="font-size: 1.25em; padding: 0.075em">
                            ⨁
                        </div> -->
                        <div class="duration-btn duration-plus">
                            <i class="fal fa-plus-circle"></i>
                        </div>
                    </button>
                    <div class="duration-digits">
                        <div class="duration-digit">{keyMappings.tens}</div>
                        <div class="duration-digit">{keyMappings.ones}</div>
                    </div>
                    <div class="duration-label">{key}</div>
                    <!-- svelte-ignore a11y-no-interactive-element-to-noninteractive-role -->
                    <button role="presentation" aria-label={`Remove ${key}`} type="button" class="sc-ikJzcn fJNrxx"
                        class:hidden={buttons === false}
                        on:click={() => { updateSeconds(-1 * keyMultiplier) }}>
                        <!-- <div class="duration-btn duration-minus" style="font-size: 1.25em; padding: 0.075em">
                            ⊖
                        </div> -->
                        <div class="duration-btn duration-minus">
                            <i class="fal fa-minus-circle"></i>
                        </div>
                    </button>
                </div>
            {/if}
        {/each}
    </div>
</div>