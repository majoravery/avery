import { getRandomInt } from '$lib/utils';
import { CANVAS_TYPES } from './constants';
// import { isDebugMode } from '$lib/stores/debugMode';

/**
 * Method:
 *
 * 1) Initialise a set of a "flattened" grid of indices, top down, from left to right.
 * 2) Go through array of blocks (manually sorted by size) and attempt to place on canvas by
 *  a) Getting a random position on canvas
 *  b) Get flat grid indices that will be occupied by current block if placed in that position
 *  c) Check if that position is valid
 *  d) If it does, delete the index from the set
 *  e) Repeat from a) if not (max 50 tries, but it's rarely reached)
 *
 */

export class Grid {
	breakpoint: number;
	canvas: Canvas;
	flattenedGrid: Set<number> = new Set();
	placedBlocks: Block[] = [];

	constructor(breakpoint: number) {
		this.breakpoint = breakpoint;
		this.canvas = CANVAS_TYPES[breakpoint];

		this.init();
	}

	init() {
		this.flattenedGrid = this.initFlattenedGrid();
		this.placedBlocks = this.placeBlocks(this.canvas.blocks);
	}

	initFlattenedGrid(): Set<number> {
		const fg = new Set<number>();
		for (let i = 0; i < this.canvas.width * this.canvas.height; i++) {
			fg.add(i);
		}
		return fg;
	}

	getCurrentBreakpoint(): number {
		return this.breakpoint;
	}

	setBreakpoint(breakpoint: number): Grid {
		this.breakpoint = breakpoint;
		this.canvas = CANVAS_TYPES[breakpoint];

		this.init();
		return this;
	}

	placeBlocks(blocks: Block[]): Block[] {
		let blocksToPlace: Block[] = blocks;
		const blocksPlaced: Block[] = [];

		// If in first breakpoint (mobile)
		if (this.breakpoint === 0) {
			const nameContent = 'Name';
			const nameBlock = blocks.find((block) => block.content === nameContent);
			if (!nameBlock) throw new Error('Could not find Name block');
			const namePosition = this.getGridPositionForMultiCellBlock(nameBlock, { x: 0, y: 0 });
			blocksPlaced.push({ ...nameBlock, ...namePosition });
			blocksToPlace = blocks.filter((block) => block.content !== nameContent);
		}

		blocksPlaced.push(
			...blocksToPlace.map((block) => {
				const position =
					block.width * block.height !== 1
						? this.getGridPositionForMultiCellBlock(block)
						: this.getGridPositionForSingleCellBlock();
				return {
					...block, // type, content, width and height
					...position // x and y
				};
			})
		);

		return blocksPlaced;
	}

	get blocks() {
		return this.placedBlocks;
	}

	getGridPositionForSingleCellBlock(): Position {
		// Does not utilise canBlockFitOnGrid as randomly selecting
		// leftover cells is simpler and more efficient
		const flatCanvasIndices = [...this.flattenedGrid];
		const flatGridIndex = getRandomInt(0, flatCanvasIndices.length - 1);
		const index = flatCanvasIndices[flatGridIndex];

		this.flattenedGrid.delete(index);
		const gridPosition = this.getGridPositionFromIndex(index);

		return {
			x: gridPosition[0] + 1,
			y: gridPosition[1] + 1,
			order: index
		};
	}

	getGridPositionFromIndex(index: number): [number, number] {
		return [index % this.canvas.width, Math.floor(index / this.canvas.width)];
	}

