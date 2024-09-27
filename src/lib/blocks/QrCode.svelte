<script lang="ts">
	import { t } from '$lib/stores/locale';
	import qr from '$lib/images/qr.png';
</script>

<article>
	<img src={qr} alt={$t('qrCode.alt')} />
</article>

<style>
	article {
		height: 100%;
		width: 100%;
	}

	img {
		height: auto;
		width: 100%;
	}

	svg {
		fill: var(--color-accent);
	}
</style>
