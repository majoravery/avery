import { writable } from 'svelte/store';

let isDebug = false;

// Check the query parameter for `debug=1`
if (typeof window !== 'undefined') {
	const params = new URLSearchParams(window.location.search);
	isDebug = params.get('debug') === '1';
}

export const isDebugMode = writable(isDebug);
