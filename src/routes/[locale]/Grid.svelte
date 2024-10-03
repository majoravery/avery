<script lang="ts">
	import { CANVAS_TYPES } from '$lib/constants';
	import { getExpansionAdj, expansion, MAPPING_EXPANSION } from '$lib/stores/expansion';
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

	let breakpoint: number;
	let blocks: Block[];
	let expandableBlocks = Object.keys(MAPPING_EXPANSION);
	let grid: Grid;

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
		if (
			// Blocks not defined in MAPPING_EXPANSION does not get to expand :-)
			!expandableBlocks.includes(block.content) ||
			// Nothing else needs to be done now move along...
			block.content === $expansion?.content
		) {
			return;
		}

		// Honestly this definition stuff is getting me winded trying to silence it so imma just leave it
		const expandedBlock = { ...block, ...MAPPING_EXPANSION[block.content] };

		const posAdj = getExpansionAdj(expandedBlock, breakpoint);

		timeline.clear();
		timeline.add(getBlockExpansion(expandedBlock, posAdj));
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

	function revertImmediately(block: BlockExpanded, callback: () => void): void {
		if (block.content !== $expansion?.content) {
			throw new Error(
				`You've just tried to revert ${block.content} even though ${$expansion?.content} was expanded. How..?`
			);
		}

		const blockSelector = `.block.${block.content.toLowerCase()}`;
		const blockNotSelector = `.block:not(.${block.content.toLowerCase()})`;

		const blockEl = document.querySelector(blockSelector);
		if (!blockEl) throw new Error(`Can't query block ${block.content} to expand`);

		timeline
			.clear()
			.set(blockSelector, {
				zIndex: 'unset'
			})
			.set(blockNotSelector, {
				opacity: 1,
				pointerEvents: 'initial'
			})
			.set(`${blockSelector} .preview`, {
				autoAlpha: 1
			})
			.set(
				`${blockSelector} .extra-header-bg,
				${blockSelector} .extra-close,
				${blockSelector} .extra-content`,
				{
					autoAlpha: 0
				}
			)
			.call(() => {
				blockEl.classList.remove('expanded');
				expansion.set(null);
				callback();
			});
	}

	function getBlockExpansion(
		blockToExpand: BlockExpanded,
		posAdj: { x: number; y: number } // position adjustment - amount to shift block by in a { x: n, y: n } object if its expanded version exceeds grid.
	): gsap.core.Timeline {
		const blockSelector = `.block.${blockToExpand.content.toLowerCase()}`;
		const blockNotSelector = `.block:not(.${blockToExpand.content.toLowerCase()})`;

		const blockEl = document.querySelector(blockSelector);
		if (!blockEl) throw new Error(`Can't query block ${blockToExpand.content} to expand`);

		const extraContentEls = document.querySelector(`${blockSelector} .extra-content`)?.children;
		if (!extraContentEls)
			throw new Error(`Can't query extra content of block ${blockToExpand.content}`);

		const blockTl = gsap.timeline({
			defaults: {
				duration: 1,
				ease: 'power4.out'
			}
		});

		let state = Flip.getState(gsap.utils.toArray('section.grid, div.block, div.gate'));

		blockTl
			.addLabel('start', 0)
			.call(() => {
				expansion.set(blockToExpand);
			})
			.set(blockSelector, {
				'--row-start-expanded': blockToExpand.y + posAdj.y,
				'--column-start-expanded': blockToExpand.x + posAdj.x,
				'--row-end-expanded': `span ${blockToExpand.expandedHeight}`,
				'--column-end-expanded': `span ${blockToExpand.expandedWidth}`,
				zIndex: 10
			})
			.set('div.gate', { zIndex: 3 })
			.fromTo(
				'div.gate',
				{
					opacity: 0
				},
				{
					opacity: 0.4
				},
				'start'
			)
			.fromTo(
				`${blockSelector} .preview`,
				{
					autoAlpha: 1
				},
				{
					autoAlpha: 0,
					duration: 0.3
				},
				'start'
			)
			.addLabel('expand', 0.3) // manually calculated hah
			.set(
				`${blockSelector} .extra-header-bg`,
				{
					autoAlpha: 1
				},
				'expand'
			)
			// To prep .extra-content element to be visible
			.set(
				`${blockSelector} .extra-content`,
				{
					autoAlpha: 1,
					yPercent: 0
				},
				'expand'
			)
			.call(
				() => {
					blockEl.classList.add('expanded');
					Flip.from(state, {
						absolute: true
					});
				},
				undefined,
				'expand'
			)
			.fromTo(
				extraContentEls,
				{
					autoAlpha: 0,
					yPercent: 25
				},
				{
					autoAlpha: 1,
					yPercent: 0,
					duration: 1,
					stagger: 0.15
				},
				'-=0.25'
			)
			.fromTo(
				`${blockSelector} .extra-close`,
				{
					autoAlpha: 0,
					xPercent: 100,
					yPercent: -100
				},
				{
					autoAlpha: 1,
					xPercent: 0,
					yPercent: 0,
					duration: 1
				}
			)
			.call(() => {
				const closeBtn = blockEl?.querySelector('.extra-close');
				if (!closeBtn)
					throw new Error(`Can't query close button in block ${blockToExpand.content}`);

				function closeExpandedBlock() {
					revert(blockToExpand);
					closeBtn?.removeEventListener('click', closeExpandedBlock);
				}
				closeBtn.addEventListener('click', closeExpandedBlock);
			});

		return blockTl;
	}

	function getBlockReversion(blockToRevert: BlockExpanded): gsap.core.Timeline {
		const blockSelector = `.block.${blockToRevert.content.toLowerCase()}`;
		const blockNotSelector = `.block:not(.${blockToRevert.content.toLowerCase()})`;

		const blockEl = document.querySelector(blockSelector);
		if (!blockEl) throw new Error(`Can't query block ${blockToRevert.content} to expand`);

		const blockTl = gsap.timeline({
			defaults: {
				duration: 1.1,
				ease: 'power4.out'
			}
		});

		let state = Flip.getState(gsap.utils.toArray('section.grid, div.block, div.gate'), {
			props: 'opacity,borderRadius'
		});

		blockTl
			.addLabel('start', 0)
			.fromTo(
				`${blockSelector} .extra-close`,
				{
					autoAlpha: 1,
					xPercent: 0,
					yPercent: 0
				},
				{
					autoAlpha: 0,
					xPercent: -30,
					yPercent: 30,
					duration: 0.3
				},
				'start'
			)
			.fromTo(
				`${blockSelector} .extra-content`,
				{
					autoAlpha: 1,
					yPercent: 0
				},
				{
					autoAlpha: 0,
					yPercent: 20,
					duration: 0.8
				},
				'start'
			)
			.addLabel('revert', 'start+=0.5')
			.call(
				() => {
					blockEl.classList.remove('expanded');
					Flip.from(state, {
						absolute: true
					});
				},
				undefined,
				'revert'
			)
			.set(
				`${blockSelector} .extra-header-bg`,
				{
					autoAlpha: 0
				},
				'revert'
			)
			.fromTo(
				`${blockSelector} .preview`,
				{
					autoAlpha: 0
				},
				{
					autoAlpha: 1,
					duration: 1
				},
				'<0.5'
			)
			.to(
				'div.gate',
				{
					opacity: 0,
					duration: 1
				},
				'<'
			)
			.set('div.gate', { zIndex: -1 })
			.set(blockSelector, { zIndex: 'unset' })
			.call(() => {
				expansion.set(null);
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

			if ($expansion !== null) {
				revertImmediately($expansion, () => {
					// Setting of breakpoint needs to happen after GSAP is done reverting
					grid = grid.setBreakpoint(breakpoint);
					blocks = grid.blocks;
				});
			} else {
				grid = grid.setBreakpoint(breakpoint);
				blocks = grid.blocks;
			}
		}

		// TODO: throttle this (so far it doesn't seem like I need to...)
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
		<div class="gate" />
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
		grid-column-start: var(--column-start-expanded);
		grid-row-start: var(--row-start-expanded);
		grid-column-end: var(--column-end-expanded);
		grid-row-end: var(--row-end-expanded);
	}

	div.gate {
		background-color: var(--colourbackground);
		bottom: 0;
		height: 100vh;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: 100vw;
		opacity: 0;
		z-index: -1;
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
