export const CANVAS_DIMENSIONS_MOBILE: Dimensions = { width: 3, height: 10 };
export const CANVAS_DIMENSIONS_DESKTOP: Dimensions = { width: 8, height: 4 };

export const BLOCK_TYPES: Record<string, Block> = {
	square: { width: 2, height: 2 },
	wide: { width: 3, height: 1 },
	tall: { width: 1, height: 2 },
	long: { width: 2, height: 1 },
	single: { width: 1, height: 1 }
} as const;

export const INITIAL_BLOCKS = [
	BLOCK_TYPES.square,
	BLOCK_TYPES.square,
	BLOCK_TYPES.wide,
	BLOCK_TYPES.tall,
	BLOCK_TYPES.long,
	BLOCK_TYPES.long,
	BLOCK_TYPES.long,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single,
	BLOCK_TYPES.single
];
