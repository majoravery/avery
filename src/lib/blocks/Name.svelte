<script lang="ts">
	import { locale, t } from '$lib/stores/locale';
</script>

<article>
	<h1 class={$locale}>{@html $t('name')}</h1>
</article>

<style>
	:root {
		--nameFontFamily: 'Bricolage Grotesque', sans-serif;
		--nameFontOpticalSizing: auto;
		--nameFontSize: 3.5rem;
		--nameFontStyle: normal;
		--nameFontWeight: 600;
		--nameLineHeight: 60%;
		--marginBottom: 5px;

		--zhNameFontFamily: var(--zhFontFamily);
		--zhNameFontOpticalSizing: auto;
		--zhNameFontSize: 4rem;
		--zhNameFontStyle: normal;
		--zhNameFontWeight: 600;
		--zhNameLineHeight: 100%;
		--zhMarginBottom: 3px;

		--jpNameFontFamily: var(--jpFontFamily);
		--jpNameFontOpticalSizing: auto;
		--jpNameFontSize: 3.8rem;
		--jpNameFontStyle: normal;
		--jpNameFontWeight: 600;
		--jpNameLineHeight: 90%;
		--jpMarginBottom: 0;
	}

	article {
		align-items: flex-end;
		display: flex;
		height: 100%;
	}

	h1 {
		color: var(--colour-accent);
		font-family: var(--nameFontFamily);
		font-optical-sizing: var(--nameFontOpticalSizing);
		font-size: var(--nameFontSize);
		font-style: var(--nameFontStyle);
		font-weight: var(--nameFontWeight);
		line-height: var(--nameLineHeight);
		margin-bottom: var(--marginBottom);
	}

	h1.zh {
		font-family: var(--zhNameFontFamily);
		font-optical-sizing: var(--zhNameFontOpticalSizing);
		font-size: var(--zhNameFontSize);
		font-style: var(--zhNameFontStyle);
		font-weight: var(--zhNameFontWeight);
		line-height: var(--zhNameLineHeight);
		margin-bottom: var(--zhMarginBottom);
	}

	h1.jp {
		font-family: var(--jpNameFontFamily);
		font-optical-sizing: var(--jpNameFontOpticalSizing);
		font-size: var(--jpNameFontSize);
		font-style: var(--jpNameFontStyle);
		font-weight: var(--jpNameFontWeight);
		line-height: var(--jpNameLineHeight);
		margin-bottom: var(--jpMarginBottom);
	}

	@media (min-width: 1400px) {
		:root {
			--nameFontSize: 4rem;
			--marginBottom: 7.5px;

			--zhNameFontSize: 4rem;
			--zhMarginBottom: 4px;

			--jpNameFontSize: 3.8rem;
		}
	}

	@media (min-width: 1680px) {
		:root {
			--nameFontSize: 4.8rem;
			--marginBottom: 10px;

			--zhNameFontSize: 4rem;
			--zhMarginBottom: 5px;

			--jpNameFontSize: 3.8rem;
		}
	}
</style>
