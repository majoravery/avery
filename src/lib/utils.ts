import { MAPPING_LOCALE } from './constants';

export function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Random util functions from https://github.com/mattdesl/canvas-sketch-util
 */
function range(min: number, max: number) {
	if (max === undefined) {
		max = min;
		min = 0;
	}

	if (typeof min !== 'number' || typeof max !== 'number') {
		throw new TypeError('Expected all arguments to be numbers');
	}

	return Math.random() * max - min + min;
}

function rangeFloor(min: number, max: number): number {
	if (max === undefined) {
		max = min;
		min = 0;
	}

	if (typeof min !== 'number' || typeof max !== 'number') {
		throw new TypeError('Expected all arguments to be numbers');
	}

	return Math.floor(range(min, max));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pick(array: any[]) {
	if (array.length === 0) return undefined;

	return array[rangeFloor(0, array.length)];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shuffle(array: any[]) {
	if (!Array.isArray(array)) {
		throw new TypeError('Expected Array, got ' + typeof array);
	}

	let rand;
	let tmp;
	let len = array.length;
	const ret = array.slice();
	while (len) {
		rand = Math.floor(Math.random() * len--);
		tmp = ret[len];
		ret[len] = ret[rand];
		ret[rand] = tmp;
	}
	return ret;
}

export const random = {
	pick,
	shuffle
};

/**
 * Solution from https://stackoverflow.com/a/21015393/6693826
 */
export function getTextWidth(textEl: HTMLElement): number {
	const text = textEl.textContent;
	const font = window.getComputedStyle(textEl, null).getPropertyValue('font');

	// Re-use canvas object for better performance
	const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
	const context = canvas.getContext('2d');
	context.font = font;
	const metrics = context.measureText(text);
	return Math.ceil(metrics.width);
}

export function convertDateToDdmmyyyy(date: Date) {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const year = date.getFullYear();

	return `${day}${month}${year}`;
}

export function convertYyyymmddToDate(yyyymmdd: number) {
	const year = Math.floor(yyyymmdd / 10000);
	const month = Math.floor((yyyymmdd % 10000) / 100);
	const day = yyyymmdd % 100;

	return new Date(year, month, day);
}

export function getFormattedDate(date: Date, locale: Locale) {
	return date.toLocaleString(MAPPING_LOCALE[locale], {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}
