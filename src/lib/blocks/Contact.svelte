<script lang="ts">
	import { t } from '$lib/stores/locale';
	import arrowTopRight from '$lib/svg/arrow-up-right.svg';
	import Eyebrows from '$lib/components/Eyebrows.svelte';
</script>

<article>
	<Eyebrows>{$t('contact.title')}</Eyebrows>
	<div class="contacts">
		<div class="contact">
			<a href="mailto:vivianaverylim@gmail.com">
				<span class="method">{$t('contact.email')}</span>
				<span class="arrow"><img src={arrowTopRight} alt="{$t('contact.emailAlt')}}" /></span>
			</a>
		</div>
		<div class="contact">
			<a href="https://www.linkedin.com/in/avery-lim/" target="_blank">
				<span class="method">{$t('contact.linkedIn')}</span>
				<span class="arrow"><img src={arrowTopRight} alt="{$t('contact.linkedInAlt')}}" /></span>
			</a>
		</div>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
	}

	div.contact {
		border-bottom: 1px solid var(--colouraccent);
		padding-bottom: 3.2px;
	}

	div.contact + div.contact {
		margin-top: 3.2px;
	}

	div.contact a {
		align-items: center;
		cursor: ne-resize;
		display: flex;
		font-family: var(--bodyFontFamily);
		font-optical-sizing: var(--bodyFontOpticalSizing);
		font-size: var(--bodyFontSize);
		font-style: var(--bodyFontStyle);
		font-weight: var(--bodyFontWeight);
		justify-content: space-between;
		letter-spacing: var(--bodyLetterSpacing);
		line-height: var(--bodyLineHeight);
		text-decoration: none;
		width: 100%;
	}

	span.method {
		color: var(--colouraccent);
	}

	span.arrow {
		display: inline-block;
		line-height: var(--bodyFontSize);
	}

	span.arrow img {
		transform-origin: center;
		width: var(--bodyFontSize);
	}

	div.contact:hover span.arrow img {
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
