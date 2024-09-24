<script lang="ts">
	import { t } from '$lib/stores/locale';
	import { weather } from '$lib/stores/weather';
	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import sun from '$lib/images/weather/sun.png';

	function getDayOfWeek(dateStr: string) {
		const date = new Date(dateStr);
		const day = date.toLocaleDateString('en-SG', { weekday: 'short' }).toLowerCase();
		return $t(`weather.${day}`);
	}

	const formattedWeather = $weather.forecasts.map((w) => ({
		...w,
		day: getDayOfWeek(w.date)
	}));
</script>

<article>
	<Eyebrow>{$t('weather.title')}<br />({$t('weather.location')})</Eyebrow>
	<div class="sun">
		<img src={sun} alt={$weather.condition.text} />
	</div>
	<div class="forecasts">
		<div class="forecast large">
			<span class="day">{formattedWeather[0].day}</span>
			<span class="temp">{formattedWeather[0].temp}&deg;C</span>
		</div>
		{#each formattedWeather.slice(1) as weather}
			<div class="forecast">
				<span class="day">{weather.day}</span>
				<span class="temp">{weather.temp}&deg;C</span>
			</div>
		{/each}
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
