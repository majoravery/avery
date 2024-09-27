<script lang="ts">
	import { t } from '$lib/stores/locale';
</script>

<div>
	<h1>{$t('name')}</h1>
</div>

<style>
	div {
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
</style>
