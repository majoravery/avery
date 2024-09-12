<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

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
	const scrollerRotateX = tweened(0, options);
	const languageRotateX = tweened(0, options);

	let renderOrder = [...languages, ...languages];

	function prev() {
		activeLanguage = activeLanguage < 0 ? languages.length - 1 : activeLanguage--;
		console.log('prev');
	}

	function next() {
		activeLanguage = activeLanguage === languages.length - 1 ? 0 : activeLanguage++;
		// scrollerRotateX.update((n) => n + 90);
		// languageRotateX.update((n) => n - 90);
		console.log('next');
	}
</script>

<div class="container">
	<button class="prev" on:click={prev}>prev</button>
	<div class="scroller-container">
		<div class="scroller">
			<div class="scroller" style:transform={`rotateX(${$scrollerRotateX}deg)`}>
				{#each renderOrder as language, index}
					<div
						class="language"
						style:transform={`rotateX(${$languageRotateX + (360 / renderOrder.length - 1) * index}deg) translateZ(40px)`}
					>
						{language.name}
					</div>
				{/each}
			</div>
		</div>
	</div>
	<button class="next" on:click={next}>next</button>
</div>

<style>
	div.container {
		z-index: 5;
		position: relative;
		height: 100%;
		width: 100%;
	}

	button.prev,
	button.next {
		position: absolute;
		left: 0;
		right: 0;
		z-index: 2;
	}

	button.prev {
		top: 0;
	}

	button.next {
		bottom: 0;
	}

	div.scroller-container {
		transform-style: preserve-3d;
		transform: rotateY(45deg);

		width: 100%;
		height: 100%;
	}

	div.scroller {
		text-align: center;
		/* overflow: hidden; */
		width: 100%;
		height: 20px;

		transform-style: preserve-3d;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	div.scroller::after {
		content: '';
		background: linear-gradient(
			rgba(255, 255, 255) 0%,
			transparent 40%,
			transparent 60%,
			rgba(255, 255, 255) 100%
		);
		bottom: 0;
		height: 100%;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
	}

	div.language {
		border: 1px solid black;
		width: 100%;
		height: calc(var(--cell-unit-dimension) / 3);
		position: absolute;

		backface-visibility: visible;
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 8px;
	}
</style>
