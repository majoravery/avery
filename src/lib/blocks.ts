/**
 * Generator functions
 *
 */

function* genSquare() {
	while (true) {
		yield 'Marquee';
		yield 'Note';
	}
}

function* genTall() {
	while (true) {
		yield 'Weather';
	}
}

function* genLong() {
	while (true) {
		yield 'Name';
		yield 'Clock';
		yield 'Stats';
	}
}

function* genWide() {
	while (true) {
		yield 'Description';
	}
}

// Count: 13 for desktop, 11 for mobile
function* genSingle() {
	yield 'Contact';
	yield 'Language';
	yield 'QrCode';
	yield 'Smiley';
	yield 'UseDesktop';
	yield 'Wave';

	yield 'Pattern';
	yield 'Pattern';

	yield 'Filler';
	yield 'Filler';
	yield 'Filler';
}

function* genSingleDesktop() {
	while (true) {
		yield* genSingle();
		yield 'Pattern';
		yield 'Filler';
	}
}

const BLOCKS_GENERATOR_MAP = {
	square: genSquare(),
	tall: genTall(),
	long: genLong(),
	wide: genWide(),
	single: genSingleDesktop()
};

export function getBlock(blockType: BlockType) {
	return BLOCKS_GENERATOR_MAP[blockType].next().value;
}
