<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import cooking from '$lib/images/cooking.png';
</script>

<article>
	<Eyebrows>{$t('cooking.title')}</Eyebrows>
	<div class="dish">
		<div class="title">{$t('cooking.alt')}</div>
		<img src={cooking} alt={$t('cooking.alt')} />
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
		height: 30%;
		left: 0;
		position: absolute;
		width: 100%;
		z-index: 1;
	}

	div.dish {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: flex-end;
		position: relative;
		width: 100%;
	}

	div.dish img {
		bottom: -65%;
		left: -100%;
		margin: auto;
		opacity: 0.4;
		position: absolute;
		right: -100%;
		/* top: -75%; */
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
</style>
