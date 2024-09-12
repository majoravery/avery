<script lang="ts">
	import { CANVAS_DIMENSIONS_DESKTOP, INITIAL_BLOCKS } from '$lib/constants';
	import { Grid } from '$lib/grid';
	import { isDebugMode } from '$lib/stores/debugMode';
	import Block from './Block.svelte';

	let grid = new Grid(CANVAS_DIMENSIONS_DESKTOP, INITIAL_BLOCKS);
	let blocks = grid.blocks;
</script>

<section>
	<!-- The 3rem subtracted from min-height accounts for the vertical block padding -->
	{#each blocks as block}
		<div
			class="block"
			style:grid-column={`${block.x} / span ${block.width}`}
			style:grid-row={`${block.y} / span ${block.height}`}
			style:padding-bottom={`(${block.height} / ${block.width} * 100)%`}
			style:min-height={`calc(${block.height} * var(--cell-unit-dimension) - 3rem)`}
		>
			{#if $isDebugMode}
				width: {block.width}<br />
				height: {block.height}<br />
				x: {block.x}<br />
				y: {block.y}<br />
			{:else}
				<Block {block} />
			{/if}
		</div>
	{/each}
</section>

<style>
	section {
		--container-height: 100%;
		--container-max-height: 900px;
		--container-max-width: 1800px;
		--grid-columns: repeat(8, 1fr);
		--grid-rows: repeat(4, 1fr);

		/* TODO: this needs to change depending on desktop or mobile */
		display: grid;
		gap: var(--grid-gap);
		grid-template-columns: var(--grid-columns);
		grid-template-rows: var(--grid-rows);
		height: var(--container-height);
		margin: auto;
		max-height: var(--container-max-height);
		max-width: var(--container-max-width);
		width: 100%;
	}

	div.block {
		background: rgb(255, 255, 255);
		border-radius: var(--border-radius-l);
		overflow: hidden;
		padding: 1.5rem;
		position: relative;
	}
</style>
