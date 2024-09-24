<script lang="ts">
	import { t } from '$lib/stores/locale';
	import wave from '$lib/images/wave-emoji.png';
</script>

<div>
	<img src={wave} alt={$t('wave.alt')} />
</div>

<style>
	div {
		height: 100%;
		overflow: visible;
		position: relative;
		width: 100%;
	}

	img {
		cursor: grab;
		height: auto;
		transform-origin: right bottom;
		width: 100%;
	}

	img:hover {
		animation: shake 700ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	}

	@keyframes shake {
		10%,
		90% {
			transform: rotate(-1deg);
		}
		20%,
		80% {
			transform: rotate(2deg);
		}
		30%,
		50%,
		70% {
			transform: rotate(-4deg);
		}
		40%,
		60% {
			transform: rotate(4deg);
		}
	}
</style>
