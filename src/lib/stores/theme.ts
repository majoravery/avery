import { random } from '$lib/utils';
import { writable } from 'svelte/store';
import palettes from 'nice-color-palettes';

const colorCount = 3;
const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

export const theme = writable(palette);
