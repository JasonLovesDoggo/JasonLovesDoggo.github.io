<script lang="ts">
    export let VersionOutDated: boolean = true
    let filename: string
    let version;
    import {getContext, onMount} from 'svelte';

    onMount(() => {
        setInterval(CompareVersions, 86400000) //Check the latest version once a day
    });

    async function GetLatestVersion() {    // TODO: change this to the foodle api when ready
        const data = await fetch(`https://foodle-website-api.herokuapp.com/v1/foodle/version`, {
            mode: "no-cors",
        });
        if (data.ok) {
            let json = await data.json();
            console.log(`Server Version: ${json['version']}`)
            return version = json['version']
        }

    }

    export function CompareVersions() {
        version = GetLatestVersion()
        let LocalVersion;
        LocalVersion = getContext<string>("version").slice(0, -1);
        console.log(`Local Version: ${LocalVersion}`)
        return version !== LocalVersion;

    }
</script>

<div class:complete={VersionOutDated}>
    {#if VersionOutDated}
        <div id="OutDatedNotification">
            <h1>Your version of foodle is outdated. Your version is {localStorage.getItem(`foodle-version`)} while the
                newest version is {GetLatestVersion()}</h1>
            <a class="update">Update</a>
        </div>
    {/if}

</div>
<style>
    .update {
        background-color: var(--color-correct);
    }

    .update:hover {
        background-color: var(--color-correct);
    }

    #OutDatedNotification {
        border-radius: 15px;
        border: var(--bg-secondary);
    }
</style>

