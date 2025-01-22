<script lang="ts">
	import { convertYyyymmddToDate, getFormattedDate } from '$lib/utils';
	import { locale, t } from '$lib/stores/locale';
	import { translationsRecently } from '$lib/translations';
	import ExtraContent from '$lib/components/ExtraContent.svelte';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import recently from '$lib/images/recently.jpg';

	// export let expand: () => void;
	// export let expanded: boolean;

	let { expand, expanded } = $props();

	// Reverse chronological order of last updated dates in YYYYMMDD format
	const versions = translationsRecently.map((entry) => parseInt(Object.keys(entry)[0], 10));

	// Current index of displayed version
	let currentIndex = $state(0);

	let currentVersion = $derived(versions[currentIndex]);
	let formattedDate = $derived(getFormattedDate(convertYyyymmddToDate(currentVersion), $locale));
	let source = $derived(translationsRecently[currentIndex][currentVersion]);
	let extraContent = $derived($t('recently.extraContent', undefined, source));

	function earlier() {
		if (currentIndex === versions.length - 1) return;
		currentIndex = currentIndex + 1;
	}

	function recent() {
		if (currentIndex === 0) return;
		currentIndex = currentIndex - 1;
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions a11y-click-events-have-key-events -->
<article on:click={expand} class:expanded>
	<Eyebrows standout>{$t('recently.title')}</Eyebrows>
	<div class="photo preview">
		<img src={recently} alt={$t('recently.title')} />
	</div>

	<ExtraContent {expanded} standout>
		<img src={recently} alt={$t('recently.title')} />
		<p class="date">{formattedDate}</p>
		<p>{@html extraContent}</p>
		<div class="navigation">
			<span
				aria-disabled={currentIndex === versions.length - 1}
				class:disabled={currentIndex === versions.length - 1}
				class="earlier"
				on:click={earlier}
				role="button"
				tabindex="0"
			>
				{$t('recently.earlier')}
			</span>
			<span
				aria-disabled={currentIndex === 0}
				class:disabled={currentIndex === 0}
				class="recent"
				on:click={recent}
				role="button"
				tabindex="0"
			>
				{$t('recently.recent')}
			</span>
		</div>
	</ExtraContent>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		position: relative;
		height: 100%;
		width: 100%;
	}

	div.photo {
		background-color: var(--colour-filler);
		border-radius: var(--border-radius-s);
		bottom: -8px;
		height: calc(100% + 16px);
		left: -8px;
		position: absolute;
		right: -8px;
		top: -8px;
		transition: transform 180ms ease-in-out;
		width: calc(100% + 16px);
	}

	article:hover div.photo {
		transform: scale(110%);
	}

	div.photo:before {
		background-color: var(--colour-background);
		bottom: 0;
		content: '';
		height: 100%;
		left: 0;
		mix-blend-mode: screen;
		opacity: 0.5;
		position: absolute;
		right: 0;
		top: 0;
		transition: opacity 180ms ease-in-out;
		width: 100%;
		z-index: 1;
	}

	article:hover div.photo:before {
		opacity: 0;
	}

	div.photo img {
		border-radius: var(--border-radius-s);
		filter: brightness(100%);
		height: 100%;
		mix-blend-mode: multiply;
		object-fit: cover;
		position: absolute;
		transform: scale(100%);
		transition: transform 180ms ease-in-out;
		width: 100%;
	}

	div.navigation {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	div.navigation > span {
		align-items: center;
		border-bottom: 1px solid var(--colour-accent);
		display: inline;
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		justify-content: space-between;
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		padding-bottom: 3.2px;
		text-decoration: none;
	}

	div.navigation > span.earlier {
		cursor: w-resize;
	}
	div.navigation > span.recent {
		cursor: e-resize;
	}
	div.navigation > span.disabled {
		border-bottom: none;
		opacity: 0.4;
		cursor: not-allowed;
	}
</style>
