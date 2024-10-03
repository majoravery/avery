export const BLOCK_SIZES: Record<number, number> = {
	0: 150,
	1400: 170,
	1680: 190
};

// TODO: smfh i dunno how i fucked up this typing again
export const BLOCKS: Record<BlockType, Block> = {
	square: { type: 'square', width: 2, height: 2, content: '' },
	wide: { type: 'wide', width: 3, height: 1, content: '' },
	tall: { type: 'tall', width: 1, height: 2, content: '' },
	long: { type: 'long', width: 2, height: 1, content: '' },
	single: { type: 'single', width: 1, height: 1, content: '' }
} as const;

export const CANVAS_TYPES: CanvasTypes = {
	0: {
		width: 2,
		height: 15,
		blocks: [
			{ ...BLOCKS.square, content: 'Recently' },
			{ ...BLOCKS.square, content: 'ProjectShowcase' },
			{ ...BLOCKS.square, content: 'Description' },
			{ ...BLOCKS.tall, content: 'Weather' },
			{ ...BLOCKS.long, content: 'Name' },
			{ ...BLOCKS.long, content: 'Clock' },
			{ ...BLOCKS.long, content: 'Info' },
			{ ...BLOCKS.single, content: 'Contact' },
			{ ...BLOCKS.single, content: 'Language' },
			{ ...BLOCKS.single, content: 'QrCode' },
			{ ...BLOCKS.single, content: 'ListeningTo' },
			{ ...BLOCKS.single, content: 'Reading' },
			{ ...BLOCKS.single, content: 'Pattern' }, // was Watching. Switch back when ready?
			{ ...BLOCKS.single, content: 'Cooking' },
			{ ...BLOCKS.single, content: 'Wave' },
			{ ...BLOCKS.single, content: 'Pattern' },
			{ ...BLOCKS.single, content: 'Filler' }
		]
	},
	480: {
		width: 3,
		height: 10,
		blocks: [
			{ ...BLOCKS.square, content: 'Recently' },
			{ ...BLOCKS.square, content: 'ProjectShowcase' },
			{ ...BLOCKS.wide, content: 'Description' },
			{ ...BLOCKS.tall, content: 'Weather' },
			{ ...BLOCKS.long, content: 'Name' },
			{ ...BLOCKS.long, content: 'Clock' },
			{ ...BLOCKS.long, content: 'Info' },
			{ ...BLOCKS.single, content: 'Contact' },
			{ ...BLOCKS.single, content: 'Language' },
			{ ...BLOCKS.single, content: 'QrCode' },
			{ ...BLOCKS.single, content: 'ListeningTo' },
			{ ...BLOCKS.single, content: 'Reading' },
			{ ...BLOCKS.single, content: 'Pattern' }, // was Watching. Switch back when ready?
			{ ...BLOCKS.single, content: 'Cooking' },
			{ ...BLOCKS.single, content: 'Wave' },
			{ ...BLOCKS.single, content: 'Pattern' },
			{ ...BLOCKS.single, content: 'Filler' },
			{ ...BLOCKS.single, content: 'Filler' }
		]
	},
	768: {
		width: 4,
		height: 8,
		blocks: [
			{ ...BLOCKS.square, content: 'Recently' },
			{ ...BLOCKS.square, content: 'ProjectShowcase' },
			{ ...BLOCKS.wide, content: 'Description' },
			{ ...BLOCKS.tall, content: 'Weather' },
			{ ...BLOCKS.long, content: 'Name' },
			{ ...BLOCKS.long, content: 'Clock' },
			{ ...BLOCKS.long, content: 'Info' },
			{ ...BLOCKS.single, content: 'Contact' },
			{ ...BLOCKS.single, content: 'Language' },
			{ ...BLOCKS.single, content: 'QrCode' },
			{ ...BLOCKS.single, content: 'ListeningTo' },
			{ ...BLOCKS.single, content: 'Reading' },
			{ ...BLOCKS.single, content: 'Pattern' }, // was Watching. Switch back when ready?
			{ ...BLOCKS.single, content: 'Cooking' },
			{ ...BLOCKS.single, content: 'Wave' },
			{ ...BLOCKS.single, content: 'Pattern' },
			{ ...BLOCKS.single, content: 'Filler' },
			{ ...BLOCKS.single, content: 'Pattern' },
			{ ...BLOCKS.single, content: 'Filler' },
			{ ...BLOCKS.single, content: 'Filler' }
		]
	},
	1024: {
		width: 6,
		height: 5,
		blocks: [
			{ ...BLOCKS.square, content: 'Recently' },
			{ ...BLOCKS.square, content: 'ProjectShowcase' },
			{ ...BLOCKS.wide, content: 'Description' },
			{ ...BLOCKS.tall, content: 'Weather' },
			{ ...BLOCKS.long, content: 'Name' },
			{ ...BLOCKS.long, content: 'Clock' },
			{ ...BLOCKS.long, content: 'Info' },
			{ ...BLOCKS.single, content: 'Contact' },
			{ ...BLOCKS.single, content: 'Language' },
			{ ...BLOCKS.single, content: 'QrCode' },
			{ ...BLOCKS.single, content: 'ListeningTo' },
			{ ...BLOCKS.single, content: 'Reading' },
			{ ...BLOCKS.single, content: 'Pattern' }, // was Watching. Switch back when ready?
			{ ...BLOCKS.single, content: 'Cooking' },
			{ ...BLOCKS.single, content: 'Wave' },
			{ ...BLOCKS.single, content: 'Pattern' },
			{ ...BLOCKS.single, content: 'Filler' },
			{ ...BLOCKS.single, content: 'Filler' }
		]
	},
	1280: {
		width: 8,
		height: 4,
		blocks: [
			{ ...BLOCKS.square, content: 'Recently' },
			{ ...BLOCKS.square, content: 'ProjectShowcase' },
			{ ...BLOCKS.wide, content: 'Description' },
			{ ...BLOCKS.tall, content: 'Weather' },
			{ ...BLOCKS.long, content: 'Name' },
			{ ...BLOCKS.long, content: 'Clock' },
			{ ...BLOCKS.long, content: 'Info' },
			{ ...BLOCKS.single, content: 'Contact' },
			{ ...BLOCKS.single, content: 'Language' },
			{ ...BLOCKS.single, content: 'QrCode' },
			{ ...BLOCKS.single, content: 'ListeningTo' },
			{ ...BLOCKS.single, content: 'Reading' },
			{ ...BLOCKS.single, content: 'Pattern' }, // was Watching. Switch back when ready?
			{ ...BLOCKS.single, content: 'Cooking' },
			{ ...BLOCKS.single, content: 'Wave' },
			{ ...BLOCKS.single, content: 'Pattern' },
			{ ...BLOCKS.single, content: 'Filler' },
			{ ...BLOCKS.single, content: 'Pattern' },
			{ ...BLOCKS.single, content: 'Filler' },
			{ ...BLOCKS.single, content: 'Filler' }
		]
	}
};
