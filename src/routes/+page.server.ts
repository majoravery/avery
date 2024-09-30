import { redirect } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params }) {
	// Set default locale if none set yet
	if (Object.keys(params).length === 0) {
		redirect(307, '/en');
	}
}
