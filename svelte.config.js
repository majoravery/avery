import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-node config
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: ''
		}),

		// adapter-static config
		// adapter: adapter({
		// 	// To deploy to Render
		// 	pages: 'build',
		// 	assets: 'build',
		// 	fallback: undefined,
		// 	precompress: false,
		// 	strict: true
		// }),
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;
