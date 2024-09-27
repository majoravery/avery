<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import listeningTo from '$lib/images/listening-to.png';
</script>

<article>
	<Eyebrow>{$t('listeningTo.title')}</Eyebrow>
	<div class="album">
		<div class="title">LONGINESS REMIX</div>
		<div class="artist">SugLawd Familiar, CHICO CARLITO, Awich</div>
		<img src={listeningTo} alt={$t('listeningTo.alt')} />
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
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background-image: linear-gradient(to top, rgb(250, 250, 250), rgba(250, 250, 250, 0));
		z-index: 1;
	}

	div.album {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
	}

	div.album img {
		position: absolute;
		width: 150%;
	}

	div.title {
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		color: var(--color-accent);

		white-space: nowrap;
		z-index: 2;
	}

	div.artist {
		font-family: 'JetBrains Mono', monospace;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.7rem;
		line-height: 1.1rem;

		white-space: nowrap;
		z-index: 2;
	}

	/* div.album {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		height: 100%;
	}

	div.album img {
		width: 100%;

		position: absolute;
		top: -75%;
		bottom: -100%;
		left: -100%;
		right: -100%;
		margin: auto;
	} */
</style>
