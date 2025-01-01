<script lang="ts">
    import Countdown from "$lib/components/Countdown.svelte";

    export let extensionName: string = "[🍓] Extended Wheel of Fortune"

    let show: boolean = false;
</script>

<div class="absolute inset-0 flex items-center justify-center wrapper">
    <!-- The content of the window -->
    <!-- <button>test</button> -->
    <Countdown countdownToMS={1728193101000} />
</div>
<div class="absolute inset-0 overlay-tint z-20"
    class:overlay-tint-show={show}
    on:click={() => { show = !show }}>
    <!-- The tint when the side panel is opened -->
</div>
<div class="flex flex-row w-[24em] side-panel z-30"
    class:side-panel-show={show}>
    <div class="h-full w-[22em] flex flex-col items-center bg-[#343241] px-2 py-3">
        <div class="text-xl">{extensionName}</div>
    </div>
    <div class="mt-[4em] w-[2em] h-[2em] flex flex-col button-container
        items-center justify-center bg-[#343241] select-none cursor-pointer"
        on:click={() => { show = !show }}>
        <div class="panel-button"
            class:panel-button-show={show}>
            >
        </div>
    </div>
</div>
<!-- 
<div class="absolute inset-0 flex items-center justify-center wrapper z-10">
    test
    <button>test</button>
</div>
<div class="absolute inset-0 wrapper z-50 flex flex-row pointer-events-none test" 
    class:overlay={show}>
    <div class="min-h-full bg-[#343241] side-panel pointer-events-auto
        flex flex-col items-center p-2"
        class:w-96={show} class:w-0={!show}>
        <div class="text-xl">[🍓] Extended Wheel of Fortune</div>
    </div>
    <div class="mt-[1em] h-[2em] bg-[#343241] aspect-square pointer-events-auto"
        on:click={() => { show = !show }}>

    </div>
</div> -->

<style>
    .side-panel {
        transform: translate(-22em);
        transition: transform 0.3s ease-in-out
    }
    .side-panel-show {
        transform: translate(0) !important;
    }

    .button-container {
        border-radius: 0em 0.5em 0.5em 0em
    }

    .panel-button {
        transform: rotate(0deg);
        transition: transform 0.3s ease-in-out;
    }
    .panel-button-show {
        transform: rotate(180deg);
    }

    .overlay-tint {
        pointer-events: none;
        user-select: auto;
        background-color: rgba(0, 0, 0, 0);
        transition: background-color 0.3s ease-in-out;
    }
    .overlay-tint-show {
        pointer-events: auto !important;
        user-select: none !important;
        background-color: rgba(0, 0, 0, 0.4) !important;
    }

    .test {
        transform: translate(-20%)
    }
</style>