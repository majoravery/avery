import { WEATHER_API_KEY, WEATHER_API_URL } from '$env/static/private';

const MAPPING_LOCATION: Record<string, string> = {
	en: 'Singapore',
	zh: 'Singapore',
	de: 'Berlin',
	jp: 'Fukuoka'
};

// See available conditions here https://www.weatherapi.com/docs/#weather-icons
const MAPPING_CONDITIONS = {
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

export function getCondition(code: number): string {
	for (const [key, items] of Object.entries(MAPPING_CONDITIONS)) {
		if (items.includes(code)) {
			return key; // Return the key if the value is found
		}
	}

	throw new Error(`getCondition: condition ${code} not found`);
}

// Using the fetch from Svelte load function
export async function getForecast(fetch, location: string): Promise<Record<string, any>> {
	const options = {
		key: WEATHER_API_KEY,
		q: MAPPING_LOCATION[location],
		days: '3',
		aqi: 'no', // air quality index
		alerts: 'no'
	};

	const params = new URLSearchParams(options);
	const url = `${WEATHER_API_URL}?${params}`;

	return await fetch(url).then((res) => res.json());
}
