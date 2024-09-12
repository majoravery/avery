<script lang="ts">
	import Grid from './Grid.svelte';
	import { random } from '$lib/utils';
	import { theme } from '$lib/stores/theme';

	import '../styles.css';

	let i = 0;

	const palettesILike = [
		['#a5a36c', '#f5f4d7', '#535233'],
		['#452632', '#e2f7ce', '#91204d'],
		['#f0a830', '#fcebb6', '#5e412f'],
		['#f26c4f', '#e9f2f9', '#1b325f'],
		['#535233', '#f5f4d7', '#951f2b'],
		['#4f8699', '#dad6ca', '#6a5e72'],
		['#c0d860', '#789048', '#604848'], //green
		['#3a89c9', '#e9f2f9', '#1b325f'], //ocean blue
		['#2d2d29', '#dfece6', '#215a6d'], // dark brown green
		['#6c5b7b', '#f67280', '#355c7d'], // purple pink
		['#1c0113', '#a30006', '#c21a01'], // very dark wine and red
		['#6b0103', '#f03c02', '#1c0113'], // burgundy and orange
		['#696758', '#eee6ab', '#36393b'], // foresty green and yellow
		['#de6262', '#f5e0d3', '#4d3b3b'] // peach pink
	];

	function shuffle() {
		theme.update((theme: string[]) => random.shuffle(theme));
	}

	function copy() {
		navigator.clipboard.writeText(`[${$theme.map((value) => `'${value}'`).join(',')}],`);
	}

	function next() {
		theme.set(palettesILike[i]);
		i++;
		if (i === palettesILike.length) {
			i = 0;
		}
	}

	$: {
		console.log($theme);
	}
</script>

<main
	style="--color-background: {$theme[0]}; --color-filler: {$theme[1]}; --color-accent: {$theme[2]}"
>
	<Grid />
</main>

<div>
	<button on:click={shuffle}>Shuffle existing colours</button>
	<button on:click={copy}>Save current colours</button>
	<button on:click={next}>Next fav colours</button>
</div>

<style>
	main {
		box-sizing: border-box;
		background-color: var(--color-background);
		height: 100%;
		padding: 40px;
		width: 100%;
	}

	div {
		position: absolute;
		top: 1em;
		left: 1em;
	}
</style>
