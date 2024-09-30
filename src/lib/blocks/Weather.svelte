<script lang="ts">
	import { derived } from 'svelte/store';
	import { locale, t } from '$lib/stores/locale';
	import { weathers } from '$lib/stores/weathers';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
	import sun from '$lib/images/weather/sun.png';

	function getDayOfWeek(dateStr: string) {
		const date = new Date(dateStr);
		const day = date.toLocaleDateString('en-SG', { weekday: 'short' }).toLowerCase();
		return $t(`weather.${day}`);
	}

	$: condition = $weathers[$locale].condition;
	$: formattedWeather = $weathers[$locale].forecasts.map((w) => ({
		...w,
		day: getDayOfWeek(w.date)
	}));
</script>

<article>
	<Eyebrows>{$t('weather.title')} ({$t('weather.location')})</Eyebrows>
	<div class="sun">
		<img src={sun} alt={condition.text} />
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
		color: var(--color-accent);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
	}

	span.temp {
		color: var(--color-accent);
		font-family: 'JetBrains Mono', monospace;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.85rem;
		line-height: 1.1rem;
	}
</style>
