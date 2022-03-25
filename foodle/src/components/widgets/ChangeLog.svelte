<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'
	import {createEventDispatcher} from "svelte";
	const dispatch = createEventDispatcher();
	export let visible: boolean;
	export let word: string;
	/** The maximum number of alternate definitions to provide*/

	async function GetVersion() {
			const data = await fetch(`https://api.github.com/repos/JasonLovesDoggo/JasonLovesDoggo.github.io/releases/latest`, {
				mode: "cors",
			});
			let json = (await data.json())
			if (data.ok) {
				return json['body'];
			} else {
				throw new Error(`Failed to fetch Changelog`);
			}
	}

</script>

<div class="def">
	{#await GetVersion()}
		<h4>Fetching ChangeLog...</h4>
	{:then data}
	<SvelteMarkdown {GetVersion()} />
	{:catch}
		<div>failed to fetch changelog you can view it <a href="https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io/releases/latest">Here</a> though</div>
	{/await}
</div>

<style>
	h2 {
		display: inline-block;
		margin-right: 1rem;
		margin-bottom: 0.8rem;
	}
	ol {
		padding-left: 1.5rem;
	}
	li {
		margin-bottom: 0.5rem;
	}
	li::first-letter {
		text-transform: uppercase;
	}
	li::marker {
		color: var(--fg-secondary);
	}
</style>
