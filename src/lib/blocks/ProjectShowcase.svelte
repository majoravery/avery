<script lang="ts">
	import { t } from '$lib/stores/locale';
	import arrowTopRight from '$lib/svg/arrow-up-right.svg';
	import ExtraContent from '$lib/components/ExtraContent.svelte';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import photos from '$lib/images/photos.png';

	export let expand: () => void;
	export let expanded: boolean;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<article on:click={expand}>
	<Eyebrows>{$t('projectShowcase.title')}</Eyebrows>

	<div class="screenshot preview">
		<img src={photos} alt={$t('projectShowcase.imageAlt', { website: 'photos.averylim.com' })} />
	</div>

	<ExtraContent {expanded}>
		<img src={photos} alt={$t('projectShowcase.imageAlt', { website: 'photos.averylim.com' })} />
		<p>
			In the break between leaving my job and moving to Japan, I was inspired by the fluid
			transitions from
			<a href="https://mayicestudio.com/" target="_blank">Mayice Studio's website</a>
			and built <a href="https://photos.averylim.com" target="_blank">photos.averylim.com</a>
			as a playground to sharpen my GSAP skills and trial Sanity CMS.
		</p>
		<div class="cta">
			<a href="https://photos.averylim.com" target="_blank">
				<span class="method">{$t('projectShowcase.cta')}</span>
				<span class="arrow"><img src={arrowTopRight} alt="{$t('projectShowcase.cta')}}" /></span>
			</a>
		</div>
	</ExtraContent>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
		width: 100%;
	}

	div.screenshot {
		bottom: 0;
		height: 100%;
		left: 0;
		position: absolute;
		position: absolute;
		right: 0;
		top: 0;
		transition: transform 180ms ease-in-out;
		width: 100%;
	}

	article:hover div.screenshot {
		transform: scale(110%);
	}

	div.screenshot img {
		bottom: -30%;
		position: absolute;
		width: 100%;
	}

	div.cta {
		border-bottom: 1px solid var(--color-accent);
		padding-bottom: 0.2rem;
	}

	div.cta a {
		align-items: center;
		cursor: ne-resize;
		display: flex;
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		justify-content: space-between;
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		text-decoration: none;
		width: 100%;
	}

	span.method {
		color: var(--color-accent);
	}

	span.arrow {
		display: inline-block;
		line-height: var(--bodyFontSize);
	}

	span.arrow img {
		transform-origin: center;
		width: var(--bodyFontSize);
	}

	div.cta:hover span.arrow img {
		animation-name: wheee;
		animation-duration: 400ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
	}

	@keyframes wheee {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(720deg);
		}
	}
</style>
