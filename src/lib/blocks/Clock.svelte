<!-- Flip clock animation inspired by Jan Kohlbach https://codepen.io/jankohlbach/pen/zYGaKLO?editors=0100 -->
<script lang="ts">
	import { locale, t } from '$lib/stores/locale';
	import { onMount } from 'svelte';
	import { time } from '$lib/stores/time';
	import Eyebrows from '$lib/components/Eyebrows.svelte';

	let hourNew: string, minuteNew: string, secondNew: string, ampm: string;
	let hourPrev: string, minutePrev: string, secondPrev: string;
	let hourFlip: boolean, minuteFlip: boolean, secondFlip: boolean;

	const MAPPING_TIMEZONE: Record<string, string> = {
		en: 'Asia/Singapore',
		zh: 'Asia/Singapore',
		de: 'Europe/Berlin',
		jp: 'Asia/Tokyo'
	};

	$: {
		function getTimeInTimeZone(timeZone: string): string[] {
			return new Intl.DateTimeFormat('en', {
				timeZone,
				hour: 'numeric',
				minute: '2-digit',
				second: '2-digit'
			})
				.format($time)
				.split(':');
		}

		const time = getTimeInTimeZone(MAPPING_TIMEZONE[$locale]);
		hourNew = time[0];
		minuteNew = time[1];
		secondNew = time[2].slice(0, 2); // removes "am" or "pm"
		ampm = time[2].slice(3).toLowerCase(); // gets "am" or "pm"
	}

	// Thank you comma operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator
	$: hourNew, minuteNew, secondNew, next();

	function next() {
		const hourChange = hourPrev !== hourNew;
		const minuteChange = minutePrev !== minuteNew;
		const secondChange = secondPrev !== secondNew;

		hourFlip = hourChange;
		minuteFlip = minuteChange;
		secondFlip = secondChange;

		setTimeout(() => {
			if (hourFlip) {
				hourFlip = false;
				hourPrev = hourNew;
			}
			if (minuteFlip) {
				minuteFlip = false;
				minutePrev = minuteNew;
			}
			if (secondFlip) {
				secondFlip = false;
				secondPrev = secondNew;
			}
		}, 600);
	}

	onMount(() => {
		hourPrev = hourNew;
		minutePrev = minuteNew;
		secondPrev = secondNew;
	});
</script>

