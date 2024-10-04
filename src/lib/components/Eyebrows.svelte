<script lang="ts">
	export let standout: boolean = false;
</script>

<div class="eyebrow" class:standout>
	<slot />
</div>

<style>
	:root {
		--eyebrow-height: 14px;
		--eyebrow-standout-padding-x: 3.2px;
	}

	div.eyebrow {
		align-self: flex-start;
		color: var(--colour-accent);
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
		background: var(--colour-filler);
		border: 1px solid var(--colour-filler);
		border-radius: var(--border-radius-s);
		padding: var(--eyebrow-standout-padding-x) 4.8px;
	}
</style>
