<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import photos from '$lib/images/photos.png';
</script>

<article>
	<Eyebrows arrowAlt={$t('projectShowcase.linkAlt')}>
		{$t('projectShowcase.title')}
	</Eyebrows>

	<img
		class="screenshot"
		src={photos}
		alt={$t('projectShowcase.imageAlt', { website: 'photos.averylim.com' })}
	/>
</article>

<style>
	article {
		height: 100%;
	}

	img.screenshot {
		bottom: -4rem;
		left: 1.5rem;
		position: absolute;
		right: 1.5rem;
		width: calc(100% - 3rem);
	}
</style>
