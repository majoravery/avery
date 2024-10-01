<script lang="ts">
	import { gsap } from 'gsap';
	import { locale, t } from '$lib/stores/locale';
	import { pageviews, visitors } from '$lib/stores/pageview';
	import { theme } from '$lib/stores/theme';
	import { onMount, tick } from 'svelte';
	import { printThinkingFace } from '$lib/utils';
	import { weathers } from '$lib/stores/weathers';
	import Grid from './Grid.svelte';

	import '$lib/styles.css';

	export let data: MainPageData;
	const timeline = gsap.timeline({
		defaults: {
			duration: 1.1,
			ease: 'power4.out'
		}
	});

	weathers.set(data.weathers);
	locale.set(data.locale);
	pageviews.set(data.pageViewCount);
	theme.set(data.palette);
	visitors.set(data.visitorCount);

	const url = 'https://averylim.com';

	async function playEntranceAnimation() {
		await tick();
		timeline
			.from('div.block.name', { scale: 0.8, autoAlpha: 0, duration: 1 })
			// Hiding this here because I set visibility: hidden otherwise it'll flash at the
			// top before the grid loads
			.set('footer', { visibility: 'visible' })
			.delay(0.2)
			.from('div.block:not(.name)', { scale: 0.8, autoAlpha: 0, duration: 1, stagger: 0.1 })
			.from('footer', { autoAlpha: 0, y: '500%' });
	}

	onMount(() => {
		printThinkingFace();
		playEntranceAnimation();
	});
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

	<noscript>
		<p>{$t('name')}</p>
		<p>{$t('description.writeup')}</p>
		<p>
			I'm not quite sure how you've landed on this view, but you should probably upgrade your
			browser or enable JavaScript because you're missin out on all the fun.
		</p>
	</noscript>

	<footer>
		<!-- &copy; avery 2024 and all, will be adding credits in this area -->
	</footer>
</main>

<style>
	main {
		background-color: var(--color-background);
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

	noscript p,
	footer {
		color: var(--color-filler);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		width: 100%;
	}

	footer {
		padding-top: var(--grid-margin);
		margin-left: auto;
		margin-right: auto;
		visibility: hidden;
	}

	@media (min-width: 480px) {
		noscript p,
		footer {
			padding-top: 0;
			margin-top: calc(var(--grid-margin) * 0.5);
			max-width: calc(
				(var(--columns) * var(--block-size)) + (var(--columns) - 1) * var(--grid-gap)
			);
		}
	}
</style>
