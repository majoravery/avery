<script lang="ts">
	import { CANVAS_DIMENSIONS_DESKTOP, INITIAL_BLOCKS } from '$lib/constants';
	import { Grid } from '$lib/grid';
	import { isDebugMode } from '$lib/stores/debugMode';

	let grid = new Grid(CANVAS_DIMENSIONS_DESKTOP, INITIAL_BLOCKS);
	let blocks = grid.blocks;
</script>

<section>
	{#each blocks as block}
		<div
			style:grid-column={`${block.x} / span ${block.width}`}
			style:grid-row={`${block.y} / span ${block.height}`}
			style:padding-bottom={`(${block.height} / ${block.width} * 100)%`}
		>
			{#if $isDebugMode}
				widthisDebugModeh}<br />
				height: {block.height}<br />
				x: {block.x}<br />
				y: {block.y}<br />
			{:else}
				hi
			{/if}
		</div>
	{/each}
</section>

<style>
	section {
		--container-height: 100%;
		--container-max-height: 600px;
		--container-max-width: 1200px;
		--grid-columns: repeat(8, 1fr);
		--grid-rows: repeat(4, 1fr);

		/* TODO: this needs to change depending on desktop or mobile */
		display: grid;
		gap: 0.25rem;
		grid-template-columns: var(--grid-columns);
		grid-template-rows: var(--grid-rows);
		height: var(--container-height);
		max-height: var(--container-max-height);
		max-width: var(--container-max-width);
		width: 100%;
	}

	div {
		background: rgb(255, 255, 255);
		padding: 2.5rem;
		border-radius: 0.75rem;
	}
</style>
