<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/stores/locale';

	const IMAGES = [
		'g', // if grandma had wheels
		'h', // heman
		'o', // jacques pepin omelette
		'p', // potter puppet pals
		'r' // rickroll
	];
	let img: string;

	async function getImage() {
		const file = IMAGES[Math.floor(Math.random() * IMAGES.length)];
		const module = await import(`$lib/images/qr/${file}.png`);
		img = module.default;
	}

	onMount(() => {
		getImage();
	});
</script>

<article>
	<img src={img} alt={$t('qrCode.alt')} />
</article>

<style>
	article {
		height: 100%;
		width: 100%;
	}

	article:before {
		content: '';
		background: var(--colouraccent);
		filter: brightness(90%);
		height: calc(100% - var(--block-padding) - var(--block-padding));
		left: var(--block-padding);
		mix-blend-mode: screen;
		position: absolute;
		top: var(--block-padding);
		width: calc(100% - var(--block-padding) - var(--block-padding));
	}

	img {
		height: auto;
		width: 100%;
	}
</style>
