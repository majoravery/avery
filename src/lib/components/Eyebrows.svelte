<script lang="ts">
	import arrowTopRight from '$lib/svg/arrow-up-right.svg';

	export let standout: boolean = false;
	export let arrowAlt: string | undefined = undefined;
	export let isHover: boolean = false;
</script>

<div class="header" class:hover={isHover}>
	<div class="eyebrow" class:standout><slot /></div>
	{#if arrowAlt}
		<span class="arrow">
			<img src={arrowTopRight} alt={arrowAlt} />
		</span>
	{/if}
	<span class="hover">hello </span>
</div>

<style>
	span.hover {
		display: none;
		background-color: var(--color-background);
		border-bottom-left-radius: var(--border-radius-m);
		height: calc(var(--dimension) * 3);
		position: absolute;
		right: calc(var(--block-padding) * -1);
		top: calc(var(--block-padding) * -1);
		width: calc(var(--dimension) * 3);
	}

	/* span.hover:before {
		content: '';
		position: absolute;
		background-color: red;
		height: calc(var(--dimension) * 3);
		width: calc(var(--dimension) * 3);
		top: 0;
		right: calc(var(--dimension) * 3);
	} */

	div.header {
		--dimension: 14px;

		display: flex;
		justify-content: space-between;
		position: relative;
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

	span.arrow {
		display: inline-block;
		line-height: var(--dimension);
	}

	/* span.arrow:before {
		content: '';
		background-color: red;
		position: absolute;
		border-top-right-radius: var(--border-radius-m);
		width: calc(var(--dimension) + var(--block-padding));
		height: calc(var(--dimension) + var(--block-padding));
		top: calc(var(--block-padding) * -1);
		right: calc((var(--dimension) + var(--block-padding)) + var(--block-padding) * -1);
	}

	span.arrow:after {
		content: '';
		background-color: red;
		position: absolute;
		border-top-right-radius: var(--border-radius-m);
		width: calc(var(--dimension) + var(--block-padding));
		height: calc(var(--dimension) + var(--block-padding));
		right: calc(var(--block-padding) * -1);
		top: calc((var(--dimension) + var(--block-padding)) + var(--block-padding) * -1);
	} */

	span.arrow img {
		transform-origin: center;
		width: var(--dimension);
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
