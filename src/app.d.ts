// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			locale: Locale;
		}
		// interface Platform {}
	}

	interface MainPageData {
		locale: Locale;
		pageViewCount: number;
		palette: Palette;
		visitorCount: number;
		weathers: Record<Locale, Weather>;
	}

	interface Dimensions {
		height: number;
		width: number;
	}

	interface Position {
		x: number;
		y: number;
		order?: number;
	}

	type Palette = string[];

	type BlockType = 'square' | 'wide' | 'tall' | 'long' | 'single';
	type BlockContent =
		| 'Clock'
		| 'Contact'
		| 'Cooking'
		| 'Description'
		| 'Filler'
		| 'Info'
		| 'Language'
		| 'ListeningTo'
		| 'Name'
		| 'Pattern'
		| 'ProjectShowcase'
		| 'QrCode'
		| 'Reading'
		| 'Recently'
		| 'Watching'
		| 'Wave'
		| 'Weather';

	interface Block extends Dimensions, Position {
		content: BlockContent | string; // defining this as string for that initial definition... ugh
		occupiedIndices: number[];
		type: BlockType;
	}

	interface BlockExpansion {
		expandedWidth: number;
		expandedHeight: number;
	}

	interface BlockExpanded extends Block, BlockExpansion {}

	type Expansions = {
		[Partial<BlockContent>]: BlockExpansion;
	};

	type Breakpoint = number;

	interface Canvas extends Dimensions {
		blocks: Block[];
	}

	type CanvasTypes = Record<Breakpoint, Canvas>;

	type Locale = 'en' | 'zh' | 'de' | 'jp';

	type ConditionCode = 'sunny' | 'cloudy' | 'foggy' | 'rain' | 'storm' | 'snow' | 'sleet';

	interface Condition {
		code: ConditionCode;
		text: string;
	}

	interface Forecast {
		date: string;
		temp: number;
	}

	interface Weather {
		condition: Condition;
		forecasts: Forecast[];
	}

	/**
	 * Supabase responses
	 */
	interface WeatherSpResponse {
		id: string;
		created_at: string;
		weather: string;
	}
}

export {};
