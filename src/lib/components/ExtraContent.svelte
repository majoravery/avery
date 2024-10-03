<script lang="ts">
	/**
	 * To not mess up content here, the .preview content in the block should be position absolute :-)
	 */
	import { t } from '$lib/stores/locale';
	import arrowDownLeft from '$lib/svg/arrow-down-left.svg';

	export let expanded: boolean;
	export let standout: boolean = false;
</script>

<div class="extra-header-bg" class:standout />
<div class="extra-content" class:standout>
	<slot />
</div>
<span class="extra-close" class:visible={expanded} class:standout>
	<img src={arrowDownLeft} alt={$t('site.closePopUp')} />
</span>

<style>
	div.extra-content {
		--extra-padding-top: calc(var(--eyebrow-height) + var(--block-padding));

		box-sizing: border-box;
		color: var(--color-accent);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		height: calc(100% + var(--extra-padding-top));
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		overflow-x: hidden;
		overflow-y: scroll;
		padding-bottom: calc(var(--block-padding) * 1.5);
		padding-top: var(--extra-padding-top);
		position: absolute;
		width: 100%;
		visibility: hidden;
		z-index: 5;
	}

	div.extra-content.standout {
		--extra-padding-top: calc(
			var(--eyebrow-height) + var(--block-padding) + var(--eyebrow-standout-padding-x) * 2
		);
	}

	div.extra-header-bg {
		--extra-header-bg-height: calc(var(--eyebrow-height) + var(--block-padding) * 2);

		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 1) 80%,
			rgba(255, 255, 255, 0) 100%
		);
		height: var(--extra-header-bg-height);
		left: 0;
		position: fixed;
		top: 0;
		visibility: hidden;
		width: 100%;
		z-index: 9;
	}

	div.extra-header-bg.standout {
		--extra-header-bg-height: calc(
			var(--eyebrow-height) + var(--eyebrow-standout-padding-x) * 2 + var(--block-padding) * 2
		);
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

	span.extra-close:active img {
		animation-name: none;
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
