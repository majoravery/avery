<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';

	export let expand: () => void;
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions a11y-click-events-have-key-events -->
<article onclick={expand}>
	<Eyebrows>
		{$t('reading.title')}
	</Eyebrows>
	<div class="book">
		<div class="title">I Never Thought of It That Way</div>
		<div class="author">{$t('reading.author', { author: 'Mónica Guzmán' })}</div>
	</div>
</article>

<style>
	article {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
	}

	div.title {
		font-family: var(--enFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		color: var(--colour-accent);
	}

	div.author {
		font-family: var(--monoFontFamily);
		font-optical-sizing: var(--monoFontOpticalSizing);
		font-size: var(--monoFontSizeSmall);
		font-style: var(--monoFontStyle);
		font-weight: var(--monoFontWeight);
		line-height: var(--monoLineHeight);
	}
</style>
