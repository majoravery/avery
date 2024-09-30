import { getLocaleWeather } from '$lib/weather.js';
import { PALETTES } from '$lib/stores/theme';
import { random } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { VALID_LOCALES } from '$lib/stores/locale';
import * as supabase from '$lib/supabase.js';

export const prerender = true;
export const trailingSlash = 'always';

export async function load({ cookies, params, request }): Promise<MainPageData> {
	// TODO: Properly type params
	if (!VALID_LOCALES.includes(params.locale as Locale)) {
		redirect(307, '/en');
	}

	/**
	 * Palette
	 */
	const palette = random.pick(PALETTES);

	/**
	 * Info
	 */
	// Don't log my own pageviews during dev lol
	if (!request.url.includes('localhost')) {
		let visitorId = cookies.get('visitorid');
		if (!visitorId) {
			visitorId = crypto.randomUUID();
			cookies.set('visitorid', visitorId, { path: '/' });
		}
		await supabase.addPageView(visitorId);
	}

	const pageViewCount = await supabase.getPageView();
	const visitorCount = await supabase.getVisitors();

	/**
	 * Weather forecast
	 */
	const promises = VALID_LOCALES.map(async (locale) => getLocaleWeather(locale));
	const forecasts = await Promise.all(promises);
	const weatherEntries = forecasts.map((f, i) => [VALID_LOCALES[i], f]);
	const weathers = Object.fromEntries(weatherEntries);

	return {
		locale: params.locale as Locale,
		pageViewCount,
		palette,
		visitorCount,
		weathers
	};
}
