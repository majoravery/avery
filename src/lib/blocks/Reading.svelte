<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';

	export let expand: () => void;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<article on:click={expand}>
	<Eyebrows>
		{$t('reading.title')}
	</Eyebrows>
	<div class="book">
		<div class="title">Let's Pretend This Never Happened</div>
		<div class="author">{$t('reading.author', { author: 'Jenny Lawson' })}</div>
	</div>
</article>

<style>
	article {
		cursor: zoom-in;
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
	}

	div.title {
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		color: var(--color-accent);
	}

	div.author {
		font-family: 'JetBrains Mono', monospace;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.7rem;
		line-height: 1.1rem;
	}
</style>
