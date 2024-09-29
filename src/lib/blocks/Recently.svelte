<script lang="ts">
	// import { defIndexed, imageFromURL, intBufferFromImage, ARGB8888, GRAY8 } from '@thi.ng/pixel';
	// import { ditherWith, FLOYD_STEINBERG } from '@thi.ng/pixel-dither';
	// import { onMount } from 'svelte';
	// import { pixelCanvas2d } from '@thi.ng/canvas';
	import { t } from '$lib/stores/locale';
	import { theme } from '$lib/stores/theme';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import recently from '$lib/images/recently.jpg';

	let containerEl: HTMLDivElement;

	// function hexToARGB(hex: string): number {
	// 	// Remove the hash (#) if present
	// 	hex = hex.replace(/^#/, '');

	// 	let alpha = 255; // Default to 255 (fully opaque)

	// 	// If the hex code is 8 digits, it includes alpha
	// 	if (hex.length === 8) {
	// 		alpha = parseInt(hex.slice(0, 2), 16);
	// 		hex = hex.slice(2);
	// 	}

	// 	// Extract RGB components
	// 	const red = parseInt(hex.slice(0, 2), 16);
	// 	const green = parseInt(hex.slice(2, 4), 16);
	// 	const blue = parseInt(hex.slice(4, 6), 16);

	// 	// Combine into ARGB integer
	// 	return (alpha << 24) | (red << 16) | (green << 8) | blue;
	// }

	// onMount(() => {
	// 	async function ditherImage() {
	// 		const img = await imageFromURL(recently);
	// 		const buf = intBufferFromImage(img, ARGB8888).scale(0.9);

	// 		const { canvas } = pixelCanvas2d(buf.width, buf.height, containerEl);
	// 		canvas.style.position = 'absolute';
	// 		canvas.style.top = '0';
	// 		canvas.style.left = '0';
	// 		canvas.style.right = '0';
	// 		canvas.style.bottom = '0';
	// 		canvas.style.width = '100%';

	// 		const themeArgb = $theme.map((hex) => hexToARGB(hex));

	// 		const dithered = ditherWith(FLOYD_STEINBERG, buf.copy(), {});
	// 		dithered.as(defIndexed(themeArgb)).blitCanvas(canvas);
	// 	}

	// 	ditherImage();
	// });
</script>

<article>
	<Eyebrows>{$t('recently.title')}</Eyebrows>
	<!-- <div class="container" bind:this={containerEl} /> -->
	<div class="container">
		<img src={recently} alt={$t('recently.title')} />
	</div>
</article>

<style>
	article {
		height: 100%;
		width: 100%;
	}

	div.container {
		background-color: var(--color-filler);
		height: 100%;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
	}

	div.container:before {
		background-color: var(--color-background);
		bottom: 0;
		content: '';
		height: 100%;
		left: 0;
		opacity: 0.3;
		mix-blend-mode: screen;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
		z-index: 1;
	}

	img {
		bottom: 0;
		filter: brightness(100%);
		left: 0;
		mix-blend-mode: multiply;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
	}
</style>
