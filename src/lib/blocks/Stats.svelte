<script lang="ts">
	import Eyebrow from '$lib/components/Eyebrow.svelte';

	function getTodaysDate() {
		const today = new Date();
		const day = String(today.getDate()).padStart(2, '0');
		const month = today.toLocaleString('default', { month: 'short' });
		const year = today.getFullYear();

		return `${day} ${month} ${year}`;
	}

	const date = getTodaysDate();
</script>

<article>
	<Eyebrow>Info</Eyebrow>
	<div class="stats">
		<div class="row">
			<span class="label">Today's date</span>
			<span class="value">{date}</span>
		</div>
		<div class="row">
			<span class="label">Visitors</span>
			<span class="value">1235</span>
		</div>
		<div class="row">
			<span class="label">Page views</span>
			<span class="value">1235</span>
		</div>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	div.stats {
		display: flex;
		flex-direction: column;
	}

	div.row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		align-items: center;
		padding: 0.2rem 0;
	}

	div.row + div.row {
		border-top: 1px solid var(--color-accent);
	}

	div.row:last-child {
		padding-bottom: 0;
	}

	span.label {
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.85rem;
		line-height: 1.1rem;
	}

	span.value {
		font-family: 'JetBrains Mono', monospace;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.85rem;
		line-height: 1.1rem;
		text-align: right;
	}
</style>
