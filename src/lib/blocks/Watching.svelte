<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
</script>

<article>
	<Eyebrows>
		{$t('watching.title')}
	</Eyebrows>
	<div class="title">Baby Reindeer</div>
</article>

<style>
	article {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
	}

	div.title {
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		color: var(--colouraccent);
	}
</style>
