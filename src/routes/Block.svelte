<script lang="ts">
	import { onMount } from 'svelte';

	export let blockContent: BlockContent;
	let component: any;

	onMount(async () => {
		component = (await import(`$lib/blocks/${blockContent}.svelte`)).default;
	});
</script>

<svelte:component this={component} />
