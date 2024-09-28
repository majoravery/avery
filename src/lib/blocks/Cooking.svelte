<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import cooking from '$lib/images/cooking.png';
</script>

<article>
	<Eyebrows>{$t('cooking.title')}</Eyebrows>
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
