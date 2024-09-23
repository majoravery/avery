<!-- Slot machine implementation inspired by https://codepen.io/AdrianSandu/pen/MyBQYz -->

<script lang="ts">
	import { getTextWidth } from '$lib/utils';
	import { gsap } from 'gsap';
	import { isDebugLanguage } from '$lib/stores/debugMode';
	import { onMount } from 'svelte';
	import Draggable from 'gsap/dist/Draggable';
	import drag from '$lib/images/drag.png';
	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	gsap.registerPlugin(Draggable);

	const languages = [
		{
			name: 'English',
			id: 'EN'
		},
		{
			name: '中文',
			id: 'CN'
		},
		{
			name: 'Deutsch',
			id: 'DE'
		},
		{
			name: '日本語',
			id: 'JP'
		}
	];

	let activeLanguage = 0;
	let container: HTMLDivElement;
	let height: number;
	let radius: number;
	let step = 360 / languages.length;
	let width: number;

	const displayTutorial = writable(false);
	const interacted = writable(false);

	function startToggle() {
		let interval: NodeJS.Timeout;
		const toggleLoop = () => {
			displayTutorial.set(true); // Turn on for 2 seconds
			setTimeout(() => {
				displayTutorial.set(false); // Turn off after 2 seconds
			}, 1200);
		};

		// Start the toggle loop
		interval = setInterval(() => {
			let touchedValue;
			// Get the latest touched value
			interacted.subscribe((value) => (touchedValue = value))();

			// If touched is true, stop the loop
			if (touchedValue) {
				clearInterval(interval);
				return;
			}

			toggleLoop(); // Turn on/off based on the timing
		}, 6000); // 7 seconds (2 seconds on + 5 seconds off)

		// Start the first toggle immediately
		toggleLoop();
	}

	onMount(() => {
		gsap.set('.language-selector', { transformPerspective: 600 });

		Draggable.create('.proxy', {
			type: 'x',
			trigger: '.container',
			onDrag: function () {
				displayTutorial.set(false);
				interacted.set(true);
				gsap.set('.language-selector', { rotationY: this.x });
			},
			onDragEnd: function () {
				const rotationY = gsap.utils.snap(360 / languages.length, this.x);
				gsap.to('.language-selector', {
					rotationY
				});
				activeLanguage = Math.abs(rotationY) / 90;
			}
		});

		height = container.getBoundingClientRect().height / 6;
		width = getTextWidth(languages[activeLanguage].name);
		radius = Math.ceil(Math.round(width / 2) / Math.tan(Math.PI / languages.length));

		startToggle();
	});
</script>

<div class="container" class:debug={$isDebugLanguage} bind:this={container}>
	<Eyebrow>Language</Eyebrow>

	<div
		aria-valuenow={activeLanguage}
		class="language-selector"
		draggable="true"
		role="slider"
		tabindex="0"
	>
		<div class="scroller" style:height={`${height}px`}>
			{#each languages as language, index}
				<div
					class="language"
					class:active={activeLanguage === index}
					style:height={`${height}px`}
					style:transform={`rotateY(${step * index}deg) translateZ(${radius}px)`}
				>
					{language.name}
				</div>
			{/each}
		</div>
	</div>

	<div class="proxy"></div>

	{#if $displayTutorial}
		<div class="tutorial" transition:fade={{ duration: 100 }}>
			<img src={drag} alt="Drag to change language" />
		</div>
	{/if}
</div>

<style>
	div.container {
		height: 100%;
	}

	div.language-selector {
		align-items: center;
		box-sizing: border-box;
		cursor: grab;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		transform-style: preserve-3d;
		width: 100%;
	}

	div.language-selector:active {
		cursor: grabbing;
	}

	div.scroller {
		box-sizing: border-box;
		transform-style: preserve-3d;
		width: 100%;
	}

	div.language {
		align-items: center;
		backface-visibility: hidden;
		box-sizing: border-box;
		display: flex;
		color: var(--color-background);
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
		font-size: 1.2rem;
		font-style: normal;
		font-weight: 500;
		justify-content: center;
		position: absolute;
		width: 100%;
		transition: color 100ms eaes-in-out;
	}

	div.container.debug div.scroller-wrap {
		transform: rotateY(45deg);
	}
	div.container.debug div.language {
		border: 1px solid black;
	}

	div.proxy {
		display: none;
	}

	div.tutorial {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}

	div.tutorial img {
		animation-delay: 100ms;
		animation-duration: 1000ms;
		animation-fill-mode: forwards;
		animation-name: swipe;
		animation-timing-function: ease-in-out;
		transform: translate3d(30px, 93px, 0) rotate(-15deg);
		width: 2rem;
	}

	@keyframes swipe {
		0% {
			transform: translate3d(30px, 93px, 0) rotate(-15deg);
		}

		98% {
			transform: translate3d(90px, 77px, 0) rotate(-15deg);
		}

		100% {
			transform: translate3d(90px, 77px, 0) rotate(-15deg);
		}
	}
</style>
