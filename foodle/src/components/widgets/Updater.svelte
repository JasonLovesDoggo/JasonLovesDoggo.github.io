<!--<script lang="ts">
    export let VersionOutDated: boolean = true
    let OldVersion;
    let filename: string
    let version;
    let LocalVersion;
    let MajorLocalVersion
    import {getContext, onMount} from 'svelte';

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
        LocalVersion = getContext("version")// why man..lmao
        MajorLocalVersion = LocalVersion.slice(0, -1);
        console.log(`Local Version: ${LocalVersion}`)
        return VersionOutDated = version !== LocalVersion;

    }

    onMount(() => {
        console.log('updater loaded')
        CompareVersions()
        setInterval(CompareVersions, 86400000) //Check the latest version once a day
    });
</script>

{#if VersionOutDated}
    <div>
        <div id="OutDatedNotification">
            <h1>Your version of foodle is outdated. Your version is {localStorage.getItem(`foodle-version`)} while the
                newest version is {GetLatestVersion()}</h1>
            <a class="update">Update</a>
        </div>

    </div>
{/if}
<style>
    .update {
        background-color: var(--color-correct);
    }

    .update:hover {
        background-color: var(--color-correct);
    }

    #OutDatedNotification {
        z-index: 1;
        border-radius: 15px;
        border: var(--bg-secondary);
    }
</style>

                     -->
