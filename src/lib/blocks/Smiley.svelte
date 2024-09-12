<div class="smiley">
	<div class="head" />
</div>

<style>
	div.smiley {
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
		bottom: 0;
		clip-path: circle(50% at 50% 50%);
		cursor: crosshair;
		height: 100%;
		left: 0;
		position: relative;
		right: 0;
		top: 0;
		width: 100%;
	}

	div.head::before {
		content: '';
		background-image: url('/images/smiley.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
		bottom: 0;
		height: 100%;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
	}

	div.head:hover {
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
