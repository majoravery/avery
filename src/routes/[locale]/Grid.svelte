<script lang="ts">
	import { CANVAS_TYPES } from '$lib/constants';
	import { expansion, MAPPING_EXPANSION } from '$lib/stores/expansion';
	import { Flip } from 'gsap/dist/Flip';
	import { Grid } from '$lib/grid';
	import { gsap } from 'gsap';
	import { isDebugMode } from '$lib/stores/debugMode';
	import { onMount, tick } from 'svelte';

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
	let expandableBlocks = Object.keys(MAPPING_EXPANSION);
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
		if (!expandableBlocks.includes(block.content)) {
			return;
		}

		// Honestly this definition stuff is getting me winded trying to silence it so imma just leave it
		const expandedBlock = { ...block, ...MAPPING_EXPANSION[block.content] };
		expansion.set(expandedBlock);
	}

	function getBlockExpansion(expandingBlock: BlockExpanded): gsap.core.Timeline {
		const blockSelector = expandingBlock.content.toLowerCase();

		// TODO: HMR doesn't load with this, so make sure $expansion is set to null before HMR
		const blockEl = document.querySelector(`.block.${blockSelector}`);

		if (!blockEl) {
			throw new Error(`Can't query block ${expandingBlock.content} to expand`);
		}

		const blockTl = gsap.timeline({
			defaults: {
				duration: 1.1,
				ease: 'power4.out'
			}
		});

		console.log(`.block.${blockSelector} .arrow-close`);
		console.log(document.querySelector(`.block.${blockSelector} .arrow-close`));

		blockTl
			.addLabel('start', 0)
			.set(`.block.${blockSelector}`, {
				'--row-end-expanded': `span ${expandingBlock.expandedWidth}`,
				'--column-end-expanded': `span ${expandingBlock.expandedHeight}`,
				zIndex: 10
			})
			.set(`.block:not(.${blockSelector})`, {
				pointerEvents: 'none'
			})
			// For expanded content
			.set(`.block.${blockSelector} .extra`, {
				opacity: 1
			})
			.call(() => {
				let state = Flip.getState(gsap.utils.toArray('section.grid, div.block'));
				blockEl.classList.add('expanded');
				Flip.from(state, {
					absolute: true
				});
			})
			// There seems to be a bit of flashing here
			.to(
				`.block:not(.${blockSelector})`,
				{
					opacity: 0.4
				},
				'start'
			)
			.to(
				`.block.${blockSelector} .preview`,
				{
					autoAlpha: 0,
					duration: 0.25
				},
				'start'
			)
			.fromTo(
				`.block.${blockSelector} .extra-content`,
				{
					autoAlpha: 0,
					y: '25%',
					duration: 0.9
				},
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.9
				},
				'-=0.5'
			)
			.fromTo(
				`.block.${blockSelector} .extra-close`,
				{
					autoAlpha: 0,
					x: '100%',
					y: '-100%',
					duration: 0.9
				},
				{
					autoAlpha: 1,
					x: 0,
					y: 0,
					duration: 0.9
				}
			);

		// TODO: add event listener on grid to close block

		return timeline;
	}

	function getBlockReversion(revertingBlock: BlockExpanded): gsap.core.Timeline {
		const blockSelector = revertingBlock.content.toLowerCase();

		const blockEl = document.querySelector(`.block.${blockSelector}`);

		if (!blockEl) {
			throw new Error(`Can't query block ${revertingBlock.content} to revert`);
		}

		const blockTl = gsap.timeline({
			defaults: {
				duration: 1.1,
				ease: 'power4.out'
			}
		});

		blockTl
			.addLabel('start', 0)
			// Reset
			.set(`.block.${blockSelector}`, {
				'--row-end-expanded': 'span 1',
				'--column-end-expanded': 'span 1',
				zIndex: 1
			})
			.set(`.block:not(.${blockSelector})`, {
				pointerEvents: 'initial'
			})
			.call(() => {
				let state = Flip.getState(gsap.utils.toArray('section.grid, div.block'));
				blockEl.classList.toggle('expanded');
				Flip.from(state, {
					absolute: true
				});
			})
			// There seems to be a bit of flashing here
			.to(
				`.block:not(.${blockSelector})`,
				{
					opacity: 1
				},
				'start'
			);

		return timeline;
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
		timeline.clear();

		console.log($expansion?.content);
		if ($expansion) {
			timeline.clear();
			timeline.add(getBlockExpansion($expansion));
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
				class:expandable={expandableBlocks.includes(block.content)}
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
						<svelte:component
							this={component}
							expand={() => expand(block)}
							expanded={$expansion?.content === block.content}
						/>
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

	div.block.expandable {
		cursor: zoom-in;
	}

	div.block.expanded {
		cursor: zoom-out;
		grid-column-end: var(--column-end-expanded);
		grid-row-end: var(--row-end-expanded);
	}
</style>
