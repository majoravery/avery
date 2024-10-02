<script lang="ts">
	export let standout: boolean = false;
</script>

<div class="eyebrow" class:standout>
	<slot />
</div>

<style>
	:root {
		--eyebrow-height: 14px;
		--eyebrow-standout-padding-x: 0.2rem;
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
		line-height: var(--eyebrow-height);
		position: relative;
		text-transform: uppercase;
		z-index: 10;
	}

	div.eyebrow.standout {
		background: var(--color-filler);
		border: 1px solid var(--color-filler);
		border-radius: var(--border-radius-s);
		padding: var(--eyebrow-standout-padding-x) 0.3rem;
	}
</style>
