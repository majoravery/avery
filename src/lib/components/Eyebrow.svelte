<script lang="ts">
	export let invert: boolean = false;
</script>

<div class="eyebrow" class:invert><slot /></div>

<style>
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

	div.eyebrow.invert {
		color: rgb(255, 255, 255);
	}
</style>
