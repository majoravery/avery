<script lang="ts">
	import { locale } from '$lib/stores/locale';
	import { onMount } from 'svelte';
	import { pageviews, visitors } from '$lib/stores/pageview';
	import { theme } from '$lib/stores/theme';
	import { weather } from '$lib/stores/weather';
	import Grid from './components/Grid.svelte';

	import '$lib/styles.css';

	export let data: MainPageData;

	weather.set(data.weather);
	locale.set(data.locale);
	pageviews.set(data.pageViewCount);
	visitors.set(data.visitorCount);

	onMount(() => {
		fetch('/api/pageview', {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	});
</script>

<!-- <svelte:head>
	<title>Avery's dotcom</title>
	<html lang={$locale} />
</svelte:head> -->

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
