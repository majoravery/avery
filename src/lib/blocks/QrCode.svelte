<script lang="ts">
	import { t } from '$lib/stores/locale';
	import qr from '$lib/images/qr.png';
</script>

<div>
	<img src={qr} alt={$t('qrCode.alt')} />
</div>

<style>
	div {
		height: 100%;
		position: relative;
		width: 100%;
	}

	img {
		height: auto;
		width: 100%;
	}
</style>
