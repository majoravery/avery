<script lang="ts">
	import { getBlock } from '$lib/blocks';
	import { onMount } from 'svelte';

	export let block: Block;
	let component: any;

	let componentName = getBlock(block.type);

	onMount(async () => {
		component = (await import(`$lib/blocks/${componentName}.svelte`)).default;
	});
</script>

<svelte:component this={component} />
