<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'

    export let visible: boolean;
    let source: Response | string = ` # Fetching ChangeLog...`
    let filename: string
    let githuburl: string
    import { onMount } from 'svelte';

	onMount(() => {
        GetLatestVersion()
		//setInterval(GetLatestVersion, 86400000) //Check the latest version once a day
	});
    /** The maximum number of alternate definitions to provide*/

    async function GetLatestVersion() {    // TODO: change this to the foodle api when ready
        const data = await fetch(`https://api.github.com/repos/JasonLovesDoggo/JasonLovesDoggo.github.io/releases/latest`, {
            mode: "cors",
        });
        let json = (await data.json())
        if (data.ok) {
            githuburl = json['html_url']
             console.log(`Version: ${json['tag_name']}`)
            return source = await GetChangeLog(json['tag_name']);
        } else {
            return source = ` # Failed to fetch Changelog`

        }
    }
    async function GetChangeLog(tag_name) {    // TODO: change this to the foodle api when ready
        const data = await fetch(`https://nasoj.me/foodle/changelogs/${tag_name}.md`, {
            cache: 'no-cache'
        });
        if (data.ok) {
            return data.text();
        } else {
            return source = ` # Failed to fetch Changelog`

        }
    }

</script>

<div class:complete={visible} id="ChangeLogContainer">
    <SvelteMarkdown {source} />
    <h2><a target="_blank" href={githuburl}>View on GitHub</a></h2>
</div>


<style>
    #ChangeLogContainer {margin: 5%;}
</style>
