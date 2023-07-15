<script lang="ts">
	// import { Svroller } from "svrollbar";
	import "../app.css";
	import "$lib/resources/chaster-base.css";
	import "$lib/resources/main.css";

	// let flag = false;
	// setTimeout(() => { flag = true; })
</script>

<slot />

<!-- <div class="svroller-container">
	<Svroller width={"100%"} height="100vh">
		<p style="height: 0.00001em" class:hidden={flag} />
		<div class="h-full w-full pr-2">
		</div>
	</Svroller>
</div>

<style>
	.svroller-container {
		--svrollbar-track-width: 20px;
		--svrollbar-track-opacity: 1;

		--svrollbar-thumb-width: 10px;
		--svrollbar-thumb-background: #4d4a5e;
		--svrollbar-thumb-opacity: 1;
	}
</style> -->