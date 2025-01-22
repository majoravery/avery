<!-- Flip clock animation inspired by Jan Kohlbach https://codepen.io/jankohlbach/pen/zYGaKLO?editors=0100 -->
<script lang="ts">
	import { locale, t } from '$lib/stores/locale';
	import { onMount } from 'svelte';
	import { time } from '$lib/stores/time';
	import Eyebrows from '$lib/components/Eyebrows.svelte';

	const MAPPING_TIMEZONE: Record<string, string> = {
		en: 'Asia/Singapore',
		zh: 'Asia/Singapore',
		de: 'Europe/Berlin',
		jp: 'Asia/Tokyo'
	};

	/**
	 * 22 Jan 2025: Did so much revamping because of the stupid runes now I'm not sure
	 * what my code really does anymore hm
	 */
	let ampm = $state('');
	const clockPrev = $state({
		hour: '',
		minute: '',
		second: ''
	});
	const clockNew = $state({
		hour: '',
		minute: '',
		second: ''
	});
	const clockFlip = $state({
		hour: false,
		minute: false,
		second: false
	});

	const currentTime = $derived.by(() => {
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

		return getTimeInTimeZone(MAPPING_TIMEZONE[$locale]);
	});

	$effect(() => {
		clockNew.hour = currentTime[0];
		clockNew.minute = currentTime[1];
		clockNew.second = currentTime[2].slice(0, 2); // removes "am" or "pm"
		ampm = currentTime[2].slice(3).toLowerCase(); // gets "am" or "pm"
		next();
	});

	function next() {
		const hourChange = clockPrev.hour !== clockNew.hour;
		const minuteChange = clockPrev.minute !== clockNew.minute;
		const secondChange = clockPrev.second !== clockNew.second;

		clockFlip.hour = hourChange;
		clockFlip.minute = minuteChange;
		clockFlip.second = secondChange;

		setTimeout(() => {
			if (clockFlip.hour) {
				clockFlip.hour = false;
				clockPrev.hour = clockNew.hour;
			}
			if (clockFlip.minute) {
				clockFlip.minute = false;
				clockPrev.minute = clockNew.minute;
			}
			if (clockFlip.second) {
				clockFlip.second = false;
				clockPrev.second = clockNew.second;
			}
		}, 600);
	}

	onMount(() => {
		clockPrev.hour = clockNew.hour;
		clockPrev.minute = clockNew.minute;
		clockPrev.second = clockNew.second;
	});
</script>

<article>
	<Eyebrows>{$t('clock.title')} ({$t('clock.location')})</Eyebrows>
	<div class="clock" class:day={ampm === 'am'} class:night={ampm === 'pm'}>
		<div class="hours">
			<span class="ampm">{ampm}</span>
			<div class="hour" class:flip={clockFlip.hour}>
				<div class="card top">{clockPrev.hour}</div>
				<div class="card bottom">{clockPrev.hour}</div>
				{#if clockFlip.hour}
					<div class="card top-flip">{clockNew.hour}</div>
					<div class="card bottom-flip">{clockNew.hour}</div>
				{/if}
			</div>
			<div class="card flap"></div>
			<div class="card flap"></div>
			<div class="card flap"></div>
		</div>
		<div class="minutes">
			<div class="minute" class:flip={clockFlip.minute}>
				<div class="card top">{clockPrev.minute}</div>
				<div class="card bottom">{clockPrev.minute}</div>
				{#if clockFlip.minute}
					<div class="card top-flip">{clockNew.minute}</div>
					<div class="card bottom-flip">{clockNew.minute}</div>
				{/if}
			</div>
			<div class="card flap"></div>
			<div class="card flap"></div>
			<div class="card flap"></div>
		</div>

		<div class="seconds">
			<div class="second" class:flip={clockFlip.second}>
				<div class="card top">{clockNew.second}</div>
				<div class="card bottom">{clockPrev.second}</div>
				{#if clockFlip.second}
					<div class="card top-flip">{clockPrev.second}</div>
					<div class="card bottom-flip">{clockNew.second}</div>
				{/if}
			</div>
			<div class="card flap"></div>
			<div class="card flap"></div>
			<div class="card flap"></div>
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
		--background-color: var(--colour-filler);
		--box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0,
			rgba(0, 0, 0, 0.1) 0 2px 2px -1px, rgba(0, 0, 0, 0.1) 0 2px 2px -1px;
		--color: var(--colour-accent);
	}

	div.clock.night {
		--background-color: var(--colour-accent);
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

	@media (min-width: 1400px) {
		div.hour,
		div.minute,
		div.second {
			align-items: center;
			font-size: 4rem;
		}
	}

	@media (min-width: 1680px) {
		div.hour,
		div.minute,
		div.second {
			font-size: 4.4rem;
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

	@media (min-width: 1400px) {
		div.top,
		div.bottom,
		div.top-flip,
		div.bottom-flip {
			align-items: center; /* dunno why this works and not center */
			height: 80%;
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

	@media (min-width: 1400px) {
		:nth-child(1 of div.flap) {
			height: 100%;
		}

		:nth-child(2 of div.flap) {
			height: 92%;
		}

		:nth-child(3 of div.flap) {
			height: 84%;
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
