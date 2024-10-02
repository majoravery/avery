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
	// Cooking: { expandedWidth: 2, expandedHeight: 2 }
	// ListeningTo: { expandedWidth: 2, expandedHeight: 2 },
	// Reading: { expandedWidth: 2, expandedHeight: 2 }
};

export const expansion = writable<BlockExpanded | null>(undefined);

export function canBlockExpand(block: BlockExpanded, breakpoint: number): boolean {
	// get canvas dimensions via breakpoint
	const canvas = CANVAS_TYPES[breakpoint];

	// get max block x after expansion
	// get max block y after expansion
	const { x, y, expandedWidth, expandedHeight } = block;
	const maxX = x + expandedWidth;
	const maxY = y + expandedHeight;

	const deltaX = maxX - canvas.width;
	const deltaY = maxY - canvas.height;

	if (deltaX > 0) {
		// if yes, expand inwards (this should work for now as max expansion is only width 2)
	}

	if (deltaY > 0) {
		// if yes, move up by delta and expand
	}

	return false;
}
