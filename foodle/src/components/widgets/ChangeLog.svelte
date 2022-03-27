<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'

    export let visible: boolean;
    let source: Response | string = ` # Fetching ChangeLog...`
    let filename: string
    import { onMount } from 'svelte';

	onMount(() => {
        console.log('ChangeLog Loaded')
		GetLatestVersion()
	});
    /** The maximum number of alternate definitions to provide*/

    async function GetLatestVersion() {    // TODO: change this to the foodle api when ready
        const data = await fetch(`https://api.github.com/repos/JasonLovesDoggo/JasonLovesDoggo.github.io/releases/latest`, {
            mode: "cors",
        });
        let json = (await data.json())
        if (data.ok) {
            return source = await GetChangeLog(json['tag_name']);
        } else {
            return source = ` # Failed to fetch Changelog`

        }
    }
    async function GetChangeLog(tag_name) {    // TODO: change this to the foodle api when ready
        const data = await fetch(`https://nasoj.me/foodle/changelogs/${tag_name}.md`, {
            mode: "cors",
            cache: 'no-cache'
        });
        if (data.ok) {
            return data;
        } else {
            return source = ` # Failed to fetch Changelog`

        }
    }

</script>

<div class:complete={visible} id="ChangeLogContainer">
    <h5>Not Yet Implemented</h5>
    <!--     <SvelteMarkdown {source} /> -->
</div>


<style>
    h1 {
        padding-left: 1.5rem;
    }

    #ChangeLogContainer {
        margin: 5%;
    }

    h2 {
        display: inline-block;
        margin-right: 1rem;
        margin-bottom: 0.8rem;
    }

    h2 {
        margin-bottom: 0.5rem;
    }

    h1::first-letter {
        text-transform: uppercase;
    }
</style>
