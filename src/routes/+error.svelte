<script>
	import { page } from '$app/stores';
</script>

<article>
	<h1>{$page.status}</h1>
	<h2>{$page?.error?.message}</h2>
	<p>
		What'd ya up and do? Try to bust in with the wrong name or didja break my whole app?
	</p>
	<p>
		If it's the former, this thing is only configured to work with specific people, and you're apparently not one of them!
		If it's the latter, tell me what you did so I can fix it.
	</p>
</article>

<style>
	article{
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	h1{
		font-size: 3rem;
	}
	h2{
		font-size: 2rem;
	}
</style>