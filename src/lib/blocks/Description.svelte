<script>
	import { t } from '$lib/stores/locale';
	import Eyebrow from '$lib/components/Eyebrow.svelte';
</script>

<div>
	<Eyebrow>{$t('description.title')}</Eyebrow>

	<span>
		{$t('description.writeup')}
	</span>
</div>

<style>
	div {
		align-items: flex-end;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	span {
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
	}
</style>
