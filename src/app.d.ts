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

	type BlockType = 'square' | 'wide' | 'tall' | 'long' | 'single';
	type BlockContent =
		| 'Marquee'
		| 'ProjectShowcase'
		| 'Weather'
		| 'Name'
		| 'Clock'
		| 'Stats'
		| 'Description'
		| 'Contact'
		| 'Language'
		| 'QrCode'
		| 'Smiley'
		| 'UseDesktop'
		| 'Wave'
		| 'Pattern'
		| 'Filler';

	interface Block extends Dimensions, Position {
		type: BlockType;
	}

	interface BlockWithContent extends Block {
		content: BlockContent;
	}

	interface Canvas extends Dimensions {
		blocks: BlockWithContent[];
	}

	type Breakpoint = number;

	type CanvasTypes = Record<Breakpoint, Canvas>;
}

export {};
