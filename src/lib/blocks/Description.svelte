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
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.85rem;
		line-height: 1.1rem;
	}

	span a {
		color: var(--color-accent);
		text-decoration-style: dashed;
	}

	span a:hover {
		text-decoration-style: solid;
	}
</style>
