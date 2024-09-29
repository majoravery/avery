<script lang="ts">
	import { getTextWidth } from '$lib/utils';
	import { onMount } from 'svelte';
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import listeningTo from '$lib/images/listening-to.png';

	const title = 'LONGINESS REMIX';
	const artist = 'SugLawd Familiar, CHICO CARLITO, Awich';

	let artistEl: HTMLElement;

	onMount(() => {
		const artistWidth = getTextWidth(artistEl);

		const root = document.querySelector(':root') as HTMLElement;
		if (!root) {
			throw new Error(`Couldn't get root element`);
		}
		root.style.setProperty('--artist-width', `${artistWidth}px`);
	});
</script>

<article>
	<Eyebrows arrowAlt={$t('listeningTo.linkAlt', { platform: 'YouTube' })}>
		{$t('listeningTo.title')}
	</Eyebrows>
	<div class="album">
		<div class="title">{title}</div>
		<div class="artist" bind:this={artistEl} data-content={artist}>{artist}</div>
		<img src={listeningTo} alt={`${title} - ${artist}`} />
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	article:after {
		content: '';
		background-image: linear-gradient(to top, rgb(250, 250, 250), rgba(250, 250, 250, 0));
		bottom: 0;
		height: 70%;
		left: 0;
		position: absolute;
		width: 100%;
		z-index: 1;
	}

	div.album {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: flex-end;
		position: relative;
		width: 100%;
	}

	div.album img {
		bottom: -100%;
		left: -100%;
		margin: auto;
		opacity: 0.4;
		position: absolute;
		right: -100%;
		top: -75%;
		width: 150%;
	}

	div.title {
		color: var(--color-accent);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		z-index: 2;
	}

	div.artist {
		animation: scroll 15s 2s linear infinite;
		font-family: 'JetBrains Mono', monospace;
		font-optical-sizing: auto;
		font-size: 0.7rem;
		font-style: normal;
		font-weight: 400;
		line-height: 1.1rem;
		transform: translate3d(0, 0, 0);
		white-space: nowrap;
		z-index: 2;
	}

	div.artist:before {
		content: attr(data-content);
		font: inherit;
		padding-right: calc(var(--block-padding) * 2);
	}
	@keyframes scroll {
		50%,
		100% {
			transform: translate3d(
				calc((var(--block-padding) + var(--block-padding) + var(--artist-width)) * -1),
				0,
				0
			);
		}
	}
</style>
