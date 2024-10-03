<script lang="ts">
	import { locale, t } from '$lib/stores/locale';
</script>

<article>
	<h1 class={$locale}>{$t('name')}</h1>
</article>

<style>
	article {
		align-items: flex-end;
		display: flex;
		height: 100%;
	}

	h1 {
		color: var(--color-accent);
		font-family: var(--nameFontFamily);
		font-optical-sizing: var(--nameFontOpticalSizing);
		font-size: var(--nameFontSize);
		font-style: var(--nameFontStyle);
		font-weight: var(--nameFontWeight);
		line-height: var(--nameLineHeight);
		margin-bottom: 0.327rem;
	}

	h1.zh {
		font-family: var(--zhNameFontFamily);
		font-optical-sizing: var(--zhNameFontOpticalSizing);
		font-size: var(--zhNameFontSize);
		font-style: var(--zhNameFontStyle);
		font-weight: var(--zhNameFontWeight);
		line-height: var(--zhNameLineHeight);
		margin-bottom: 0.2rem;
	}

	h1.jp {
		font-family: var(--jpNameFontFamily);
		font-optical-sizing: var(--jpNameFontOpticalSizing);
		font-size: var(--jpNameFontSize);
		font-style: var(--jpNameFontStyle);
		font-weight: var(--jpNameFontWeight);
		line-height: var(--jpNameLineHeight);
		margin-bottom: 0rem;
	}
</style>
