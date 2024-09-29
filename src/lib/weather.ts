import { convertDateToDdmmyyyy } from './utils';
import { WEATHER_API_KEY } from '$env/static/private';
import * as supabase from './supabase';

const MAPPING_LOCATION: Record<string, string> = {
	en: 'Singapore',
	zh: 'Singapore',
	de: 'Berlin',
	jp: 'Fukuoka'
};

// See available conditions here https://www.weatherapi.com/docs/#weather-icons
const MAPPING_CONDITION_CODES: Record<ConditionCode, number[]> = {
	sunny: [1000],
	cloudy: [1003, 1006, 1009],
	fog: [1030, 1135, 1147],
	rain: [
		1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246
	],
	storm: [1087, 1273, 1276],
	snow: [
		1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264, 1279, 1282
	],
	sleet: [1069, 1072, 1204, 1207, 1249, 1252]
};

function getMappedConditionCode(code: number): ConditionCode {
	let condition;

	const entries = Object.entries(MAPPING_CONDITION_CODES) as [ConditionCode, number[]][];
	entries.forEach(([key, items]) => {
		if (items.includes(code)) {
			condition = key; // Return the key if the value is found
		}
	});

	if (!condition) {
		throw new Error(`getMappedCondition: condition ${code} not found`);
	}

	return condition;
}

async function fetchWeather(location: string): Promise<Weather> {
	const options = {
		key: WEATHER_API_KEY,
		q: MAPPING_LOCATION[location],
		days: '3',
		aqi: 'no', // air quality index
		alerts: 'no'
	};

	const params = new URLSearchParams(options);
	const url = `https://api.weatherapi.com/v1/forecast.json?${params}`;

	const response = await fetch(url).then((res) => res.json());

	const { forecast } = response;
	const forecastsRaw = forecast.forecastday;
	const forecasts = forecastsRaw.map((f: any) => {
		return {
			date: f.date,
			temp: Math.round(f.day.avgtemp_c)
		};
	});

	const condition: Condition = {
		code: getMappedConditionCode(forecastsRaw[0].day.condition.code),
		text: forecastsRaw[0].day.condition.text
	};

	return { condition, forecasts };
}

export async function getLocaleWeather(locale: Locale): Promise<Weather> {
	let weather;

	const ddmmyyyy = convertDateToDdmmyyyy(new Date());
	const weatherId = `${ddmmyyyy}-${locale}`;

	const weatherSbResponse: WeatherSpResponse = await supabase.getWeather(weatherId);

	if (weatherSbResponse) {
		weather = JSON.parse(weatherSbResponse.weather);
	} else {
		console.info(`No ${locale} weather for ${ddmmyyyy} cached, fetching new one...`);
		weather = await fetchWeather(locale);
		await supabase.addWeather(weatherId, weather);
	}

	return weather;
}
