<script lang="ts">
	export let text: string;
</script>

<div>
	<span>{text}</span>
</div>

<style>
	span {
		color: var(--color-accent);
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.85rem;
	}
</style>
