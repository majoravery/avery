<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import arrowTopRight from '$lib/svg/arrow-up-right.svg';
	import photos from '$lib/images/photos.png';
</script>

<article>
	<div>
		<Eyebrow>{$t('projectShowcase.title')}</Eyebrow>
		<span class="arrow"><img src={arrowTopRight} alt={$t('projectShowcase.linkAlt')} /></span>
	</div>

	<img
		class="screenshot"
		src={photos}
		alt={$t('projectShowcase.imageAlt', { website: 'photos.averylim.com' })}
	/>
</article>

<style>
	article {
		height: 100%;
	}

	div {
		display: flex;
		justify-content: space-between;
	}

	span.arrow {
		display: inline-block;
	}

	span.arrow img {
		transform-origin: center;
		width: 1rem;
	}

	article:hover span.arrow img {
		animation-name: wheee;
		animation-duration: 400ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
	}

	img.screenshot {
		bottom: -4rem;
		left: 1.5rem;
		position: absolute;
		right: 1.5rem;
		width: calc(100% - 3rem);
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
