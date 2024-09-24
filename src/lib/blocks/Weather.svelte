<script lang="ts">
	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import sun from '$lib/images/sun.png';
</script>

<article>
	<Eyebrow>Weather<br />Forecast</Eyebrow>
	<div class="sun"><img src={sun} alt="Smiling sun" /></div>
	<div class="forecasts">
		<div class="forecast large">
			<span class="day">Sun</span>
			<span class="temp">32&deg;C</span>
		</div>
		<div class="forecast">
			<span class="day">Mon</span>
			<span class="temp">34&deg;C</span>
		</div>
		<div class="forecast">
			<span class="day">Tue</span>
			<span class="temp">30&deg;C</span>
		</div>
		<div class="forecast">
			<span class="day">Wed</span>
			<span class="temp">28&deg;C</span>
		</div>
		<div class="forecast">
			<span class="day">Thu</span>
			<span class="temp">29&deg;C</span>
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

	/* TODO: improve */
	img {
		left: -4rem;
		opacity: 0.5;
		position: absolute;
		top: -4rem;
		width: calc(var(--block-size) * 1.5);
		z-index: 1;
	}

	div.forecasts {
		position: relative;
		z-index: 2;
	}

	div.forecast {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-items: flex-end;
	}

	div.forecast.large {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(2, min-content);
		margin-bottom: 1rem;
	}

	div.forecast.large span.day {
		line-height: 1.1rem;
	}

	div.forecast.large span.temp {
		color: var(--color-accent);
		font-size: 1.8rem;
		line-height: normal;
	}

	span.day {
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.85rem;
		line-height: 1.1rem;
	}

	span.temp {
		font-family: 'JetBrains Mono', monospace;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.85rem;
		line-height: 1.1rem;
	}
</style>
