import { writable } from 'svelte/store';

/**
 * I really don't like defining the expansion here–I wanted the block to have direct
 * control over it. But somehow higher order functions didn't work, so I just went
 * with this option.
 */
export const MAPPING_EXPANSION: Expansions = {
	Recently: { expandedWidth: 2, expandedHeight: 4 },
	ProjectShowcase: { expandedWidth: 2, expandedHeight: 4 },
	Cooking: { expandedWidth: 2, expandedHeight: 2 },
	ListeningTo: { expandedWidth: 2, expandedHeight: 2 },
	Reading: { expandedWidth: 2, expandedHeight: 2 }
};

export const expansion = writable<BlockExpanded | null>(undefined);

expansion.subscribe((block: BlockExpanded | null) => {
	if (!block) {
		return;
	}

	console.log(`currently expanded block`, block);
});
