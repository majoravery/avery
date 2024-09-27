<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import cooking from '$lib/images/cooking.png';
</script>

<article>
	<Eyebrow>{$t('cooking.title')}</Eyebrow>
	<div class="dish">
		<img src={cooking} alt={$t('cooking.alt')} />
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
	}

	div.dish {
		position: relative;
	}

	div.dish img {
		width: 150%;
	}
</style>
