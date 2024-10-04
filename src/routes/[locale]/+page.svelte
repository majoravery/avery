<script lang="ts">
	import { locale, t } from '$lib/stores/locale';
	import { onMount } from 'svelte';
	import { pageviews, visitors } from '$lib/stores/pageview';
	import { printThinkingFace } from '$lib/ascii';
	import { theme } from '$lib/stores/theme';
	import { weathers } from '$lib/stores/weathers';
	import Grid from './Grid.svelte';

	import '$lib/styles.css';

	export let data: MainPageData;

	weathers.set(data.weathers);
	locale.set(data.locale);
	pageviews.set(data.pageViewCount);
	theme.set(data.palette);
	visitors.set(data.visitorCount);

	const url = 'https://averylim.com';

	onMount(() => {
		printThinkingFace();
	});
</script>

<svelte:head>
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y8DZPPYGWY"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-Y8DZPPYGWY');
	</script>

	<title>{$t('site.title')}</title>
	<meta name="description" content={$t('site.description')} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="UTF-8" />
	<meta name="robots" content="index, follow" />

	<meta property="og:title" content={$t('site.title')} />
	<meta property="og:description" content={$t('site.description')} />
	<meta property="og:image" content="https://averylim.com/seo.png" />
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$t('site.title')} />
	<meta name="twitter:description" content={$t('site.description')} />
	<meta name="twitter:image" content="https://averylim.com/seo.png" />

	<link rel="canonical" href={url} />
</svelte:head>

<main
	style="--colour-background: {$theme[0]}; --colour-filler: {$theme[1]}; --colour-accent: {$theme[2]}"
	class={$locale}
>
	<Grid />

	<noscript>
		<p><b>{@html $t('name')}</b></p>
		<p>{$t('description.writeup')}</p>
		<p>{$t('noscript')}</p>
	</noscript>

	<footer>
		<!-- Built in my little apartment in Yakuin, Fukuoka. Weather forecast by <a
			href="https://www.weatherapi.com/"
			target="_blank">weatherapi</a
		>. -->
	</footer>
</main>

<style>
	main {
		background-color: var(--colour-background);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: space-between;
		min-height: 100vh;
		padding: var(--grid-margin);
		width: 100%;
	}

	noscript p {
		color: var(--colour-filler);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		width: 40%;
	}

	/* footer {
		color: var(--colour-accent);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		margin-left: auto;
		margin-right: auto;
		padding-top: var(--grid-margin);
		visibility: hidden;
		width: 100%;
	}

	footer a {
		color: inherit;
		cursor: ne-resize;
	}

	@media (min-width: 480px) {
		footer {
			padding-top: 0;
			margin-top: calc(var(--grid-margin) * 0.5);
			max-width: calc(
				(var(--columns) * var(--block-size)) + (var(--columns) - 1) * var(--grid-gap)
			);
		}
	} */
</style>
