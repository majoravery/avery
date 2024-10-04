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
		function resizeHandler() {
			const artistWidth = getTextWidth(artistEl);
			const root = document.querySelector(':root') as HTMLElement;
			if (!root) {
				throw new Error(`Couldn't get root element`);
			}
			root.style.setProperty('--artist-width', `${artistWidth}px`);
		}

		resizeHandler();
		window.addEventListener('resize', resizeHandler);

		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	});
</script>

<article>
	<Eyebrows>
		{$t('listeningTo.title')}
	</Eyebrows>
	<div class="album">
		<div class="album-inner">
			<div class="title">{title}</div>
			<div class="artist" bind:this={artistEl} data-content={artist}>{artist}</div>
			<img src={listeningTo} alt={`${title} - ${artist}`} />
		</div>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	article:after {
		background-image: linear-gradient(to top, rgb(250, 250, 250), rgba(250, 250, 250, 0));
		bottom: 0;
		content: '';
		height: 80%;
		left: 0;
		position: absolute;
		width: 100%;
		z-index: 1;
	}

	div.album {
		bottom: 0;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: flex-end;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		transition: background-color 200ms ease-in-out;
		width: 100%;
	}

	div.album:before {
		background-color: var(--colour-background);
		bottom: 0;
		content: '';
		height: 100%;
		left: 0;
		mix-blend-mode: screen;
		opacity: 0.5;
		position: absolute;
		right: 0;
		top: 0;
		transition: opacity 200ms ease-in-out;
		width: 100%;
		z-index: 1;
	}

	article:hover div.album:before {
		opacity: 0;
	}

	div.album-inner {
		padding: var(--block-padding);
	}

	div.album img {
		bottom: -100%;
		left: -100%;
		margin: auto;
		mix-blend-mode: multiply;
		opacity: 0.8;
		position: absolute;
		right: -100%;
		top: -65%;
		transform: scale(100%);
		transition:
			mix-blend-mode 200ms ease-in-out,
			opacity 200ms ease-in-out,
			transform 200ms ease-in-out;
		width: 130%;
	}

	article:hover div.album img {
		mix-blend-mode: normal;
		opacity: 1;
		transform: scale(110%);
	}

	div.title {
		color: var(--colour-accent);
		font-family: var(--enFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		text-shadow:
			1px 0px 5px var(--colour-filler),
			0px 1px 5px var(--colour-filler);
		position: relative;
		z-index: 2;
	}

	div.artist {
		/* TODO: delay the initial animation so it only plays after block appears */
		animation: scroll 15s 2s linear infinite;
		font-family: var(--monoFontFamily);
		font-optical-sizing: var(--monoFontOpticalSizing);
		font-size: var(--monoFontSizeSmall);
		font-style: var(--monoFontStyle);
		font-weight: var(--monoFontWeight);
		line-height: var(--monoLineHeight);
		transform: translate3d(0, 0, 0);
		white-space: nowrap;
		position: relative;
		z-index: 2;
	}

	div.artist:before {
		content: attr(data-content);
		font: inherit;
		padding-right: calc(var(--block-padding) + var(--block-padding));
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
