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
		visitorCount: number;
		weather: Weather;
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
		type: BlockType;
	}

	interface BlockWithContent extends Block {
		content: BlockContent;
	}

	type Breakpoint = number;

	interface Canvas extends Dimensions {
		blocks: BlockWithContent[];
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
