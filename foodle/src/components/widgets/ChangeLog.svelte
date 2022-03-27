<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'

    export let visible: boolean;


 const source = `
  # This is a header

This is a paragraph.

* This is a list
* With two items
  1. And a sublist
  2. That is ordered
    * With another
    * Sublist inside

| And this is | A table |
|-------------|---------|
| With two    | columns |`

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

<div class:complete={visible} id="ChangeLogContainer">
<SvelteMarkdown {source} />
    <h5>Test</h5>
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
