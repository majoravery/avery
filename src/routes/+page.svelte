<script lang="ts">
	import Grid from './Grid.svelte';
	import { theme } from '$lib/stores/theme';

	import '../styles.css';
</script>

<main
	style="--color-background: {$theme[0]}; --color-filler: {$theme[1]}; --color-accent: {$theme[2]}"
>
	<Grid />
</main>

<style>
	main {
		box-sizing: border-box;
		background-color: var(--color-background);
		height: 100%;
		padding: 40px;
		width: 100%;
	}
</style>
