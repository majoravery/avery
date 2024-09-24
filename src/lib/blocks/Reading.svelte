<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrow from '$lib/components/Eyebrow.svelte';
</script>

<article>
	<Eyebrow>{$t('reading.title')}</Eyebrow>
</article>

<style>
	article {
		display: flex;
	}
</style>
