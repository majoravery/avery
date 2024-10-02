<script lang="ts">
	import { t } from '$lib/stores/locale';
	import arrowDownLeft from '$lib/svg/arrow-down-left.svg';

	export let expanded: boolean;
	export let standout: boolean;
</script>

<div class="extra" class:visible={expanded}>
	<span class="extra-close" class:standout>
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
		/* position: absolute; */
		width: 100%;
		z-index: 5;
		/* maybe add visiblity: hidden? */
	}

	div.extra-content {
		color: var(--color-accent);
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOptical);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		height: calc(100% - var(--eyebrow-height) * 2);
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		padding-top: calc(var(--block-padding) * 3);
		padding-bottom: var(--block-padding);
		overflow-y: scroll;
		width: 100%;
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
	}

	span.extra-close.standout {
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

	span.extra-close.standout:after {
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
