<!-- Slot machine implementation inspired by https://codepen.io/AdrianSandu/pen/MyBQYz -->

<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { isDebugLanguage } from '$lib/stores/debugMode';

	let container: HTMLDivElement;
	let activeLanguage = 0;

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

	const options = {
		duration: 400,
		easing: cubicOut
	};
	const rotateX = tweened(0, options);

	let height: number;
	let radius: number;
	let step = 360 / languages.length;

	onMount(() => {
		height = container.getBoundingClientRect().height / 6;
		radius = Math.ceil(Math.round(height / 2) / Math.tan(Math.PI / languages.length));
	});

	function prev() {
		activeLanguage = activeLanguage < 0 ? languages.length - 1 : activeLanguage - 1;
		rotateX.update((n) => n + step);
	}

	function next() {
		activeLanguage = activeLanguage === languages.length - 1 ? 0 : activeLanguage + 1;
		rotateX.update((n) => n - step);
	}
</script>

<div class="container" class:debug={$isDebugLanguage} bind:this={container}>
	<button class="prev" on:click={prev}>
		<span>
			<svg
				height="800"
				viewBox="0 0 330.002 330.002"
				width="800"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="m327.001 99.751c-4.971-6.628-14.374-7.971-21-3l-140.997 105.75-141.003-105.75c-6.628-4.971-16.029-3.626-21 3-4.971 6.627-3.627 16.03 3 21l150.004 112.5c2.667 2 5.833 3 9 3 3.166 0 6.333-1 9-3l149.996-112.5c6.627-4.97 7.971-14.372 3-21z"
				/>
			</svg>
		</span>
	</button>

	<div class="scroller-wrap">
		<div class="scroller" style:height={`${height}px`}>
			{#each languages as language, index}
				<div
					class="language"
					class:active={activeLanguage === index}
					style:height={`${height}px`}
					style:transform={`rotateX(${$rotateX + step * index}deg) translateZ(${radius}px)`}
				>
					{language.name}
				</div>
			{/each}
		</div>
	</div>

	<button class="next" on:click={next}>
		<span>
			<svg
				height="800"
				viewBox="0 0 330.002 330.002"
				width="800"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="m327.001 99.751c-4.971-6.628-14.374-7.971-21-3l-140.997 105.75-141.003-105.75c-6.628-4.971-16.029-3.626-21 3-4.971 6.627-3.627 16.03 3 21l150.004 112.5c2.667 2 5.833 3 9 3 3.166 0 6.333-1 9-3l149.996-112.5c6.627-4.97 7.971-14.372 3-21z"
				/>
			</svg>
		</span>
	</button>
</div>

<style>
	div.container {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 5;
	}

	div.container::after {
		content: '';
		background: linear-gradient(rgb(255, 255, 255) 0%, transparent 50%, rgb(255, 255, 255) 100%);
		bottom: 0;
		height: 100%;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
	}

	button.prev,
	button.next {
		cursor: pointer;
		font-size: 0;
		left: 0;
		position: absolute;
		right: 0;
		width: 35%;
		z-index: 2;
		margin: auto;
		border: none;
		background: transparent;
	}

	button.prev {
		top: 1rem;
	}

	button.next {
		bottom: 1rem;
	}

	button.prev span,
	button.next span {
		background: rgb(255, 255, 255);
		display: block;
		padding: 0.1rem 0.25rem;

		/* stolen from chester.how's nav */
		border: 1px solid rgb(229, 229, 229);
		border-radius: var(--border-radius-s);
		/* box-shadow:
			rgba(0, 0, 0, 0) 0 0 0 0,
			rgba(0, 0, 0, 0) 0 0 0 0,
			rgba(0, 0, 0, 0.1) 0 4px 6px -1px,
			rgba(0, 0, 0, 0.1) 0 2px 4px -2px; */

		transition: box-shadow 100ms ease-in-out;
	}

	button.prev span:active,
	button.next span:active {
		/* box-shadow:
			rgba(0, 0, 0, 0) 0 0 0 0,
			rgba(0, 0, 0, 0) 0 0 0 0,
			rgba(0, 0, 0, 0.1) 0 0 0 0,
			rgba(0, 0, 0, 0.1) 0 0 0 0; */
	}

	button.prev span svg {
		transform: rotate(180deg);
	}

	button.prev span svg,
	button.next span svg {
		fill: var(--color-accent);
		height: auto;
		width: 30%;
	}

	div.scroller-wrap {
		align-items: center;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		transform-style: preserve-3d;
		width: 100%;
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
</style>
