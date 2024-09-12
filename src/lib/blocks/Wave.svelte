<div />

<style>
	div {
		/* filter: grayscale(1); */
		height: 100%;
		overflow: visible;
		position: relative;
		transform-origin: right bottom;
		width: 100%;
	}

	div::before {
		content: '';
		background-image: url('images/wave-emoji.png');
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
		bottom: 0;
		cursor: grab;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
	}

	div:hover {
		animation: shake 700ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	}

	@keyframes shake {
		10%,
		90% {
			transform: rotate(-1deg);
		}
		20%,
		80% {
			transform: rotate(2deg);
		}
		30%,
		50%,
		70% {
			transform: rotate(-4deg);
		}
		40%,
		60% {
			transform: rotate(4deg);
		}
	}
</style>
