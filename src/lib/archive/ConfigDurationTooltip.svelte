<script lang="ts">
    import { communicationStore } from "$lib/scripts/duration-tooltip";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import DurationSelect from "./DurationSelect.svelte";

    // Calculates tooltip location and whether it should be top > right > bottom > left
    let tooltipPlacementData: [number, number] = [0, 0];
    let arrowPlacementData: [number, number, number] = [0, 0, 0];
    function fixPlacementCenter() {
        // Tooltip based on center, arrow relative to tooltip bottom left
        if(!tooltipElement || !arrowElement || !currentActionElement) { return; }
        const tooltipRect = tooltipElement.getBoundingClientRect();
        tooltipPlacementData[0] -= tooltipRect.width / 2;
        tooltipPlacementData[1] -= tooltipRect.height / 2;
        // setTimeout(() => {
        //     if(!tooltipElement || !arrowElement || !currentActionElement) { return; }
        //     alert(`${JSON.stringify(getCenterCoords(currentActionElement))}, ${JSON.stringify(getCenterCoords(arrowElement))}, ${JSON.stringify(getCenterCoords(tooltipElement))}`)
        // }, 100)
    }
    function calculateTooltip() {
        // Get details about the current tooltip and outcome element
        if(!tooltipElement || !currentActionElement) { return; }
        const tooltipRect = tooltipElement.getBoundingClientRect();
        const arrowRect = arrowElement.getBoundingClientRect();
        const outcomeRectRaw = currentActionElement.getBoundingClientRect();
        const outcomeRectCoords = {
            "topMid": [(outcomeRectRaw.right + outcomeRectRaw.left) / 2, outcomeRectRaw.top],
            "rightMid": [outcomeRectRaw.right, (outcomeRectRaw.top + outcomeRectRaw.bottom) / 2],
            "bottomMid": [(outcomeRectRaw.right + outcomeRectRaw.left) / 2, outcomeRectRaw.bottom],
            "leftMid": [outcomeRectRaw.left, (outcomeRectRaw.top + outcomeRectRaw.bottom) / 2],
        };

        console.log("================================")

        // Determine whether the tooltip fits on the top with spare
        const topLeftMargin = outcomeRectCoords.topMid[0] - tooltipRect.width / 2;
        const topRightMargin = window.innerWidth - (outcomeRectCoords.topMid[0] + tooltipRect.width / 2);
        const topTopMargin = outcomeRectCoords.topMid[1] - tooltipRect.height - arrowRect.height;
        console.log("top-left/right/top", topLeftMargin, topRightMargin, topTopMargin)
        // if(false) {
        if(topTopMargin >= 0) {
            let xDiff = topLeftMargin < 0
                ? -1 * topLeftMargin : topRightMargin < 0
                ? -1 * topRightMargin : 0;

            tooltipPlacementData = [
                outcomeRectCoords.topMid[0] + xDiff, 
                outcomeRectCoords.topMid[1] - tooltipRect.height / 2 - arrowRect.height,
            ];
            arrowPlacementData = [
                tooltipRect.width / 2 - arrowRect.width / 2 + 1, 
                0, 
                0
            ];
            fixPlacementCenter();
            return;
        }

        // Determine whether the tooltip fits on the right with spare
        const rightTopMargin = outcomeRectCoords.rightMid[1] - tooltipRect.height / 2;
        const rightBottomMargin = window.innerHeight - (outcomeRectCoords.rightMid[1] + tooltipRect.height / 2);
        const rightRightMargin = window.innerWidth - (outcomeRectCoords.rightMid[0] + arrowRect.height + tooltipRect.width);
        console.log("right-top/bottom-right", rightTopMargin, rightBottomMargin, rightRightMargin)
        // if(false) {
        if(rightRightMargin >= 0) {
            let yDiff = rightTopMargin < 0
                ? -1 * rightTopMargin : rightBottomMargin < 0
                ? -1 * rightBottomMargin : 0;

            tooltipPlacementData = [
                outcomeRectCoords.rightMid[0] + tooltipRect.width / 2, 
                outcomeRectCoords.rightMid[1] + yDiff,
            ];
            arrowPlacementData = [
                0, 
                0 - tooltipRect.height / 2 - 7, 
                270
            ];
            fixPlacementCenter();
            return;
        }

        // Determine whether the tooltip fits on the bottom with spare
        const bottomLeftMargin = outcomeRectCoords.bottomMid[0] - tooltipRect.width / 2;
        const bottomRightMargin = window.innerWidth - (outcomeRectCoords.bottomMid[0] + tooltipRect.width / 2);
        const bottomBottomMargin = window.innerWidth - (outcomeRectCoords.bottomMid[1] + arrowRect.height + tooltipRect.height);
        console.log("bottom-left/right/bottom", bottomLeftMargin, bottomRightMargin, bottomBottomMargin)
        // if(false) {
        if(bottomBottomMargin >= 0) {
            let xDiff = bottomLeftMargin < 0
                ? -1 * bottomLeftMargin : bottomRightMargin < 0
                ? -1 * bottomRightMargin : 0;

            tooltipPlacementData = [
                outcomeRectCoords.bottomMid[0] + xDiff, 
                outcomeRectCoords.bottomMid[1] + tooltipRect.height / 2,
            ];
            arrowPlacementData = [
                tooltipRect.width / 2 - arrowRect.width / 2 - 1, 
                0, 
                180
            ];
            fixPlacementCenter();
            return;
        }

        // Determine whether the tooltip fits on the left with spare
        const leftTopMargin = outcomeRectCoords.leftMid[1] - tooltipRect.height / 2;
        const leftBottomMargin = window.innerHeight - (outcomeRectCoords.leftMid[1] + tooltipRect.height / 2);
        const leftLeftMargin = outcomeRectCoords.leftMid[0] - tooltipRect.width - arrowRect.height;
        console.log("left-top/bottom/left", leftTopMargin, leftBottomMargin, leftLeftMargin)
        // if(false) {
        if(leftLeftMargin >= 0) {
            let yDiff = leftTopMargin < 0
                ? -1 * leftTopMargin : leftBottomMargin < 0
                ? -1 * leftBottomMargin : 0;

            tooltipPlacementData = [
                outcomeRectCoords.leftMid[0] - arrowRect.height - tooltipRect.width / 2 + yDiff, 
                outcomeRectCoords.leftMid[1],
            ];
            arrowPlacementData = [
                0, 
                0 - tooltipRect.height / 2 - arrowRect.height + 1, 
                90
            ];
            fixPlacementCenter();
            return;
        }

        // Defaults... yeah.
        tooltipPlacementData = [0, 0];
        arrowPlacementData = [0, 0, 0];
    }

    let tooltipElement: HTMLElement;
    let arrowElement: HTMLElement;
    let currentActionElement = $communicationStore[0];
    let currentActionData = $communicationStore[1];
    let delayedShow: boolean = false;
    $: {
        currentActionElement;
        setTimeout(() => { 
            delayedShow = currentActionElement !== undefined 
                && currentActionElement !== null;
        }, 0);
    }

    communicationStore.subscribe((communicationData) => { 
        if(communicationData[2] === null) { return; }
        else if(communicationData[2] === "update") {
            // Check whether to toggle if outcome data matches
            // alert(`update: outcomeMatches=${communicationData[1] === currentActionData}`);
            if(communicationData[1] === currentActionData
                || (communicationData[1] !== null && currentActionData !== null
                    && communicationData[1][0] === currentActionData[0]
                    && communicationData[1][1] === currentActionData[1])) {
                // Toggle off tooltip
                currentActionElement = null;
                currentActionData = null;
            }
        } else if(communicationData[2] === "destroy") {
            // If outcome element or data matches, then set to null
            // alert(`destroy: outcomeMatches=${communicationData[1] === currentActionData}`);
            if(communicationData[1] === currentActionData
                || (communicationData[1] !== null && currentActionData !== null
                    && communicationData[1][0] === currentActionData[0]
                    && communicationData[1][1] === currentActionData[1])) {
                // Toggle off tooltip
                currentActionElement = null;
                currentActionData = null;
            }
        } else if(communicationData[2] === "click") {
            // Either move or toggle depending on whether element or data matches
            // alert(`click: outcomeMatches=${communicationData[1] === currentActionData}`);
            if(communicationData[1] === currentActionData
                || (communicationData[1] !== null && currentActionData !== null
                    && communicationData[1][0] === currentActionData[0]
                    && communicationData[1][1] === currentActionData[1])) {
                // Toggle off tooltip
                currentActionElement = null;
                currentActionData = null;
            } else {
                // Update outcome element and data, then render
                currentActionElement = communicationData[0];
                currentActionData = communicationData[1];
            }
        }
        setTimeout(() => { calculateTooltip() }, 0)
    });

    function handleClickCustom(event: Event) {
        if(!tooltipElement || !currentActionElement) { return; }
        const containsTooltip = tooltipElement.contains(event.target as any);
        const containsOutcome = currentActionElement.contains(event.target as any);
        if(containsTooltip === false && containsOutcome === false) {
            currentActionElement = null;
            currentActionData = null;
            calculateTooltip();
        }
    }

    onMount(() => {
        // window.addEventListener("resize", calculateTooltip);
        window.addEventListener("click", handleClickCustom) 
    })
    onDestroy(() => {
        // window.removeEventListener("resize", calculateTooltip);
        window.removeEventListener("click", handleClickCustom);
    });

    const dispatch = createEventDispatcher();
    $: {
        currentActionData;
        // calculateTooltip();
        dispatch("update");
    }
