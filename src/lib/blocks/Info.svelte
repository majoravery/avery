<script lang="ts">
	import { getFormattedDate } from '$lib/utils';
	import { locale, t } from '$lib/stores/locale';
	import { pageviews, visitors } from '$lib/stores/pageview';
	import Eyebrows from '$lib/components/Eyebrows.svelte';

	const LAST_UPDATED = new Date('5 Jul 2025');
	const TODAY = new Date();

	function pad(number: number) {
		return String(number).padStart(4, '0');
	}

	$: date = getFormattedDate(TODAY, $locale);
</script>

<article>
	<Eyebrows>{$t('info.title')}</Eyebrows>
	<div class="info">
		<div class="row">
			<span class="label">{$t('info.lastUpdated')} </span>
			<span class="value">{getFormattedDate(LAST_UPDATED, $locale)}</span>
		</div>
		<div class="row">
			<span class="label">{$t('info.todaysDate')} </span>
			<span class="value">{date}</span>
		</div>
		<div class="row">
			<span class="label">{$t('info.visitors')} </span>
			<span class="value">{pad($visitors)}</span>
		</div>
		<div class="row">
			<span class="label">{$t('info.pageViews')} </span>
			<span class="value">{pad($pageviews)}</span>
		</div>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	div.row {
		align-items: center;
		border-bottom: 1px solid var(--colour-accent);
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		padding-bottom: 3.2px;
	}

	div.row + div.row {
		margin-top: 3.2px;
	}

	span.label {
		color: var(--colour-accent);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
	}

	span.value {
		color: var(--colour-accent);
		font-family: var(--monoFontFamily);
		font-optical-sizing: var(--monoFontOpticalSizing);
		font-size: var(--monoFontSize);
		font-style: var(--monoFontStyle);
		font-weight: var(--monoFontWeight);
		line-height: var(--monoLineHeight);
		text-align: right;
	}
</style>
