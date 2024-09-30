<script lang="ts">
	import { CANVAS_TYPES } from '$lib/constants';
	import { Grid } from '$lib/grid';
	import { gsap } from 'gsap';
	import { isDebugMode } from '$lib/stores/debugMode';
	import { onMount, tick } from 'svelte';
	import Block from './Block.svelte';

	import '$lib/grid.css';

	const breakpoints = Object.keys(CANVAS_TYPES).map((k) => parseInt(k, 10));
	const timeline = gsap.timeline({
		defaults: {
			duration: 1.1,
			ease: 'power4.out'
		}
	});

	let grid: Grid;
	let blocks: Block[];

	// Returns the lower breakpoint in the range that width fits in
	// Thanks ChatGPT
	function getBreakpoint(width: number) {
		return breakpoints.find(
			(val, i) => width >= val && (i === breakpoints.length - 1 || width < breakpoints[i + 1])
		);
	}

	async function playEntranceAnimation() {
		await tick();
		timeline
			.delay(1.5)
			.from('div.block.name', { scale: 0.8, autoAlpha: 0, duration: 1 })
			.delay(0.2)
			.from('div.block:not(.name)', { scale: 0.8, autoAlpha: 0, duration: 1, stagger: 0.1 })
			.from('footer', { y: '500%' });
	}

	onMount(() => {
		const bp = getBreakpoint(window.innerWidth);
		if (typeof bp !== 'number') {
			throw new Error('Grid init: breakpoint is undefined');
		}

		grid = new Grid(bp);
		blocks = grid.blocks;

		playEntranceAnimation();

		function resizeHandler() {
			const bp = getBreakpoint(window.innerWidth);
			if (typeof bp !== 'number') {
				throw new Error('resizeHandler: breakpoint is undefined');
			}

			if (grid.getCurrentBreakpoint() === bp) {
				return;
			}

			grid = grid.setBreakpoint(bp);
			blocks = grid.blocks;
		}

		// TODO: throttle this
		window.addEventListener('resize', resizeHandler);

		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	});
</script>

{#if blocks}
	<section>
		<!-- The 3rem subtracted from min-height accounts for the vertical block padding -->
		{#each blocks as block}
			<div
				class={`block ${block.content.toLowerCase()}`}
				style:grid-column={`${block.x} / span ${block.width}`}
				style:grid-row={`${block.y} / span ${block.height}`}
				style:padding-bottom={`(${block.height} / ${block.width} * 100)%`}
				style:min-height={`calc(${block.height} * var(--block-size) - 3rem)`}
			>
				{#if $isDebugMode}
					width: {block.width}<br />
					height: {block.height}<br />
					x: {block.x}<br />
					y: {block.y}<br />
				{:else}
					<Block blockContent={block.content} />
				{/if}
			</div>
		{/each}
	</section>
{/if}

<style>
	section {
		display: inline-grid;
		gap: var(--grid-gap);
	}

	div.block {
		background: rgb(255, 255, 255);
		border-radius: var(--border-radius-m);
		box-sizing: border-box;
		font-size: 1rem;
		height: 100%;
		overflow: hidden;
		padding: var(--block-padding);
		position: relative;
		width: 100%;
	}
</style>
