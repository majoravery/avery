<script lang="ts">
	import { CANVAS_TYPES } from '$lib/constants';
	import { expansion, MAPPING_EXPANSION } from '$lib/stores/expansion';
	import { Grid } from '$lib/grid';
	import { isDebugMode } from '$lib/stores/debugMode';
	import { onMount } from 'svelte';

	import '$lib/grid.css';

	const breakpoints = Object.keys(CANVAS_TYPES).map((k) => parseInt(k, 10));

	let grid: Grid;
	let blocks: Block[];

	// Returns the lower breakpoint in the range that width fits in
	// Thanks ChatGPT
	function getBreakpoint(width: number) {
		return breakpoints.find(
			(val, i) => width >= val && (i === breakpoints.length - 1 || width < breakpoints[i + 1])
		);
	}

	function expand(block: Block): void {
		// Blocks not defined in MAPPING_EXPANSION does not get to expand :-)
		if (!Object.keys(MAPPING_EXPANSION).includes(block.content)) {
			return;
		}

		// Honestly this definition stuff is getting me winded trying to silence it so imma just leave it
		const expandedBlock = { ...block, ...MAPPING_EXPANSION[block.content] };
		expansion.set(expandedBlock);
	}

	onMount(() => {
		const bp = getBreakpoint(window.innerWidth);
		if (typeof bp !== 'number') {
			throw new Error('Grid init: breakpoint is undefined');
		}

		grid = new Grid(bp);
		blocks = grid.blocks;
		expansion.set(null);

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
				class:expanded={$expansion?.content === block.content}
				style:grid-column={`${block.x} / span ${$expansion?.content === block.content ? $expansion.expandedWidth : block.width}`}
				style:grid-row={`${block.y} / span ${$expansion?.content === block.content ? $expansion.expandedHeight : block.height}`}
				style:padding-bottom={`(${block.height} / ${block.width} * 100)%`}
				style:min-height={`calc(${block.height} * var(--block-size) - 3rem)`}
			>
				{#if $isDebugMode}
					content: {block.content}<br />
					width: {block.width}<br />
					height: {block.height}<br />
					x: {block.x}<br />
					y: {block.y}<br />
				{:else}
					{#await import(`$lib/blocks/${block.content}.svelte`) then { default: component }}
						<svelte:component this={component} expand={() => expand(block)} />
					{/await}
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
