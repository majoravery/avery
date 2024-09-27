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
		throw new Error(`Error ${error.code}: ${error.message}`);
	}

	return data;
}
