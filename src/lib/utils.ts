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