	getGridPositionForMultiCellBlock(block: Block, overwritePos?: Position): Position {
		let occupiedIndices: boolean | number[] = [],
			gridPosition: [number, number] = [0, 0],
			canBlockFit,
			n = 0;

		while (n < 50) {
			// TODO: cache attempted gridPosition
			// TODO: account for impossible placements (doesn't happen now bc tall block are applied first)
			n++;

			gridPosition = overwritePos
				? [overwritePos.x, overwritePos.y]
				: this.getRandomPositionOnGrid();
			// if (isDebugMode) {
			// 	console.log(
			// 		`Trying to place ${block.width}x${block.height} block at ${gridPosition[0]}, ${gridPosition[0]}...`
			// 	);
			// }

			occupiedIndices = this.getBlockCells(block, gridPosition);
			if (typeof occupiedIndices === 'boolean' && !occupiedIndices) {
				// if (isDebugMode) {
				// 	console.warn(
				// 		`Exceeded canvas boundaries when placing ${block.width}x${block.height} block (try: ${n})`
				// 	);
				// }
				continue;
			}
			// if (isDebugMode) {
			// 	console.log({ occupiedIndices });
			// }

			// TODO: rewrite this so occupiedIndices is just number[]
			canBlockFit = this.canBlockFitOnGrid(occupiedIndices as number[]);
			// if (isDebugMode) {
			// 	console.log({ canBlockFit });
			// }

			if (canBlockFit) {
				(occupiedIndices as number[]).forEach((index) => this.flattenedGrid.delete(index));

				// Targeted cells are already occupied by other blocks
				break;
			}
		}

		// TODO: find out why + 1?
		return {
			x: gridPosition[0] + 1,
			y: gridPosition[1] + 1,
			order: Array.isArray(occupiedIndices) ? occupiedIndices.sort((a, b) => a - b)[0] : -1,
			occupiedIndices // not adding typing for this as it's for debugging purposes only
		};
	}

	getRandomPositionOnGrid(): [number, number] {
		return [getRandomInt(0, this.canvas.width - 1), getRandomInt(0, this.canvas.height - 1)];
	}

	// TODO: don't exactly know how this function works again but I'll just leave it for now
	// Maybe need to rename function name
	getBlockCells(block: Block, gridPosition: [number, number]): boolean | number[] {
		if (!gridPosition) throw new Error('getBlockCells: gridPosition not found');
		if (!block) throw new Error('getBlockCells: block not found');
		if (!this.canvas) throw new Error('getBlockCells: canvasDimensions not found');

		const [cursorX, cursorY] = gridPosition;

		// Cursors for multi-cell blocks shouldn't start on last row or last column
		if (cursorX >= this.canvas.width || cursorY >= this.canvas.height) {
			return false;
		}

		const { width: blockWidth, height: blockHeight } = block;

		const occupiedIndicesH = [];
		const occupiedIndicesV = [];
		const occupiedIndices = [];

		for (let w = 0; w < blockWidth; w++) {
			const index = cursorY * this.canvas.width + cursorX + w;
			// Since we're using a flat grid system, ensure that block doesn't "wrap" around
			if (Math.floor(index / this.canvas.width) !== cursorY) {
				return false;
			}
			occupiedIndicesH.push(index);
		}

		for (let h = 0; h < blockHeight; h++) {
			occupiedIndicesV.push((h + cursorY) * this.canvas.width + cursorX);
		}

		if (blockWidth > 1 && blockHeight > 1) {
			for (let w = 1; w < blockWidth; w++) {
				for (let h = 1; h < blockHeight; h++) {
					occupiedIndices.push(occupiedIndicesH[w] + occupiedIndicesV[h] - occupiedIndicesH[0]);
				}
			}
		}

		const occupiedIndicesSet = new Set([
			...occupiedIndices,
			...occupiedIndicesH,
			...occupiedIndicesV
		]);
		let doesBlockFit = true;
		occupiedIndicesSet.forEach((index) => {
			doesBlockFit = index >= this.canvas.width * this.canvas.height ? false : true;
		});

		return doesBlockFit && [...occupiedIndicesSet];
	}

	canBlockFitOnGrid(indices: number[]) {
		if (!indices) throw new Error('canBlockFitOnGrid: indices not found');

		let canBlockFit = true;
		indices.forEach((index) => {
			if (!this.flattenedGrid.has(index)) {
				canBlockFit = false;
			}
		});

		return canBlockFit;
	}
}
