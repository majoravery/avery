<div class="smiley">
	<div class="head" />
</div>

<style>
	.smiley {
		display: block;
		height: 100%;
		overflow: visible;
		position: relative;
		width: 100%;
	}

	div.head {
		animation-duration: 5s;
		animation-iteration-count: infinite;
		animation-name: rotate;
		animation-timing-function: linear;
		border-radius: 50%;
		clip-path: circle(50% at 50% 50%);
		cursor: crosshair;
		position: relative;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	div.head::before {
		content: '';
		background-image: url('/images/smiley.png');
		background-position: center;
		background-size: contain;
		bottom: 0;
		height: 100%;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
	}

	div.head::before:hover {
		animation-play-state: paused;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-359deg);
		}
	}
</style>
