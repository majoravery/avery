import { random } from '$lib/utils';
import { writable } from 'svelte/store';
import palettes from 'nice-color-palettes';

const palette = random.shuffle(random.pick(palettes)).slice(0, 3);

export const theme = writable<string[]>(palette);
