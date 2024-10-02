<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import cooking from '$lib/images/cooking.png';
</script>

<article>
	<Eyebrows>{$t('cooking.title')}</Eyebrows>
	<div class="dish">
		<div class="dish-inner">
			<div class="title">{$t('cooking.alt')}</div>
			<img src={cooking} alt={$t('cooking.alt')} />
		</div>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
		width: 100%;
	}

	article:after {
		background-image: linear-gradient(to top, rgb(250, 250, 250), rgba(250, 250, 250, 0));
		bottom: calc(var(--block-padding) * -1);
		content: '';
		height: 50%;
		left: calc(var(--block-padding) * -1);
		position: absolute;
		width: calc(100% + var(--block-padding) * 2);
		z-index: 1;
	}

	div.dish {
		bottom: calc(var(--block-padding) * -1);
		display: flex;
		flex-direction: column;
		height: calc(100% + var(--block-padding) * 2);
		justify-content: flex-end;
		left: calc(var(--block-padding) * -1);
		position: absolute;
		right: calc(var(--block-padding) * -1);
		top: calc(var(--block-padding) * -1);
		transition: background-color 200ms ease-in-out;
		width: calc(100% + var(--block-padding) * 2);
	}

	div.dish:before {
		background-color: var(--color-background);
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

	article:hover div.dish:before {
		opacity: 0;
	}

	div.dish-inner {
		padding: var(--block-padding);
	}

	div.dish img {
		bottom: -40%;
		left: -100%;
		margin: auto;
		mix-blend-mode: multiply;
		opacity: 0.8;
		position: absolute;
		right: -100%;
		transform: scale(100%);
		transition:
			mix-blend-mode 200ms ease-in-out,
			opacity 200ms ease-in-out,
			transform 200ms ease-in-out;
		width: 120%;
	}

	article:hover div.dish img {
		mix-blend-mode: normal;
		opacity: 1;
		transform: scale(110%);
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
		text-shadow:
			1px 0px 5px var(--color-filler),
			0px 1px 5px var(--color-filler);
		position: relative;
		z-index: 2;
	}
</style>
