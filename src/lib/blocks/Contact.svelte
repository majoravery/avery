<script lang="ts">
	import Eyebrow from '$lib/components/Eyebrow.svelte';
	import arrowTopRight from '$lib/svg/arrow-up-right.svg';
</script>

<article>
	<Eyebrow>Contact</Eyebrow>
	<div class="contacts">
		<div class="contact">
			<a href="mailto:vivianaverylim@gmail.com">
				<span>Email</span>
				<span class="arrow"><img src={arrowTopRight} alt="Email me" /></span>
			</a>
		</div>
		<div class="contact">
			<a href="https://www.linkedin.com/in/avery-lim/" target="_blank">
				<span>LinkedIn</span>
				<span class="arrow"><img src={arrowTopRight} alt="Stalk my work history" /></span>
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
		border-bottom: 1px solid var(--color-background);
	}

	div.contact + div.contact {
		margin-top: 0.3rem;
	}

	div.contact a {
		color: rgb(0, 0, 0);
		display: flex;
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
		font-size: 0.85rem;
		font-style: normal;
		font-weight: 400;
		justify-content: space-between;
		line-height: 1.1rem;
		text-decoration: none;
		width: 100%;
	}

	span.arrow {
		display: inline-block;
	}

	span.arrow img {
		transform-origin: center;
		width: 1rem;
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
