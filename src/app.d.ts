// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Dimensions {
		height: number;
		width: number;
	}

	interface Position {
		x?: number;
		y?: number;
	}

	interface Block extends Dimensions, Position {
		type: BlockType;
		// displayOnMobile?: boolean;
	}

	type BlockType = 'square' | 'wide' | 'tall' | 'long' | 'single';
}

export {};
