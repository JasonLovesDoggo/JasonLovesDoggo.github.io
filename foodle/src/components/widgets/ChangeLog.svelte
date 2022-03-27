<script lang="ts">

    export let visible: boolean;
    let source: Response | string = ` # Fetching ChangeLog...`
    let filename: string
    let githuburl: string
    let json: Record<string, string | []> = {};
    let errormsg: string
    //import { onMount } from 'svelte';
            //TODO: redo this module with the foodle api
    //onMount(() => {
    //setInterval(GetLatestVersion, 86400000) //Check the latest version once a day
    //});

    async function GetLatestVersion() {    // TODO: change this to the foodle api when ready
        const data = await fetch(`https://api.github.com/repos/JasonLovesDoggo/JasonLovesDoggo.github.io/releases/latest`, {
            mode: "cors",
        });
        let json = (await data.json())
        if (data.ok) {
            githuburl = json['html_url']
            return await GetChangeLog(json['tag_name']);
        }

    }

    async function GetChangeLog(tag_name) {    // TODO: change this to the foodle api when ready
        const data = await fetch(`https://nasoj.me/foodle/changelogs/${tag_name}.json`, {
            cache: 'no-cache'
        });
        if (data.ok) {
            return json = await data.json();
        } else {
            throw new Error('Failed to fetch the changelog')

        }
    }
    //TODO make the changelog scrollable via {#each and loop through the
</script>

<div class:complete={visible} id="ChangeLogContainer">
    {#await GetLatestVersion()}
        <h1>Fetching data...</h1>
    {:then json}
        {#if errormsg !== ''}

            <h1 style="padding-bottom: 7%;" class="center">Foodle {json['version']}</h1>
            <h2>{json['title']}</h2>
            <ul class="margind">
                {#each json['changes'] as change}
                    <li class="margind">{change}</li>
                {/each}
            </ul>
            <h2 style="padding-top: 4%;" class="center"><a target="_blank" href={githuburl}>View on GitHub</a>
            </h2>
        {/if}

    {:catch s}
        <div><h2> Failed to fetch the changelog but you can <a target="_blank" href={githuburl}>view it on GitHub</a>
        </h2></div>
    {/await}

</div>


<style>
    *:before, *:after {
        margin-bottom: 5px;
    }

    .center {
        margin: auto;
        width: 50%;
    }

    .margind {
        margin: 15px;
    }
    #ChangeLogContainer {
        position: relative;
        margin: 5%;
    }
</style>
