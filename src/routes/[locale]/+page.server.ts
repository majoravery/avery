import { getLocaleWeather } from '$lib/weather.js';
import { redirect } from '@sveltejs/kit';
import { VALID_LOCALES } from '$lib/stores/locale';
import * as supabase from '$lib/supabase.js';

export const prerender = true;
export const trailingSlash = 'always';

export async function load({ params }): Promise<MainPageData> {
	// TODO: Properly type params
	if (!VALID_LOCALES.includes(params.locale as Locale)) {
		redirect(307, '/en');
	}

	/**
	 * Info
	 */
	const pageViewCount = await supabase.getPageView();
	const visitorCount = await supabase.getVisitors();

	/**
	 * Weather forecast
	 */
	const weather = await getLocaleWeather(params.locale as Locale);

	return {
		locale: params.locale as Locale,
		pageViewCount,
		visitorCount,
		weather
	};
}
