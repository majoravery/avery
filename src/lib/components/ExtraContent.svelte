<script lang="ts">
	/**
	 * For this to work, the .preview content in the block should be position absolute :-)
	 */
	import { t } from '$lib/stores/locale';
	import arrowDownLeft from '$lib/svg/arrow-down-left.svg';

	export let expanded: boolean;
	export let standout: boolean = false;
</script>

<div class="extra" class:visible={expanded} class:standout>
	<span class="extra-close">
		<img src={arrowDownLeft} alt={$t('site.closePopUp')} />
	</span>
	<div class="extra-content">
		<slot />
	</div>
</div>

<style>
	div.extra {
		align-items: flex-end;
		display: flex;
		height: 100%;
		margin-bottom: calc(var(--block-padding) * -1);
		opacity: 0;
		overflow: hidden;
		width: 100%;
		z-index: 5;
	}

	div.extra-content {
		box-sizing: border-box;
		color: var(--color-accent);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		height: calc(100% - var(--eyebrow-height) * 2);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		padding-top: var(--block-padding);
		margin-bottom: calc(var(--block-padding) * 2);
		overflow-x: hidden;
		overflow-y: scroll;
		width: 100%;
	}

	div.extra-content:before {
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
		z-index: 1;
	}

	div.extra.standout .extra-content:before {
		height: calc(var(--eyebrow-height) + var(--block-padding) + 0.5rem);
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
		display: inline-block;
		line-height: var(--eyebrow-height);
		position: absolute;
		right: 0;
		top: 0;
		z-index: 5;
	}

	div.extra.standout span.extra-close {
		top: 0.25rem; /* See Eyebrows.svelte */
	}

	span.extra-close img {
		transform-origin: center;
	}

	span.extra-close:after {
		content: '';
		height: 3rem;
		position: absolute;
		right: -1rem;
		top: -1rem;
		width: 3rem;
	}

	div.extra.standout span.extra-close:after {
		content: '';
		height: 3.25rem;
		position: absolute;
		right: -1rem;
		top: -1.25rem;
		width: 3rem;
	}

	span.extra-close:hover img {
		animation-name: wheee;
		animation-duration: 400ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
	}

	span.extra-close img {
		transform-origin: center;
		width: var(--eyebrow-height);
	}

	div.extra.visible:hover span.extra-close {
		transform: translate3d(-50%, 50%, 0);
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
