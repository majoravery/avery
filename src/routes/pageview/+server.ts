import { json } from '@sveltejs/kit';
import * as supabase from '$lib/supabase';

export async function POST({ request, cookies }) {
	if (request.url.includes('localhost')) {
		// Don't log my own pageviews during dev lol
		return json({ status: 204 });
	}

	let visitorId = cookies.get('visitorid');
	if (!visitorId) {
		visitorId = crypto.randomUUID();
		cookies.set('visitorid', visitorId, { path: '/' });
	}

	const data = await supabase.addPageView(visitorId);
	return json({ data }, { status: 201 });
}
