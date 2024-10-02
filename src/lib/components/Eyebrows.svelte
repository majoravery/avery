<script lang="ts">
	import arrowUpRight from '$lib/svg/arrow-up-right.svg';

	export let arrowAlt: string | undefined = undefined;
	export let standout: boolean = false;
	export let isHover: boolean = false;
</script>

<div class="header" class:hover={isHover}>
	<div class="eyebrow" class:standout><slot /></div>
	{#if arrowAlt}
		<span class="arrow-external">
			<img src={arrowUpRight} alt={arrowAlt} />
		</span>
	{/if}
</div>

<style>
	:root {
		--eyebrow-height: 14px;
	}

	div.header {
		display: flex;
		justify-content: space-between;
		position: relative;
		z-index: 10;
	}

	div.eyebrow {
		align-self: flex-start;
		color: var(--color-accent);
		display: inline;
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
		position: relative;
		text-transform: uppercase;
		z-index: 3;
	}

	div.eyebrow.standout {
		background: var(--color-filler);
		border: 1px solid var(--color-filler);
		border-radius: var(--border-radius-s);
		padding: 0.2rem 0.3rem;
	}

	span.arrow-external {
		display: inline-block;
		line-height: var(--eyebrow-height);
	}

	span.arrow-external img {
		transform-origin: center;
		width: var(--eyebrow-height);
	}

	div.header.hover img {
		animation-name: wheee;
		animation-duration: 400ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
	}

	@keyframes wheee {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(720deg);
		}
	}
</style>
