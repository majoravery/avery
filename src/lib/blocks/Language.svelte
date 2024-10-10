<!-- Slot machine implementation inspired by https://codepen.io/AdrianSandu/pen/MyBQYz -->

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { getTextWidth } from '$lib/utils';
	import { gsap } from 'gsap';
	import { isDebugLanguage } from '$lib/stores/debugMode';
	import { locale, LOCALES } from '$lib/stores/locale';
	import { onMount } from 'svelte';
	import { t } from '$lib/stores/locale';
	import { writable } from 'svelte/store';
	import drag from '$lib/images/drag.png';
	import Draggable from 'gsap/dist/Draggable';
	import Eyebrows from '$lib/components/Eyebrows.svelte';

	gsap.registerPlugin(Draggable);

	let activeLanguageIndex = LOCALES.findIndex((lang) => lang.id === $locale);
	let container: HTMLDivElement;
	let height: number;
	let languageEl: HTMLElement;
	let radius: number;
	let step = 360 / LOCALES.length;
	let width: number;

	const displayTutorial = writable(false);
	const interacted = writable(false);

	function startTutorialGuide() {
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
		const blockRect = document.querySelector('.block.language')?.getBoundingClientRect();
		const containerRect = document.querySelector('.container.lang')?.getBoundingClientRect();

		if (!blockRect) throw new Error('Could not find div.block.language');
		if (!containerRect) throw new Error('Could not find .container.lang');

		gsap.set('.language-selector', {
			rotationY: -step * activeLanguageIndex,
			transformPerspective: 600
		});

		Draggable.create('.proxy', {
			type: 'x',
			trigger: '.container.lang',
			dragResistance: 0.55,
			onDrag: function () {
				displayTutorial.set(false);
				interacted.set(true);
				gsap.set('.language-selector', { rotationY: this.x + step * activeLanguageIndex });
				// console.log(this.x, step * activeLanguageIndex, this.x + step * activeLanguageIndex);
			},
			onDragEnd: function () {
				const rotationY = gsap.utils.snap(step, this.x + step * activeLanguageIndex);
				// console.log(this.x, step * activeLanguageIndex, this.x + step * activeLanguageIndex);
				gsap.to('.language-selector', {
					rotationY
				});

				activeLanguageIndex =
					rotationY > 0
						? // Drag to previous language
							((360 - (rotationY % 360)) / 90) % LOCALES.length
						: // Drag to next language
							(Math.abs(rotationY) / 90) % LOCALES.length;

				locale.set(LOCALES[activeLanguageIndex].id);
			}
		});

		height = container.getBoundingClientRect().height / 6;
		width = getTextWidth(languageEl);
		radius = Math.ceil(Math.round(width / 2) / Math.tan(Math.PI / LOCALES.length));

		setTimeout(startTutorialGuide, 2000);
	});
</script>

<div class="container lang" class:debug={$isDebugLanguage} bind:this={container}>
	<Eyebrows>{$t('language.title')}</Eyebrows>
	<div
		aria-valuenow={activeLanguageIndex}
		class="language-selector"
		draggable="true"
		role="slider"
		tabindex="0"
	>
		<div class="scroller" style:height={`${height}px`}>
			{#each LOCALES as language, index}
				<div
					class={`language ${language.name}`}
					class:active={activeLanguageIndex === index}
					style:height={`${height}px`}
					style:transform={`rotateY(${step * index}deg) translateZ(${radius}px)`}
					bind:this={languageEl}
				>
					{language.name}
				</div>
			{/each}
		</div>
	</div>

	<div class="proxy"></div>

	{#if $displayTutorial}
		<div class="tutorial" transition:fade={{ duration: 100 }}>
			<img src={drag} alt={$t('language.tutorialAlt')} />
		</div>
	{/if}
</div>

<style>
	div.container {
		display: flex;
		flex-direction: column;
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
		color: var(--colour-background);
		font-family: var(--enFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: 1.2rem;
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		justify-content: center;
		position: absolute;
		width: 100%;
		transition: color 100ms eaes-in-out;
	}
	div.language.zh {
		font-family: var(--zhFontFamily);
	}
	div.language.jp {
		font-family: var(--jpFontFamily);
	}

	div.container.debug div.language-selector {
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
		animation-name: swipe-mobile;
		animation-timing-function: ease-in-out;
		transform: translate3d(80%, 300%, 0) rotate(-15deg);
		width: 20%;
	}

	@media (min-width: 480px) {
		div.tutorial img {
			animation-name: swipe;
			transform: translate3d(calc(var(--block-size) * 0.15), calc(var(--block-size) * 0.6), 0)
				rotate(-15deg);
			width: calc(var(--block-size) * 0.2);
		}
	}

	@keyframes swipe-mobile {
		0% {
			transform: translate3d(80%, 300%, 0) rotate(-15deg);
		}

		98% {
			transform: translate3d(310%, 250%, 0) rotate(-15deg);
		}

		100% {
			transform: translate3d(310%, 250%, 0) rotate(-15deg);
		}
	}

	@keyframes swipe {
		0% {
			transform: translate3d(calc(var(--block-size) * 0.15), calc(var(--block-size) * 0.6), 0)
				rotate(-15deg);
		}

		98% {
			transform: translate3d(calc(var(--block-size) * 0.65), calc(var(--block-size) * 0.5), 0)
				rotate(-15deg);
		}

		100% {
			transform: translate3d(calc(var(--block-size) * 0.65), calc(var(--block-size) * 0.5), 0)
				rotate(-15deg);
		}
	}
</style>
