<script lang="ts">
	import { t } from '$lib/stores/locale';
</script>

<div class="block">
	<article id="introductions">
		<div class="welcome">
			<p>Welcome!</p>
			<p>
				I hope you'll enjoy exploring the site and all its tiles as much as I enjoyed building it.
				Refresh to see a different layout every time. Try visiting this on a desktop browser too–it
				looks better on there ;-)
			</p>
			<p></p>
			<p>Gotcha</p>
		</div>
	</article>
</div>

<style>
	div.block {
		background: rgb(255, 255, 255);
		border-radius: var(--border-radius-m);
		box-sizing: border-box;
		grid-column-end: var(--column-end);
		grid-column-start: var(--column-start);
		grid-row-end: var(--row-end);
		grid-row-start: var(--row-start);
		/* height: 100%; */
		width: 400px;
		overflow: hidden;
		padding: var(--block-padding);
		position: absolute;
		transition:
			grid-column-end 200ms ease-in-out,
			grid-row-end 200ms ease-in-out;

		aspect-ratio: var(--aspect-ratio);
	}

	article {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
	}

	div.welcome {
		font-family: var(--enFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		color: var(--colour-accent);
	}

	div.welcome > p:first-child {
		margin-top: 0;
	}
	div.welcome > p:last-child {
		margin-bottom: 0;
	}
</style>
