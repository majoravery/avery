import { writable } from 'svelte/store';

export const pageviews = writable<number>();
export const visitors = writable<number>();
