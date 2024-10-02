<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import recently from '$lib/images/recently.jpg';
	import ExtraContent from '$lib/components/ExtraContent.svelte';

	export let expand: () => void;
	export let expanded: boolean;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<article on:click={expand} class:expanded>
	<Eyebrows standout>{$t('recently.title')}</Eyebrows>
	<div class="photo preview">
		<img src={recently} alt={$t('recently.title')} />
	</div>

	<ExtraContent {expanded} standout>
		<img src={recently} alt={$t('recently.title')} />
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
		position: relative;
		height: 100%;
		width: 100%;
	}

	div.photo {
		background-color: var(--color-filler);
		border-radius: var(--border-radius-s);
		bottom: -8px;
		height: calc(100% + 16px);
		left: -8px;
		position: absolute;
		right: -8px;
		top: -8px;
		transition: transform 180ms ease-in-out;
		width: calc(100% + 16px);
	}

	article:hover div.photo {
		transform: scale(110%);
	}

	div.photo:before {
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
		transition: opacity 180ms ease-in-out;
		width: 100%;
		z-index: 1;
	}

	article:hover div.photo:before {
		opacity: 0;
	}

	div.photo img {
		border-radius: var(--border-radius-s);
		filter: brightness(100%);
		mix-blend-mode: multiply;
		position: absolute;
		transform: scale(100%);
		transition: transform 180ms ease-in-out;
		width: 100%;
		height: 100%;
	}
</style>
