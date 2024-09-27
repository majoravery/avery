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
		/* font-family: 'saans';
		font-size: 3.27rem;
		font-weight: normal;
		letter-spacing: -0.01em;
		line-height: 85%; */

		font-family: 'Bricolage Grotesque', sans-serif;
		font-size: 3.5rem;
		font-optical-sizing: auto;
		font-weight: 500;
		font-style: normal;
		line-height: 60%;

		margin-bottom: 0.327rem;
	}

	h1.zh {
		font-family: 'Noto Sans SC', sans-serif;
		font-optical-sizing: auto;
		font-weight: 600;
		font-style: normal;
		line-height: 100%;
		margin-bottom: 0.2rem;
	}

	h1.jp {
		font-family: 'M PLUS 1 Code', monospace;
		font-optical-sizing: auto;
		font-weight: 600;
		font-style: normal;

		font-size: 3.3rem;
		line-height: 90%;
		margin-bottom: 0rem;
	}
</style>
