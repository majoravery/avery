<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { weather } from '$lib/stores/weather';
	import Grid from './Grid.svelte';

	import '../styles.css';

	// This might change in the future if we add more data into the loader function but for now... Weather.
	export let data: Weather;

	weather.set(data);
</script>

<main
	style="--color-background: {$theme[0]}; --color-filler: {$theme[1]}; --color-accent: {$theme[2]}"
>
	<Grid />
</main>

<style>
	main {
		background-color: var(--color-background);
		box-sizing: border-box;
		display: flex;
		height: 100%;
		justify-content: center;
		min-height: 100vh;
		padding: 16px;
		width: 100%;
	}

	@media (min-width: 480px) {
		main {
			padding: 24px;
		}
	}

	@media (min-width: 768px) {
		main {
			padding: 36px;
		}
	}
</style>
