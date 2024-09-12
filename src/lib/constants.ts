export const CANVAS_DIMENSIONS_MOBILE: Dimensions = { width: 3, height: 10 };
export const CANVAS_DIMENSIONS_DESKTOP: Dimensions = { width: 8, height: 4 };

export const BLOCKS: Record<BlockType, Block> = {
	square: { type: 'square', width: 2, height: 2 },
	wide: { type: 'wide', width: 3, height: 1 },
	tall: { type: 'tall', width: 1, height: 2 },
	long: { type: 'long', width: 2, height: 1 },
	single: { type: 'single', width: 1, height: 1 }
} as const;

export const INITIAL_BLOCKS = [
	BLOCKS.square,
	BLOCKS.square,
	BLOCKS.wide,
	BLOCKS.tall,
	BLOCKS.long,
	BLOCKS.long,
	BLOCKS.long,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single,
	BLOCKS.single
];
