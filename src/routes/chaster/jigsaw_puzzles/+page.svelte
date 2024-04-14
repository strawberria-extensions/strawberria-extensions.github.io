<script lang="ts">
    import TestImage from "$lib/resources/test2.png"
    import JigsawPuzzle from "$lib/components/JigsawPuzzle.svelte";
    import type { JigsawSaveData } from "$lib/scripts/signature-puzzle";

    const encryptedImageURL = "ebf4b384605821f426129d839xNzZqVCr8kizzGAMumkOi0iM9mH8ktKwVBA9tYGLufkzTmBJ81dGR1mlA==";

    const completed = async (encrypted: string) => {
        // alert("woo")
    }
    const saved = async (saveData: JigsawSaveData) => {
        // alert("saved")
    }
</script>
  
<div class="w-full flex flex-col items-stretch margin-0 min-h-full m-[2em] border-2 border-slate-500">
    <JigsawPuzzle jigsawConfig={{ title: "Silver Wolf's Retribution", encryptedURL: encryptedImageURL, rowColsRatio: [9, 16, 3840 / 2160], 
        settings: { rotation: 360, ghost: false, edge: false } }}
        callbackCompleted={completed} callbackSaved={saved} />
</div>