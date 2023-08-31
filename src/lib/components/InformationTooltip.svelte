<script lang="ts">
    import { tippy } from 'svelte-tippy';
    import 'tippy.js/dist/tippy.css'; // optional

    let customClass: string = "";
    export let tooltip:   string;
    export let placement: "top" | "bottom" | "left" | "right" = "top";
    export { customClass as class }
</script>
  
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={`flex items-center cursor-help ${customClass}`}>
    <i class="fal fa-question-circle" 
        use:tippy={{ content: tooltip, placement: placement, arrow: true, theme: "tooltip",
            maxWidth: 200, duration: 150, animation: "fade" }} />
</div>