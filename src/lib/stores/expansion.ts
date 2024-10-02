import { CANVAS_TYPES } from '$lib/constants';
import { writable } from 'svelte/store';

/**
 * I really don't like defining the expansion here–I wanted the block to have direct
 * control over it. But somehow higher order functions didn't work, so I just went
 * with this option.
 */
export const MAPPING_EXPANSION: Expansions = {
	Recently: { expandedWidth: 2, expandedHeight: 3 },
	ProjectShowcase: { expandedWidth: 2, expandedHeight: 3 }
	// Temporarily disabling these...
	// Cooking: { expandedWidth: 2, expandedHeight: 2 }
	// ListeningTo: { expandedWidth: 2, expandedHeight: 2 },
	// Reading: { expandedWidth: 2, expandedHeight: 2 }
};

export const expansion = writable<BlockExpanded | null>(undefined);

// Expansion Adjustment
export function getExpansionAdj(
	block: BlockExpanded,
	breakpoint: number
): { x: number; y: number } {
	// Note: canvas dimensions and x y from block are all 1-indexed

	const canvas = CANVAS_TYPES[breakpoint];

	const { x: blockX, y: blockY, expandedWidth, expandedHeight } = block;

	// Subtract 1 to account for 1-index
	const maxX = blockX + expandedWidth - 1;
	const maxY = blockY + expandedHeight - 1;

	const deltaX = maxX - canvas.width;
	const deltaY = maxY - canvas.height;

	// Negative values because it needs to move "backwards"
	const x = deltaX > 0 ? -deltaX : 0;
	const y = deltaY > 0 ? -deltaY : 0;

	return { x, y };
}
