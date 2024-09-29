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
</div>

<style>
	div.header {
		display: flex;
		justify-content: space-between;
	}

	div.eyebrow {
		align-self: flex-start;
		color: rgb(20, 83, 45);
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
		padding: 0.2rem 0.3rem;
		background: var(--color-filler);
		border-radius: var(--border-radius-s);
		border: 1px solid var(--color-filler);
	}

	span.arrow {
		display: inline-block;
		line-height: 14px;
	}

	span.arrow img {
		transform-origin: center;
		width: 14px;
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
