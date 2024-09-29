import { writable } from 'svelte/store';

export const weathers = writable<Record<Locale, Weather>>();
