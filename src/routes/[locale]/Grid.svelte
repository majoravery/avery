<script lang="ts">
	import { CANVAS_TYPES } from '$lib/constants';
	import { expansion, MAPPING_EXPANSION } from '$lib/stores/expansion';
	import { Flip } from 'gsap/dist/Flip';
	import { Grid } from '$lib/grid';
	import { gsap } from 'gsap';
	import { isDebugMode } from '$lib/stores/debugMode';
	import { onMount } from 'svelte';

	import '$lib/grid.css';

	const breakpoints = Object.keys(CANVAS_TYPES).map((k) => parseInt(k, 10));
	const timeline = gsap.timeline({
		defaults: {
			duration: 1.1,
			ease: 'power4.out'
		}
	});
	gsap.registerPlugin(Flip);

	let grid: Grid;
	let blocks: Block[];
	let previouslyExpanded: BlockExpanded;

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

	$: {
		// if (previouslyExpanded && previouslyExpanded.content !== $expansion?.content) {
		// 	console.log('reverting previously expanded');
		// 	gsap.fromTo(
		// 		`.block.${previouslyExpanded.content.toLowerCase()}`,
		// 		{
		// 			'--width': previouslyExpanded.expandedWidth,
		// 			'--height': previouslyExpanded.expandedHeight,
		// 			duration: 1.1
		// 		},
		// 		{
		// 			'--width': previouslyExpanded.width,
		// 			'--height': previouslyExpanded.height,
		// 			duration: 1.1
		// 		}
		// 	);
		// }

		if ($expansion) {
			// TODO: HMR doesn't load with this, so make sure $expansion is set to null before HMR
			const expandingBlock = document.querySelector(`.block.${$expansion.content.toLowerCase()}`);

			if (!expandingBlock) {
				throw new Error(`Can't query block ${$expansion.content} to expand`);
			}

			gsap.set(`.block.${$expansion.content.toLowerCase()}`, {
				'--row-end-expanded': `span ${$expansion.expandedWidth}`,
				'--column-end-expanded': `span ${$expansion.expandedHeight}`,
				zIndex: 10
			});

			let state = Flip.getState(gsap.utils.toArray('section.grid, div.block'));
			expandingBlock.classList.toggle('expanded');
			Flip.from(state, {
				absolute: true
			});

			previouslyExpanded = $expansion;
		}
	}
</script>

{#if blocks}
	<section class="grid">
		<!-- The 3rem subtracted from min-height accounts for the vertical block padding -->
		{#each blocks as block}
			<div
				class="block {block.content.toLowerCase()}"
				style:padding-bottom="({block.height} / {block.width} * 100)%"
				style:min-height="calc({block.height} * var(--block-size) - 3rem)"
				style="--column-start: {block.x}; --row-start: {block.y}; --column-end: span {block.width}; --row-end-expanded: span {block.height}; --column-end-expanded: span {block.width}; --row-end: span {block.height};"
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
	section.grid {
		display: inline-grid;
		gap: var(--grid-gap);
	}

	div.block {
		background: rgb(255, 255, 255);
		border-radius: var(--border-radius-m);
		box-sizing: border-box;
		font-size: 1rem;
		grid-column-end: var(--column-end);
		grid-column-start: var(--column-start);
		grid-row-end: var(--row-end);
		grid-row-start: var(--row-start);
		height: 100%;
		overflow: hidden;
		padding: var(--block-padding);
		position: relative;
		transition:
			grid-column-end 200ms ease-in-out,
			grid-row-end 200ms ease-in-out;
		width: 100%;
	}

	div.block.expanded {
		grid-column-end: var(--column-end-expanded);
		grid-row-end: var(--row-end-expanded);
	}
</style>
