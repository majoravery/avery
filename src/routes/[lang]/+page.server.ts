import { getCondition, getForecast } from '$lib/weather';

export const trailingSlash = 'always';

// TODO: implement better caching
let forecastResponse: Record<string, any>;

export async function load({ fetch, params }): Promise<MainPageData> {
	if (forecastResponse === undefined) {
		forecastResponse = await getForecast(fetch);
	}

	const { location, forecast } = forecastResponse;
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
		city: location.name,
		forecasts,
		lang: params.lang,
		condition: {
			code: forecastsRaw[0].day.condition.code,
			text: forecastsRaw[0].day.condition.text
		}
	};
}
