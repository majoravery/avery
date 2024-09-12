<script lang="ts">
	import { time } from '$lib/stores/time';

	let hourSin: string, minuteSin: string;
	let hourFuk: string, minuteFuk: string;
	let hourBer: string, minuteBer: string;

	$: {
		function getTimeInTimeZone(timeZone: string): string[] {
			return new Intl.DateTimeFormat('en', {
				timeZone,
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			})
				.format($time)
				.split(':');
		}

		const timeSin = getTimeInTimeZone('Asia/Singapore');
		hourSin = timeSin[0];
		minuteSin = timeSin[1];

		const timeFuk = getTimeInTimeZone('Asia/Tokyo');
		hourFuk = timeFuk[0];
		minuteFuk = timeFuk[1];

		const timeBer = getTimeInTimeZone('Europe/Berlin');
		hourBer = timeBer[0];
		minuteBer = timeBer[1];
	}
</script>

<div class="clocks">
	<div class={`clock ${parseInt(hourSin, 10) > 22 && parseInt(hourSin, 10) < 7 ? 'night' : 'day'}`}>
		<span class="city">SIN</span>
		<div class="time">
			<span class="hour">{hourSin}</span>
			<span class="minute">{minuteSin}</span>
		</div>
	</div>
	<div class={`clock ${parseInt(hourFuk, 10) > 18 && parseInt(hourFuk, 10) < 7 ? 'night' : 'day'}`}>
		<span class="city">FUK</span>
		<div class="time">
			<span class="hour">{hourFuk}</span>
			<span class="minute">{minuteFuk}</span>
		</div>
	</div>
	<div class={`clock ${parseInt(hourBer, 10) > 18 && parseInt(hourBer, 10) < 7 ? 'night' : 'day'}`}>
		<span class="city">BER</span>
		<div class="time">
			<span class="hour">{hourBer}</span>
			<span class="minute">{minuteBer}</span>
		</div>
	</div>
</div>

<style>
	div.clocks {
		display: flex;
		gap: var(--grid-gap);
		height: 100%;
	}

	div.clock {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: var(--border-radius-s);
		padding: 0.8rem 0.5rem;
		width: 100%;
	}

	div.clock.day {
		background-color: var(--color-filler);
		color: var(--color-background);
	}

	div.clock.night {
		background-color: var(--color-background);
		color: var(--color-filler);
	}

	span.hour,
	span.minute {
		display: block;
		font-family: 'JetBrains Mono', monospace;
		font-optical-sizing: auto;
		font-size: 2rem;
		font-style: normal;
		font-weight: 300;
		line-height: 1.8rem;
		text-align: center;
	}

	span.city {
		display: block;
		font-family: 'JetBrains Mono', monospace;
		font-optical-sizing: auto;
		font-style: normal;
		font-weight: 300;
		text-align: center;
	}
</style>
