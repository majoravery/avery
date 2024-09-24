<script lang="ts">
	import qr from '$lib/images/qr.png';
</script>

<div>
	<img src={qr} alt="Scan at your own expense" />
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
