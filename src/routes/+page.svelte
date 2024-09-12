<script lang="ts">
	import Grid from './Grid.svelte';
	import { theme } from '$lib/stores/theme';

	import '../styles.css';
</script>

<main style="--background-color: {$theme[0]}">
	<Grid />
</main>

<style>
	main {
		box-sizing: border-box;
		background-color: var(--background-color);
		height: 100%;
		padding: 40px;
		width: 100%;
	}
</style>
