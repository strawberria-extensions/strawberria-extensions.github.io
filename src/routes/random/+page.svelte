<script lang="ts">
    import { randomInt } from "$lib/scripts/utility";
    import { onMount } from "svelte";

    const clipRange = [30, 120];

    let directoryInput: HTMLInputElement;
    let videoBlobs: { [filename: string]: string } = {};
    function updateVideoURLs() {
        if(!directoryInput?.files) { return; }
        videoBlobs = Array.from(directoryInput.files)
            .filter(file => file.type === "video/mp4")
            .reduce((existing, file) => { existing[file.name] = URL.createObjectURL(file); return existing; }, ({} as any));
        randomizeVideo();   
    }

    let videoElement: HTMLVideoElement;
    let currentName: string | undefined = undefined;
    let currentSrc: string | undefined = undefined;
    function randomizeVideo() {
        const randomVideoIndex = randomInt(0, Object.keys(videoBlobs).length);
        const randomVideoName = Object.keys(videoBlobs)[randomVideoIndex];
        currentName = randomVideoName;
        console.log(currentName);
        currentSrc = videoBlobs[randomVideoName];
    }

    let timeout: any;
    onMount(() => {
        directoryInput.setAttribute("webkitdirectory", "");
        directoryInput.setAttribute("directory", "");
        videoElement.addEventListener("loadeddata", () => {
            const duration = videoElement.duration;
            const clipDuration = randomInt(clipRange[0], clipRange[1] + 1);
            const maxEnding = duration - clipDuration;
            const starting = randomInt(0, maxEnding);
            videoElement.currentTime = starting;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                randomizeVideo();
            }, clipDuration * 1000);
        });
    });
</script>

<input class="absolute p-2 z-100" bind:this={directoryInput} type="file" id="ctrl" multiple on:change={updateVideoURLs}/>
<video bind:this={videoElement} on:click={() => { randomizeVideo() } } 
    class="absolute inset-0 w-full h-full" class:hidden={currentSrc === undefined} src={currentSrc} autoplay />
