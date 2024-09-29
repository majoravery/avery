<script lang="ts">
	import { locale } from '$lib/stores/locale';
	import { pageviews, visitors } from '$lib/stores/pageview';
	import { theme } from '$lib/stores/theme';
	import { weathers } from '$lib/stores/weathers';
	import Grid from './components/Grid.svelte';

	import '$lib/styles.css';

	export let data: MainPageData;

	weathers.set(data.weathers);
	locale.set(data.locale);
	pageviews.set(data.pageViewCount);
	visitors.set(data.visitorCount);
</script>

<!-- <svelte:head>
	<title>Avery's dotcom</title>
	<html lang={$locale} />
</svelte:head> -->

<main
	style="--color-background: {$theme[0]}; --color-filler: {$theme[1]}; --color-accent: {$theme[2]}"
>
	<Grid />

	<footer>&copy; avery 2024 and all, will be adding credits in this area</footer>
</main>

<style>
	main {
		--margin: 16px;

		background-color: var(--color-background);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: space-between;
		min-height: 100vh;
		padding: var(--margin);
		width: 100%;
	}

	@media (min-width: 480px) {
		main {
			--margin: 24px;
		}
	}

	@media (min-width: 768px) {
		main {
			--margin: 36px;
		}
	}

	footer {
		margin-top: calc(var(--margin) * 0.5);
		color: var(--color-filler);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		max-width: calc((var(--columns) * var(--block-size)) + (var(--columns) - 1) * var(--grid-gap));
		width: 100%;
	}
</style>
