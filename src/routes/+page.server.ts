import { redirect } from '@sveltejs/kit';

// TODO: Display a completely different SEO-friendly page on SSR
export const ssr = false;
export const prerender = true;

export async function load({ params }) {
	// Set default locale if none set yet
	if (Object.keys(params).length === 0) {
		redirect(307, '/en');
	}
}
