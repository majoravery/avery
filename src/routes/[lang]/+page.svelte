<script lang="ts">
	import { locale } from '$lib/stores/locale';
	import { theme } from '$lib/stores/theme';
	import { weather } from '$lib/stores/weather';
	import Grid from './components/Grid.svelte';

	import '$lib/styles.css';

	export let data: MainPageData;

	weather.set(data);
	locale.set(data.lang);
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
