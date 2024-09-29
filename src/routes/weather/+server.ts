import { getLocaleWeather } from '$lib/weather';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { locale } = await request.json();

	const weather = await getLocaleWeather(locale);

	return json({ data: weather }, { status: 201 });
}
