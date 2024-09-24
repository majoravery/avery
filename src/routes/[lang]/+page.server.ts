import { getCondition, getForecast } from '$lib/weather';
import { redirect } from '@sveltejs/kit';
import { VALID_LOCALES } from '$lib/stores/locale.js';

export const trailingSlash = 'always';

// TODO: implement better caching
let forecastResponse: Record<string, any>;

export async function load({ fetch, params }): Promise<MainPageData> {
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
		forecasts,
		lang: params.lang,
		condition: {
			code: forecastsRaw[0].day.condition.code,
			text: forecastsRaw[0].day.condition.text
		}
	};
}
