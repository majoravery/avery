import { getCondition, getForecast } from '$lib/weather';

// TODO: Display a completely different SEO-friendly page on SSR
export const ssr = false;
export const prerender = true;

// TODO: implement better caching
let forecastResponse: Record<string, any>;

export async function load(): Promise<Weather> {
	if (forecastResponse === undefined) {
		forecastResponse = await getForecast();
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
		condition: {
			code: forecastsRaw[0].day.condition.code,
			text: forecastsRaw[0].day.condition.text
		}
	};
}
