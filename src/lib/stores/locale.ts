import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import { translations } from '$lib/translations';
import { replaceState } from '$app/navigation';

// When updating this, update the timezone mapping in Clock.svelte too
export const LOCALES: { name: string; id: Locale }[] = [
	{
		name: 'English',
		id: 'en'
	},
	{
		name: '中文',
		id: 'zh'
	},
	{
		name: '日本語',
		id: 'jp'
	},
	{
		name: 'Deutsch',
		id: 'de'
	}
];
export const VALID_LOCALES = Object.values(LOCALES).map((locale) => locale.id);
export const locale = writable<Locale>();
locale.subscribe((newLocale) => {
	if (!browser) {
		return;
	}

	// Doing it manually because it seems I can't access $page from $app/stores?
	const currentLocale = window.location.pathname.replaceAll('/', '');
	if (newLocale && newLocale !== currentLocale) {
		replaceState(`/${newLocale}/`, { locale: newLocale });
	}
});

// Implementation from https://svelte.dev/repl/de39de663ef2445b8fe17b79c500013b?version=3.33.0

function translate(
	locale: Locale,
	key: string,
	vars: Record<string, string>,
	source: Translations = translations
) {
	if (!locale) throw new Error(`translate: ${locale} does not exist in translations file`);
	if (!key) throw new Error(`translate: ${key} does not exist in ${locale}`);

	// Grab the translation from the translations object.
	let text = source[locale][key];

	if (!text) throw new Error(`translate: no translation found for ${locale}.${key}`);

	// Replace any passed in variables in the translation string.
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = derived(
	locale,
	($locale) =>
		(key: string, vars: Record<string, string> = {}, source: Translations = translations) =>
			translate($locale, key, vars, source)
);
