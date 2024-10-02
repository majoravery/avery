<script lang="ts">
	/**
	 * To not mess up content here, the .preview content in the block should be position absolute :-)
	 */
	import { t } from '$lib/stores/locale';
	import arrowDownLeft from '$lib/svg/arrow-down-left.svg';

	export let expanded: boolean;
	export let standout: boolean = false;
</script>

<div class="extra" class:standout>
	<div class="extra-content">
		<slot />
	</div>
</div>
<span class="extra-close" class:visible={expanded} class:standout>
	<img src={arrowDownLeft} alt={$t('site.closePopUp')} />
</span>

<style>
	div.extra {
		--extra-padding-top: calc(var(--eyebrow-height) + (var(--block-padding) / 2));

		align-items: flex-end;
		box-sizing: border-box;
		display: flex;
		height: calc(100% + var(--extra-padding-top));
		margin-bottom: calc(var(--block-padding) * -1);
		opacity: 0;
		overflow: hidden;
		padding-top: var(--extra-padding-top);
		position: absolute;
		width: 100%;
		z-index: 5;
	}

	div.extra.standout {
		--extra-padding-top: calc(var(--eyebrow-height) + var(--block-padding));
	}

	div.extra:before {
		content: '';
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 1) 75%,
			rgba(255, 255, 255, 0) 100%
		);
		width: 100%;
		top: 0;
		left: 0;
		height: calc(var(--eyebrow-height) + var(--block-padding));
		position: absolute;
		z-index: 2;
	}

	div.extra.standout:before {
		height: calc(
			var(--eyebrow-height) + var(--block-padding) + (var(--eyebrow-standout-padding-x) * 2)
		);
	}

	div.extra-content {
		box-sizing: border-box;
		color: var(--color-accent);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		height: 100%;
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		padding-bottom: var(--block-padding);
		overflow-x: hidden;
		overflow-y: scroll;
		width: 100%;
	}

	div.extra.standout div.extra-content {
		padding-top: 0.5rem;
	}

	div.extra-content :global(a) {
		cursor: ne-resize;
		color: var(--color-accent);
	}

	div.extra-content :global(img) {
		border-radius: var(--border-radius-s);
		width: 100%;
	}

	span.extra-close {
		cursor: zoom-out;
		display: none;
		line-height: var(--eyebrow-height);
		padding: 1rem;
		position: absolute;
		right: -1rem;
		top: calc(var(--block-padding) * -1);
		z-index: 15;
	}

	span.extra-close.visible {
		display: inline-block;
	}

	/* Offsets the 1rem padding for interactive space with the standout padding in Eyebrows.svelte */
	span.extra-close.standout {
		top: calc(var(--block-padding) * -1 + var(--eyebrow-standout-padding-x));
	}

	span.extra-close img {
		pointer-events: none;
		width: var(--eyebrow-height);
	}

	span.extra-close:hover img {
		animation-name: wheee;
		animation-duration: 400ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
	}

	@keyframes wheee {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(720deg);
		}
	}
</style>
