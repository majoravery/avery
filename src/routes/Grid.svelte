<script lang="ts">
	import { CANVAS_TYPES } from '$lib/constants';
	import { Grid } from '$lib/grid';
	import { isDebugMode } from '$lib/stores/debugMode';
	import { onMount } from 'svelte';
	import Block from './Block.svelte';

	import './grid.css';

	const breakpoints = Object.keys(CANVAS_TYPES).map((k) => parseInt(k, 10));

	let grid: Grid;
	let blocks: Grid['blocks'];

	// Returns the lower breakpoint in the range that width fits in
	// Thanks ChatGPT
	function getBreakpoint(width: number) {
		return breakpoints.find(
			(val, i) => width >= val && (i === breakpoints.length - 1 || width < breakpoints[i + 1])
		);
	}

	onMount(() => {
		const bp = getBreakpoint(window.innerWidth);
		if (typeof bp !== 'number') {
			throw new Error('Grid init: breakpoint is undefined');
		}

		grid = new Grid(bp);
		blocks = grid.blocks;

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
				class="block"
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
		border-radius: var(--border-radius-s);
		box-sizing: border-box;
		font-size: 1rem;
		height: 100%;
		overflow: hidden;
		padding: var(--block-padding);
		position: relative;
		width: 100%;
	}
</style>