<article>
	<Eyebrows>{$t('clock.title')} ({$t('clock.location')})</Eyebrows>
	<div class="clock" class:day={ampm === 'am'} class:night={ampm === 'pm'}>
		<div class="hours">
			<span class="ampm">{ampm}</span>
			<div class="hour" class:flip={hourFlip}>
				<div class="card top">{hourPrev}</div>
				<div class="card bottom">{hourPrev}</div>
				{#if hourFlip}
					<div class="card top-flip">{hourNew}</div>
					<div class="card bottom-flip">{hourNew}</div>
				{/if}
			</div>
			<div class="card flap" />
			<div class="card flap" />
			<div class="card flap" />
		</div>
		<div class="minutes">
			<div class="minute" class:flip={minuteFlip}>
				<div class="card top">{minutePrev}</div>
				<div class="card bottom">{minutePrev}</div>
				{#if minuteFlip}
					<div class="card top-flip">{minuteNew}</div>
					<div class="card bottom-flip">{minuteNew}</div>
				{/if}
			</div>
			<div class="card flap" />
			<div class="card flap" />
			<div class="card flap" />
		</div>

		<div class="seconds">
			<div class="second" class:flip={secondFlip}>
				<div class="card top">{secondNew}</div>
				<div class="card bottom">{secondPrev}</div>
				{#if secondFlip}
					<div class="card top-flip">{secondPrev}</div>
					<div class="card bottom-flip">{secondNew}</div>
				{/if}
			</div>
			<div class="card flap" />
			<div class="card flap" />
			<div class="card flap" />
		</div>
	</div>
</article>

<style>
	article {
		display: grid;
		grid-template-rows: min-content auto;
		flex-direction: column;
		height: 100%;
	}

	div.clock {
		--card-height: 88%;

		align-items: center;
		color: var(--color);
		display: flex;
		font-family: var(--clockNameFontFamily);
		font-optical-sizing: var(--clockNameFontOpticalSizing);
		font-style: var(--clockNameFontStyle);
		font-weight: var(--clockNameFontWeight);
		line-height: var(--clockNameLineHeight);
		gap: 8px;
		justify-content: center;
		padding-top: 16px;
		transition: color 200ms ease-in-out;
	}

	@media (min-width: 480px) {
		div.clock {
			--card-height: 85%;
		}
	}

	div.clock.day {
		--background-color: var(--colourfiller);
		--box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0,
			rgba(0, 0, 0, 0.1) 0 2px 2px -1px, rgba(0, 0, 0, 0.1) 0 2px 2px -1px;
		--color: var(--colouraccent);
	}

	div.clock.night {
		--background-color: var(--colouraccent);
		--box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0,
			rgba(0, 0, 0, 0.5) 0 1.5px 1.5px -1px, rgba(0, 0, 0, 0.5) 0 1.5px 1.5px -1px;
		--color: rgb(255, 255, 255);
		filter: brightness(150%);
	}

	span.ampm {
		font-size: 0.6rem;
		font-weight: 400;
		left: 10px;
		position: absolute;
		z-index: 11;
	}

	div.clock.day span.ampm {
		top: 10%;
	}

	div.clock.night span.ampm {
		bottom: 40%;
	}

	@media (min-width: 480px) {
		span.ampm {
			left: 6.4px;
		}

		div.clock.day span.ampm {
			top: 6.4px;
		}

		div.clock.night span.ampm {
			bottom: 25%;
		}
	}

	div.hours,
	div.minutes,
	div.seconds {
		height: 100%;
		position: relative;
		width: 100%;
	}

	div.card {
		background-color: var(--background-color);
		border-radius: var(--border-radius-m);
		box-shadow: var(--box-shadow);
		width: 100%;
		transition:
			background-color 200ms ease-in-out,
			box-shadow 200ms ease-in-out;
	}

	div.hour,
	div.minute,
	div.second {
		align-items: flex-start;
		font-size: 3.7rem;
		display: flex;
		height: var(--card-height);
		justify-content: center;
		overflow: visible;
		position: relative;
		transform: rotateX(0deg);
		z-index: 10;
	}

	@media (min-width: 480px) {
		div.hour,
		div.minute,
		div.second {
			align-items: flex-end; /* dunno why this works and not center */
		}
	}

	/* Middle line */
	div.hour:before,
	div.minute:before,
	div.second:before {
		content: '';
		background: rgb(255, 255, 255);
		width: 100%;
		height: 1.12px;
		top: calc(var(--card-height) / 2.2);
		position: absolute;
		z-index: 10;
	}

	@media (min-width: 480px) {
		div.hour:before,
		div.minute:before,
		div.second:before {
			top: 50%;
		}
	}

	/*
		The following 4 divs are position absolute because they all need to be
		layered on top of one another for the animation to work
	*/
	div.top,
	div.bottom,
	div.top-flip,
	div.bottom-flip {
		align-items: center;
		display: flex;
		height: 80%;
		justify-content: center;
		position: absolute;
	}

	@media (min-width: 480px) {
		div.top,
		div.bottom,
		div.top-flip,
		div.bottom-flip {
			align-items: flex-end; /* dunno why this works and not center */
			height: 100%;
		}
	}

	div.bottom {
		clip-path: inset(50% 0 0 0);
	}

	div.top-flip {
		clip-path: inset(0 0 50% 0);
		transform: rotateX(0deg);
		box-shadow: none;
	}

	div.bottom-flip {
		clip-path: inset(50% 0 0 0);
		transform: rotateX(-90deg);
		box-shadow: none;
	}

	div.flip div.top-flip {
		animation-name: flip-down-top;
		animation-duration: 60ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}

	div.flip div.bottom-flip {
		animation-name: flip-down-bottom;
		animation-delay: 60ms;
		animation-duration: 60ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}

	div.flap {
		left: 0;
		position: absolute;
		top: 0;
	}

	:nth-child(1 of div.flap) {
		height: 100%;
	}

	:nth-child(2 of div.flap) {
		height: 90%;
	}

	:nth-child(3 of div.flap) {
		height: 80%;
	}

	@media (min-width: 480px) {
		:nth-child(1 of div.flap) {
			height: 100%;
		}

		:nth-child(2 of div.flap) {
			height: 95%;
		}

		:nth-child(3 of div.flap) {
			height: 90%;
		}
	}

	@keyframes flip-down-top {
		from {
			transform: rotateX(0deg);
		}

		to {
			transform: rotateX(90deg);
		}
	}

	@keyframes flip-down-bottom {
		from {
			transform: rotateX(-90deg);
		}

		to {
			transform: rotateX(0deg);
		}
	}
</style>
