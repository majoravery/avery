<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import photos from '$lib/images/photos.png';
	import ExtraContent from '$lib/components/ExtraContent.svelte';

	export let expand: () => void;
	export let expanded: boolean;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<article on:click={expand}>
	<Eyebrows>{$t('projectShowcase.title')}</Eyebrows>

	<div class="screenshot preview">
		<img src={photos} alt={$t('projectShowcase.imageAlt', { website: 'photos.averylim.com' })} />
	</div>

	<ExtraContent {expanded} standout>
		<p>
			Last week I packed up my life in Singapore and moved to Fukuoka with the intention of taking a
			year long career break while living abroad again- some days I feel silly for quitting my job
			amidst layoff szn but other days I know this is prolly the best time for such an experience
			given the minimal commitments I’ve got in life rn, and I’m brimming with excitement and
			curiosity about what this upcoming year will bring 🌟
		</p>
	</ExtraContent>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}

	div.screenshot {
		transition: transform 180ms ease-in-out;
	}

	article:hover div.screenshot {
		transform: scale(110%);
	}

	img {
		bottom: -4rem;
		left: 1.5rem;
		position: absolute;
		right: 1.5rem;
		width: calc(100% - 3rem);
	}
</style>
