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
	let breakpoint: number;
	let blocks: Block[];
	let expandableBlocks = Object.keys(MAPPING_EXPANSION);

	// Returns the lower breakpoint in the range that width fits in
	// Thanks ChatGPT
	function getBreakpoint(width: number): number {
		return (
			breakpoints.find(
				(val, i) => width >= val && (i === breakpoints.length - 1 || width < breakpoints[i + 1])
			) ?? -1
		);
	}

	function expand(block: Block): void {
		// Blocks not defined in MAPPING_EXPANSION does not get to expand :-)
		if (!expandableBlocks.includes(block.content)) {
			return;
		}

		if (block.content === $expansion?.content) {
			// Nothing else needs to be done now move along...
			return;
		}

		// Honestly this definition stuff is getting me winded trying to silence it so imma just leave it
		const expandedBlock = { ...block, ...MAPPING_EXPANSION[block.content] };

		timeline.clear();
		timeline.add(getBlockExpansion(expandedBlock));
	}

	function revert(block: BlockExpanded): void {
		if (block.content !== $expansion?.content) {
			throw new Error(
				`You've just tried to revert ${block.content} even though ${$expansion?.content} was expanded. How..?`
			);
		}

		timeline.clear();
		timeline.add(getBlockReversion(block));
	}

	function getBlockExpansion(blockToExpand: BlockExpanded): gsap.core.Timeline {
		const blockSelector = blockToExpand.content.toLowerCase();

		const blockEl = document.querySelector(`.block.${blockSelector}`);
		if (!blockEl) {
			throw new Error(`Can't query block ${blockToExpand.content} to expand`);
		}

		const blockTl = gsap.timeline({
			defaults: {
				duration: 1.1,
				ease: 'power4.out'
			}
		});

		let state = Flip.getState(gsap.utils.toArray('section.grid, div.block'));

		blockTl
			.addLabel('start', 0)
			.call(() => {
				expansion.set(blockToExpand);
			})
			.set(`.block.${blockSelector}`, {
				'--row-end-expanded': `span ${blockToExpand.expandedHeight}`,
				'--column-end-expanded': `span ${blockToExpand.expandedWidth}`,
				zIndex: 10
			})
			.set(`.block:not(.${blockSelector})`, {
				pointerEvents: 'none'
			})
			// For expanded content
			.set(`.block.${blockSelector} .extra`, {
				opacity: 1
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
			.call(
				() => {
					blockEl.classList.add('expanded');
					Flip.from(state, {
						absolute: true
					});
				},
				undefined,
				'0.25'
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
				'-=0.25'
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
			)
			.call(() => {
				function closeExpandedBlock() {
					revert(blockToExpand);
					blockEl?.removeEventListener('click', closeExpandedBlock);
				}
				blockEl?.addEventListener('click', closeExpandedBlock);
			});

		return blockTl;
	}

	function getBlockReversion(blockToRevert: BlockExpanded): gsap.core.Timeline {
		const blockSelector = blockToRevert.content.toLowerCase();

		const blockEl = document.querySelector(`.block.${blockSelector}`);
		if (!blockEl) {
			throw new Error(`Can't query block ${blockToRevert.content} to expand`);
		}

		const blockTl = gsap.timeline({
			defaults: {
				duration: 1.1,
				ease: 'power4.out'
			}
		});

		let state = Flip.getState(gsap.utils.toArray('section.grid, div.block'));

		blockTl
			.addLabel('start', 0)
			.set(`.block:not(.${blockSelector})`, {
				pointerEvents: 'initial'
			})
			.to(
				`.block.${blockSelector} .extra-content`,
				{
					autoAlpha: 0,
					y: '20%',
					duration: 0.5
				},
				'start'
			)
			.fromTo(
				`.block.${blockSelector} .extra-close`,
				{
					autoAlpha: 1,
					x: 0,
					y: 0,
					duration: 0.5
				},
				{
					autoAlpha: 0,
					x: '100%',
					y: '-100%'
				},
				'<0.4'
			)
			.call(
				() => {
					blockEl.classList.remove('expanded');
					Flip.from(state, {
						absolute: true
					});
				},
				undefined,
				'<0.1'
			)
			// There seems to be a bit of flashing here
			.to(
				`.block:not(.${blockSelector})`,
				{
					opacity: 1
				},
				'-=0.5'
			)
			.fromTo(
				`.block.${blockSelector} .preview`,
				{
					autoAlpha: 0,
					duration: 0.9
				},
				{
					autoAlpha: 1
				},
				'-=0.9'
			)
			.call(() => {
				expansion.set(null);
			})
			// Reset z-index
			.set(`.block.${blockSelector}`, {
				zIndex: 'unset'
			});

		return blockTl;
	}

	onMount(() => {
		breakpoint = getBreakpoint(window.innerWidth);
		if (breakpoint === -1) {
			throw new Error('Grid init: breakpoint is undefined');
		}

		grid = new Grid(breakpoint);
		blocks = grid.blocks;
		expansion.set(null);

		function resizeHandler() {
			breakpoint = getBreakpoint(window.innerWidth);
			if (breakpoint === -1) {
				throw new Error('resizeHandler: breakpoint is undefined');
			}

			if (grid.getCurrentBreakpoint() === breakpoint) {
				return;
			}

			grid = grid.setBreakpoint(breakpoint);
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
					<div class="debug">
						{block.content}<br />
						width: {block.width}<br />
						height: {block.height}<br />
						x: {block.x}<br />
						y: {block.y}<br />
						{block.occupiedIndices}
					</div>
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
		cursor: unset;
		grid-column-end: var(--column-end-expanded);
		grid-row-end: var(--row-end-expanded);
	}

	div.debug {
		font-family:
			ui-monospace,
			SFMono-Regular,
			Menlo,
			Monaco,
			Consolas,
			Liberation Mono,
			Courier New,
			monospace;
		font-size: 12px;
	}
</style>
