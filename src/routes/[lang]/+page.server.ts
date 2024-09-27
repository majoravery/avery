import { getCondition, getForecast } from '$lib/weather';
import { redirect } from '@sveltejs/kit';
import { VALID_LOCALES } from '$lib/stores/locale';
import { supabase } from '$lib/supabase.js';

export const trailingSlash = 'always';

// TODO: implement better caching
let forecastResponse: Record<string, any>;

export async function load({ fetch, params }): Promise<MainPageData> {
	// Info
	const { count: pageViewCount, error: pageViewError } = await supabase
		.from('page_views')
		.select('*', { count: 'exact', head: true });
	if (pageViewError) {
		throw new Error(`Error fetching page views ${pageViewError.code}: ${pageViewError.message}`);
	}
	const { data: visitors, error: visitorError } = await supabase
		.from('page_views')
		.select('visitor_id', { count: 'exact' });
	if (visitorError) {
		throw new Error(`Error fetching visitors ${visitorError.code}: ${visitorError.message}`);
	}
	const visitorCount = new Set(visitors?.map((v) => v.visitor_id));

	// Weather Forecast
	if (!VALID_LOCALES.includes(params.lang)) {
		redirect(307, '/en');
	}
	if (forecastResponse === undefined) {
		forecastResponse = await getForecast(fetch, params.lang);
	}
	const { forecast } = forecastResponse;
	const forecastsRaw = forecast.forecastday;
	const forecasts = forecastsRaw.map((f: any) => {
		return {
			date: f.date,
			temp: Math.round(f.day.avgtemp_c),
			conditionCode: getCondition(f.day.condition.code),
			conditionText: f.day.condition.text
		};
	});

	return {
		condition: {
			code: forecastsRaw[0].day.condition.code,
			text: forecastsRaw[0].day.condition.text
		},
		forecasts,
		lang: params.lang,
		pageViewCount: pageViewCount ?? 0,
		visitorCount: visitorCount.size
	};
}
