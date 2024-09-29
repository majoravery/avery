<script lang="ts">
	import { locale, t } from '$lib/stores/locale';
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

	const url = 'https://averylim.com';
</script>

<svelte:head>
	<title>{$t('site.title')}</title>
	<meta name="description" content={$t('site.description')} />

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<meta charset="UTF-8" />

	<meta name="robots" content="index, follow" />

	<link rel="canonical" href={url} />

	<meta property="og:title" content={$t('site.title')} />
	<meta property="og:description" content={$t('site.description')} />
	<meta property="og:image" content="https://www.example.com/image.jpg" />
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$t('site.title')} />
	<meta name="twitter:description" content={$t('site.description')} />
	<meta name="twitter:image" content="https://www.example.com/image.jpg" />

	<!-- TODO: something to do with language? -->
	<link rel="alternate" href="https://www.example.com/" hreflang="en-us" />
</svelte:head>

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
