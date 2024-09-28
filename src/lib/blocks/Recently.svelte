<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
</script>

<article>
	<Eyebrows>{$t('recently.title')}</Eyebrows>
</article>
