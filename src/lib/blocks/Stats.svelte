<script>
	import Eyebrow from '$lib/components/Eyebrow.svelte';
</script>

<article>
	<Eyebrow>Stats</Eyebrow>
	<div class="stats">
		<div class="row">
			<span class="label">Visitor</span>
			<span class="value">1235</span>
		</div>
		<div class="row">
			<span class="label">Page view</span>
			<span class="value">1235</span>
		</div>
		<div class="row">
			<span class="label">Visitor</span>
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
