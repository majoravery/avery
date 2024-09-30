import { SUPABASE_API_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ytsxxlmupnwgrtqpvehx.supabase.co';
// Not sure if this should be here or maybe somewhere else more.. definite
export const supabase = createClient(supabaseUrl, SUPABASE_API_KEY);

export async function addPageView(visitorId: string) {
	const { data, error } = await supabase
		.from('page_views')
		.insert({
			visitor_id: visitorId
		})
		.select();

	if (error) {
		throw new Error(
			`Error adding page view (code: ${error.code}): ${error.message}. ${error.details}`
		);
	}

	return data;
}

export async function getPageView(): Promise<number> {
	const { count, error } = await supabase
		.from('page_views')
		.select('*', { count: 'exact', head: true });

	if (error) {
		throw new Error(
			`Error fetching page views (code: ${error.code}): ${error.message}. ${error.details}`
		);
	}

	if (!count) {
		throw new Error(`\`count\` is null`);
	}

	return count;
}

export async function getVisitors(): Promise<number> {
	const { data, error } = await supabase
		.from('page_views')
		.select('visitor_id', { count: 'exact' });

	if (error) {
		throw new Error(
			`Error fetching visitors (code: ${error.code}): ${error.message}. ${error.details}`
		);
	}

	return new Set(data?.map((v) => v.visitor_id)).size;
}

export async function addWeather(
	weatherId: string,
	weather: Weather
): Promise<WeatherSpResponse[]> {
	const { data, error } = await supabase
		.from('weather')
		.insert({
			id: weatherId,
			weather: JSON.stringify(weather)
		})
		.select();

	if (error?.code === '23505') {
		// This is a dirty fix for when the load function gets run twice somehow and tries to insert weather twice.
		// Returning whatever was already just fetched...
		return [
			{
				id: weatherId,
				weather: JSON.stringify(weather),
				created_at: '' // tbh you really don't need this on the site but I'll just leave it in anyway
			}
		];
	}

	// All other errors
	if (error) {
		throw new Error(
			`Error adding weather forecasts for ${weatherId} (code: ${error.code}): ${error.message}. ${error.details}`
		);
	}

	return data as WeatherSpResponse[];
}

// Gets today's forecasts
export async function getWeather(weatherId: string): Promise<WeatherSpResponse> {
	const { data, error } = await supabase.from('weather').select().eq('id', weatherId).maybeSingle();

	if (error) {
		throw new Error(
			`Error getting weather ${weatherId} (code: ${error.code}): ${error.message}. ${error.details}`
		);
	}

	return data;
}
