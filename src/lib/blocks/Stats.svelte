<article>
	<div class="eyebrow">Stats</div>
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
	div.eyebrow {
		align-self: flex-start;
		background-color: rgba(74, 222, 128, 0.4);
		border-radius: 4px;
		border: 1px solid rgb(229, 231, 235);
		box-shadow:
			rgba(0, 0, 0, 0) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset,
			rgba(0, 0, 0, 0.1) 0px -2px 0px 1px inset;
		color: rgb(20, 83, 45);
		display: inline;
		font-family:
			ui-monospace,
			SFMono-Regular,
			Menlo,
			Monaco,
			Consolas,
			Liberation Mono,
			Courier New,
			monospace;
		font-size: 14px;
		padding: 2px 6px 4px;
		text-transform: uppercase;
	}

	div.stats {
		display: flex;
		height: 100%;
		flex-direction: column;
		margin-top: auto;
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
