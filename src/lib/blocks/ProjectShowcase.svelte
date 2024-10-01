<script lang="ts">
	import { t } from '$lib/stores/locale';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import photos from '$lib/images/photos.png';

	export let expand: () => void;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<article on:click={expand}>
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
		cursor: ne-resize;
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
