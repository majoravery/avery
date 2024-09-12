clock

<!-- <div class="clocks">
	<div class="clock">
		<div class="time">
			<span>11:53</span>
			<span class="minute">53</span>
		</div>
		<span class="city">Singapore</span>
	</div>
	<div class="clock">
		<div class="time">
			<span class="hour">02:53</span>
			<span class="minute">52</span>
		</div>
		<span class="city">Fukuoka</span>
	</div>
</div> -->

<style>
	div.clocks {
		display: flex;
		gap: var(--grid-gap);
		height: 100%;
	}

	div.clock {
		background-color: var(--color-filler);
		border-radius: var(--border-radius-s);
		padding: 0.5rem;
		width: 100%;
	}

	div.time span {
		display: block;
		font-family: 'JetBrains Mono', monospace;
		font-optical-sizing: auto;
		font-weight: 300;
		font-size: 2rem;
		line-height: 1.8rem;
		font-style: normal;
		text-align: center;
	}

	span.city {
		display: block;
		font-family: 'JetBrains Mono', monospace;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
		text-align: center;
	}
</style>
