import { writable } from 'svelte/store';

// import palettes from 'nice-color-palettes';
// const palette = random.shuffle(random.pick(palettes)).slice(0, 3);

// Selected from nice-color-palettes
export const PALETTES: Palette[] = [
	['#452632', '#e2f7ce', '#91204d'], // burgundy, pale mint, deep berry
	['#f0a830', '#fcebb6', '#5e412f'], // bright mustard, light yellow cream, dark brown
	['#f26c4f', '#e9f2f9', '#1b325f'], // peach, light sky blue, dark navy blue
	['#535233', '#f5f4d7', '#951f2b'], // foresty green, light yellow cream, burgundy
	['#4f8699', '#dad6ca', '#6a5e72'], // steel blue, light grey, medium grey
	['#3a89c9', '#e9f2f9', '#1b325f'], // ocean blue, light sky blue, dark navy blue
	['#2d2d29', '#dfece6', '#215a6d'], // charcoal olive, light mint grey, teal
	['#696758', '#eee6ab', '#36393b'], // foresty green, yellow cream, dark grey
	['#de6262', '#f5e0d3', '#4d3b3b'] // peach pink, light baby pink, medium brown
];

export const theme = writable<Palette>();
