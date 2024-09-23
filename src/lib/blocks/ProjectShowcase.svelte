<script lang="ts">
	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import arrowTopRight from '$lib/svg/arrow-up-right.svg';
</script>

<div>
	<Eyebrow>Project showcase</Eyebrow>
	<!-- <span class="title">Project: photos grid</span> -->
	<span class="arrow"><img src={arrowTopRight} alt="Visit website" /></span>
</div>

<img class="screenshot" src="/images/photos.png" alt="Screenshot of photos.averylim.com" />

<style>
	div {
		display: flex;
		justify-content: space-between;
	}

	span.title {
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.85rem;
		color: #a6a6a6;
	}

	span.arrow {
		display: inline-block;
	}

	span.arrow img {
		width: 1rem;
	}

	img.screenshot {
		bottom: -1.5rem;
		left: 1.5rem;
		position: absolute;
		right: 1.5rem;
		width: calc(100% - 3rem);
	}
</style>
