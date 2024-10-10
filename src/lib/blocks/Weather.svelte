<script lang="ts">
	import { locale, t } from '$lib/stores/locale';
	import { weathers } from '$lib/stores/weathers';
	import Eyebrows from '$lib/components/Eyebrows.svelte';

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
	<div>
		{#await import(`$lib/images/weather/${condition.code}.png`) then { default: src }}
			<img {src} alt={condition.text} />
		{/await}
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

	img {
		left: -20%;
		opacity: 0.5;
		position: absolute;
		top: -5%;
		width: 120%;
		z-index: 1;
	}

	@media (min-width: 480px) {
		img {
			left: -64px;
			top: -48px;
			width: calc(var(--block-size) * 1.5);
		}
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
		margin-bottom: 16px;
	}

	div.forecast.large span.day {
		line-height: 1.1rem;
	}

	div.forecast.large span.temp {
		color: var(--colour-accent);
		font-size: 1.8rem;
		line-height: normal;
	}

	span.day {
		color: var(--colour-accent);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
	}

	span.temp {
		color: var(--colour-accent);
		font-family: var(--monoFontFamily);
		font-optical-sizing: var(--monoFontOpticalSizing);
		font-size: var(--monoFontSize);
		font-style: var(--monoFontStyle);
		font-weight: var(--monoFontWeight);
		line-height: var(--monoLineHeight);
	}
</style>
