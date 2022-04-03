<script lang="ts">
    import type Toaster from "./Toaster.svelte";
    import {mode} from "../../stores";
    import {COLS, modeData} from "../../utils";
    import {getContext} from "svelte";
    import GameIcon from '../GameIcon.svelte';
    let stats;
    export let state: GameState;
    export let wordNumber: number;
    const toaster = getContext<Toaster>("toaster");

    function share() {
        toaster.pop("Copied");
        navigator.clipboard.writeText(`${window.location.href}/${wordNumber}`);
    }


    function failed() {
        if (state.guesses === 0) {
            return false;
        }
        return state.board.state[state.guesses - 1].join("") === "🟩".repeat(COLS);

    }
    $: stats = `${modeData.modes[$mode].name} Foodle #${state.wordNumber} ${
        !state.active && failed() ? state.guesses : "X"
    }/${state.board.words.length}\n\n    ${state.board.state
        .slice(0, state.guesses)
        .map((r) => r.join(""))
        .join("\n    ")}\n\n`;


</script>
<div id="share_container">
<div on:click={share}>
    <GameIcon>
        <path
                d="M4.167 4.167c-1.381 1.381-1.381 3.619 0 5L6.5 11.5a1.18 1.18 0 0 1 0 1.667 1.18 1.18 0 0 1-1.667 0L2.5 10.833C.199 8.532.199 4.801 2.5 2.5s6.032-2.301 8.333 0l3.333 3.333c2.301 2.301 2.301 6.032 0 8.333a1.18 1.18 0 0 1-1.667 0 1.18 1.18 0 0 1 0-1.667c1.381-1.381 1.381-3.619 0-5L9.167 4.167c-1.381-1.381-3.619-1.381-5 0zm5.667 14c-2.301-2.301-2.301-6.032 0-8.333a1.18 1.18 0 0 1 1.667 0 1.18 1.18 0 0 1 0 1.667c-1.381 1.381-1.381 3.619 0 5l3.333 3.333c1.381 1.381 3.619 1.381 5 0s1.381-3.619 0-5L17.5 12.5a1.18 1.18 0 0 1 0-1.667 1.18 1.18 0 0 1 1.667 0l2.333 2.333c2.301 2.301 2.301 6.032 0 8.333s-6.032 2.301-8.333 0l-3.333-3.333z"></path>
    </GameIcon>
    Copy link to this game ({modeData.modes[$mode].name} #{wordNumber})
</div>
    |
<div>
    <a
       href="https://twitter.com/intent/tweet?text={encodeURIComponent(stats)}&url=https%3A%2F%2Fnasoj.me%2Ffoodle&related=JasonLovesDoggo">Tweet
        Your Score</a>

</div>
</div>

<style>
    #share_container {
  display: inline-flex;
    }
    div {
        color: var(--fg-secondary);
        font-size: var(--fs-regular);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }
</style>
