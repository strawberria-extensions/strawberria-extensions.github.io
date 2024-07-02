import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	base: "https://strawberria-extensions.github.io/"
	// resolve: {
	// 	alias: {
	// 	  // ...
	// 	  "js-big-decimal": "js-big-decimal/dist/web/js-big-decimal.min.js",
	// 	},
	// },
});