</script>

{#if currentActionData}
    <div class="absolute popover duration-centered"
        class:bs-popover-top={arrowPlacementData[2] === 0}
        class:bs-popover-right={arrowPlacementData[2] === 270}
        class:bs-popover-bottom={arrowPlacementData[2] === 180}
        class:bs-popover-left={arrowPlacementData[2] === 90}
        class:force-hidden={!currentActionElement || JSON.stringify(tooltipPlacementData) === "[0,0]" || delayedShow == false}
        style={`transform: translate(${tooltipPlacementData[0]}px, ${tooltipPlacementData[1]}px)`}
        bind:this={tooltipElement}>
        <div class="p-3" style="border-radius: 10px">
            Time to add
            <DurationSelect bind:seconds={currentActionData[0][0]}
                settings={{ week: false, day: true, hour: true, minute: true, second: true }}
                buttons={true} />
        </div>
        <div class="absolute arrow arrow-origin" 
            class:force-hidden={!currentActionElement || JSON.stringify(tooltipPlacementData) === "[0,0]"} 
            style={`transform: translate(${arrowPlacementData[0]}px, ${arrowPlacementData[1]}px)`}
            bind:this={arrowElement}>
        </div>
    </div>
{/if}

<style>
    .force-hidden {
        visibility: hidden !important;
    }

    .arrow-origin {
        transform-origin: center center;
        box-sizing:content-box;
    }
</style>