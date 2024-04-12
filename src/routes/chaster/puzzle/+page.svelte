<script lang="ts">
    import { onMount } from "svelte";
    import TestImage from "$lib/resources/test2.png"
    import { elapsedTimestampStore, JigsawInstance } from "$lib/scripts/puzzle";
    import type { JigsawSaveData } from "$lib/scripts/signature-puzzle";
    import JigsawPuzzle from "$lib/components/JigsawPuzzle.svelte";

    const completed = async (encrypted: string) => {
        alert("woo")
    }
</script>
  
<div class="w-full flex flex-col items-stretch margin-0 min-h-full m-[2em] border-2 border-slate-500">
    <JigsawPuzzle jigsawConfig={{ imageURL: TestImage, rowColsRatio: [3, 2, 3955 / 2804], settings: { ghost: false, edge: false } }}
        callbackCompleted={completed} />
</div>