<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import cooking from '$lib/images/cooking.png';
	import ExtraContent from '$lib/components/ExtraContent.svelte';

	export let expand: () => void;
	export let expanded: boolean;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<article on:click={expand}>
	<Eyebrows>{$t('cooking.title')}</Eyebrows>
	<div class="dish preview">
		<div class="title">{$t('cooking.alt')}</div>
		<img src={cooking} alt={$t('cooking.alt')} />
	</div>
	<ExtraContent {expanded}>
		<img src={cooking} alt={$t('cooking.alt')} />
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam massa pharetra massa
			porta pulvinar. Nunc eget massa turpis. Mauris vehicula nisl in nunc imperdiet, at convallis
			eros scelerisque.
		</p>
		<p>
			Nulla luctus nulla sapien. Proin vestibulum in justo eu condimentum. Quisque dui quam,
			vestibulum at justo vel, hendrerit molestie eros. Ut augue lectus, pretium id elementum quis,
			egestas in odio. Nam malesuada tincidunt mattis. Nulla dictum erat varius condimentum semper.
		</p>
	</ExtraContent>
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
		height: 40%;
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
		transform: scale(100%);
		transition:
			opacity 200ms ease-in-out,
			transform 200ms ease-in-out;
		width: 150%;
	}

	article:hover div.dish img {
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
		z-index: 2;
	}

	div.extra {
		align-items: flex-end;
		display: flex;
		height: calc(100% - var(--block-padding) * 2);
		opacity: 0;
		position: absolute;
		width: calc(100% - var(--block-padding) * 2);
		z-index: 5;
		/* maybe add visiblity: hidden? */
	}

	div.extra-content {
		color: var(--color-accent);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
	}

	span.extra-close {
		--dimension: 14px;
		position: absolute;
		top: 0;
		right: 0;

		display: inline-block;
		line-height: var(--dimension);
	}

	span.extra-close img {
		transform-origin: center;
		width: var(--dimension);
	}

	div.extra.visible:hover span.extra-close {
		transform: translate3d(-50%, 50%, 0);
	}
</style>
