<script lang="ts">
	import Header from "./Header.svelte";
	import { Board } from "./board";
	import Keyboard from "./keyboard";
	import Modal from "./Modal.svelte";
	import {getContext, onMount, setContext} from "svelte";
	import Settings from "./settings";
	import {
		Share,
		Seperator,
		Definition,
		Contact,
		Tutorial,
		Statistics,
		Distribution,
		Timer,
		Toaster,
		ShareGame,
		Tips,
	} from "./widgets";
	import {
		contractNum,
		DELAY_INCREMENT,
		PRAISE,
		getState,
		modeData,
		checkHardMode,
		ROWS,
		COLS,
		newSeed,
		createNewGame,
		seededRandomInt,
		createLetterStates,
		words,
	} from "../utils";
	import {letterStates, settings, mode} from "../stores";
	import GdprBanner from './widgets/gdprCookies.svelte'

	export let word: string;
	export let showStats: boolean = false;
	export let stats: Stats;
	export let game: GameState;
	export let toaster: Toaster;
	setContext("toaster", toaster);
	const version = getContext<string>("version");
	// implement transition delay on keys
	const delay = DELAY_INCREMENT * ROWS + 800;
	let showTutorial = $settings.tutorial === 3;
	export let showContact = false;
	let showSettings = false;
	let showRefresh = false;
	let showCookieBanner = true;
	let board: Board;
	let timer: Timer;
	let tips: Tips;
	let tip = 0;

	function setContact(option: boolean) {
		showContact = option
	}

	window.addEventListener('hashchange', function () {
		if (window.location.hash.substring(1) === 'contact') {
			showContact = true
		}
	});

	$: if (showSettings && tips) tip = Math.floor(tips.length * Math.random());

	function submitWord() {
		if (game.board.words[game.guesses].length !== COLS) {
			toaster.pop("Not enough letters");
			board.shake(game.guesses);
			//Checks if the word is missing letters
			console.log(game.board.words[game.guesses])  //DEBUG
			console.log(game.guesses)
			console.log('wordslmao')
			console.log(game.board.words)
		} else if (words.contains(game.board.words[game.guesses])) {       //wordlist contains the word
			if (game.guesses > 0) {
				const hm = checkHardMode(game.board, game.guesses);
				if ($settings.hard[$mode]) {
					if (hm.type === "🟩") {
						toaster.pop(
								`${contractNum(hm.pos + 1)} letter must be ${hm.char.toUpperCase()}`
						);
						board.shake(game.guesses);
						return;
					} else if (hm.type === "🟨") {
						toaster.pop(`Guess must contain ${hm.char.toUpperCase()}`);
						board.shake(game.guesses);
						return;
					}
				} else if (hm.type !== "⬛") {
					game.validHard = false;
				}
			}
			const state = getState(word, game.board.words[game.guesses]);
			game.board.state[game.guesses] = state;
			state.forEach((e, i) => {
				const ls = $letterStates[game.board.words[game.guesses][i]];
				if (ls === "🔳" || e === "🟩") {
					$letterStates[game.board.words[game.guesses][i]] = e;
				}
			});
			++game.guesses;
			if (game.board.words[game.guesses - 1] === word) win();
			else if (game.guesses === ROWS) lose();
		} else {
			toaster.pop("Not in word list");
			board.shake(game.guesses);
		}
	}
	function win() {
		// ga('send', 'event', 'game', 'foodle_win', $mode);
		board.bounce(game.guesses - 1);
		game.active = false;
		setTimeout(
			() => toaster.pop(PRAISE[game.guesses - 1]),
			DELAY_INCREMENT * COLS + DELAY_INCREMENT
		);
		setTimeout(() => (showStats = true), delay * 1.4);
		if (!modeData.modes[$mode].historical) {
			++stats.guesses[game.guesses];
			++stats.played;
			if ("streak" in stats) {
				stats.streak =
					modeData.modes[$mode].seed - stats.lastGame > modeData.modes[$mode].unit
						? 1
						: stats.streak + 1;
				if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
			}
			stats.lastGame = modeData.modes[$mode].seed;
			localStorage.setItem(`stats-${$mode}`, JSON.stringify(stats));
		}
	}
	function lose() {
	// 	ga('send', 'event', 'game', 'foodle_lose', $mode);
		game.active = false;
		setTimeout(() => (showStats = true), delay);
		if (!modeData.modes[$mode].historical) {
			++stats.guesses.fail;
			++stats.played;
			if ("streak" in stats) stats.streak = 0;
			stats.lastGame = modeData.modes[$mode].seed;
			localStorage.setItem(`stats-${$mode}`, JSON.stringify(stats));
		}
	}
	function concede() {
	//	ga('send', 'event', 'game', 'foodle_give_up', $mode);
		showSettings = false;
		setTimeout(() => (showStats = true), DELAY_INCREMENT);
		lose();
	}
	function reload() {
		modeData.modes[$mode].historical = false;
		modeData.modes[$mode].seed = newSeed($mode);
		game = createNewGame($mode);
		word = words.words[seededRandomInt(0, words.words.length, modeData.modes[$mode].seed)];
		$letterStates = createLetterStates();
		showStats = false;
		showRefresh = false;
		timer.reset($mode);
	}
	onMount(() => {
		if (!game.active) setTimeout(() => (showStats = true), delay);
	});
	// $: toaster.pop(word);
