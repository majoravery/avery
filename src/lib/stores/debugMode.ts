import { writable } from 'svelte/store';

let isDebug = false;

// 1 Oct 2024: I don't really use this as much anymore
function isSpecificDebug(item: string = '1') {
	// Check the query parameter for `debug=1`
	if (typeof window !== 'undefined') {
		const params = new URLSearchParams(window.location.search);
		isDebug = params.get('debug') === item;
	}
	return isDebug;
}

export const isDebugMode = writable(isSpecificDebug());
export const isDebugLanguage = writable(isSpecificDebug('language'));