</script>

<svelte:body on:click={board.hideCtx} on:contextmenu={board.hideCtx} />

<main class:guesses={game.guesses !== 0} style="--rows: {ROWS}; --cols: {COLS}">

	<Header
		bind:showRefresh
		tutorial={$settings.tutorial === 2}
		on:closeTutPopUp|once={() => ($settings.tutorial = 1)}
		showStats={stats.played > 0 || (modeData.modes[$mode].historical && !game.active)}
		on:stats={() => (showStats = true)}
		on:tutorial={() => (showTutorial = true)}
		on:settings={() => (showSettings = true)}
		on:reload={reload}
	/>
	<Board
		bind:this={board}
		bind:value={game.board.words}
		tutorial={$settings.tutorial === 1}
		on:closeTutPopUp|once={() => ($settings.tutorial = 0)}
		board={game.board}
		guesses={game.guesses}
		icon={modeData.modes[$mode].icon}
	/>
	<Keyboard
		on:keystroke={() => {
			if ($settings.tutorial) $settings.tutorial = 0;
			board.hideCtx();
		}}
		bind:value={game.board.words[game.guesses === ROWS ? 0 : game.guesses]}
		on:submitWord={submitWord}
		on:esc={() => {
			showTutorial = false;
			showStats = false;
			showSettings = false;
			showContact = false;
		}}
		disabled={!game.active || $settings.tutorial === 3}
	/>
</main>

<Modal
		bind:visible={showTutorial}
		on:close|once={() => $settings.tutorial === 3 && --$settings.tutorial}
		fullscreen={$settings.tutorial === 0}>

	<Tutorial visible={showTutorial}
			  on:contact={() => {
		showTutorial = false;
		showContact = true;}}
	/>
</Modal>
<GdprBanner/>
<Modal
		bind:visible={showContact}>
	<Contact visible={showContact}/>
</Modal>

<Modal bind:visible={showStats}>
	{#if modeData.modes[$mode].historical}
		<h2 class="historical">Statistics not available for historical games</h2>
	{:else}
		<Statistics data={stats} />
		<Distribution distribution={stats.guesses} guesses={game.guesses} active={game.active} />
	{/if}
	<Seperator visible={!game.active}>
		<Timer
			slot="1"
			bind:this={timer}
			on:timeup={() => (showRefresh = true)}
			on:reload={reload}
		/>
		<Share slot="2" state={game} />
	</Seperator>
	<ShareGame wordNumber={game.wordNumber} />
	{#if !game.active}
		<Definition {word} alternates={2} />
	{/if}
</Modal>

<Modal

		fullscreen={true} bind:visible={showSettings}>
	<Settings on:contact={() => {
		showSettings = false;
		showContact = true;}}
			  state={game}/>
	{#if game.active}
		<div class="concede" on:click={concede}>give up</div>
	{/if}
	<Tips bind:this={tips} index={tip}/>

	<div slot="footer">

		<div on:click={() => {
		showSettings = false;
		showContact = true;
		}} style="text-decoration: underline">Contact
		</div>
		<a href="https://www.powerlanguage.co.uk/wordle/" target="_blank">Original Wordle</a>
		<div>
			<div>v{version}</div>
			<div
					title="double click to reset your stats"
					class="word"
					on:dblclick={() => {
					localStorage.clear();
					toaster.pop("localStorage cleared");
				}}
			>
				{modeData.modes[$mode].name} Foodle #{game.wordNumber}
			</div>
		</div>
	</div>
</Modal>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		max-width: var(--game-width);
		margin: auto;
		position: relative;
	}

	.historical {
		text-align: center;
		margin-top: 10px;
		padding: 0 20px;
		text-transform: uppercase;
	}
	.concede {
		margin-top: 15px;
		text-transform: uppercase;
		color: #fff;
		cursor: pointer;
		font-size: var(--fs-medium);
		font-weight: bold;
		padding: 15px;
		border-radius: 4px;
		text-align: center;
		background-color: var(--red);
		&:hover {
			opacity: 0.9;
		}
	}
</style>

