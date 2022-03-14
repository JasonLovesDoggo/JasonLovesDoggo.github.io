<script>
  import Cookies from 'js-cookie';
  import { fade } from 'svelte/transition';
  import { onMount, createEventDispatcher } from 'svelte';
  import { validate } from '../../utils';

  const dispatch = createEventDispatcher();

  export let cookieName = 'gdpr_settings';

  let shown = false;
  let settingsShown = false;

  export let heading = 'GDPR Cookie Policy';
  export let description_1 =
          'We use cookies to offer a better browsing experience, analyze site traffic and provide statistics for Foodle. By Continuing, you consent to our ';
  export let description_2 = '& use of cookies.';

  export let categories = {
    analytics: function () {
      console.log('analytics accepted');
    },
    statistics: function () {
      console.log('statistics accepted');
    },
    necessary: function () {
      console.log('necessary accepted');
    }
  };

  export let cookieConfig = {};

  const defaults = {
    sameSite: 'strict'
  };

  export let choices = {};
  const choicesDefaults = {
    necessary: {
      label: 'Necessary cookies',
      description: 'Used for cookie control.',
      value: true
    },
    statistics: {
      label: 'statistics cookies',
      description: 'Used for Statistics purposes. Such as keeping your foodle score',
      value: true
    },
    analytics: {
      label: 'Analytics cookies',
      description:
              'Used to control Google Analytics, a 3rd party tool offered by Google to analyse user behavior.',
      value: true
    }
  };

  $: choicesMerged = Object.assign({}, choicesDefaults, choices);

  $: choicesArr = Object.values(choicesMerged)
          .map((item, index) => {
            return Object.assign(
                    {},
                    item,
                    { id: Object.keys(choicesMerged)[index] }
            );
          });

  $: cookieChoices = choicesArr.reduce((result, item, index, array) => {
    result[item.id] = item.value ? item.value : false;
    return result;
  }, {});

  export let acceptLabel = 'Continue';
  export let settingsLabel = 'Types of Cookies Used';
  export let closeLabel = 'Close';

  export function show() {
    shown = true;
  }

  onMount(() => {
    if (!cookieName) {
      throw new Error('You must set gdpr cookie name');
    }

    const cookie = Cookies.get(cookieName);
    if (!cookie) {
      show();
    }

    try {
      const { choices } = JSON.parse(cookie);
      const valid = validate(cookieChoices, choices);

      if (!valid) {
        throw new Error('cookie consent has changed');
      }

      execute(choices);
    } catch (e) {
      removeCookie();
      show();
    }
  });

  function setCookie(choices) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 365);

    const options = Object.assign({}, defaults, cookieConfig, { expires });
    Cookies.set(cookieName, JSON.stringify({ choices }), options);
  }

  function removeCookie() {
    const { path } = cookieConfig;
    Cookies.remove(cookieName, Object.assign({}, path ? { path } : {}));
  }

  function execute(chosen) {
    const types = Object.keys(cookieChoices);

    types.forEach(t => {
      const agreed = chosen[t];
      if (choicesMerged[t]) {
        choicesMerged[t].value = agreed;
      }
      if (agreed) {
        categories[t] && categories[t]();
        dispatch(`${t}`);
      }
    });
    shown = false;
  }

  function choose() {
    setCookie(cookieChoices);
    execute(cookieChoices);
  }
</script>

{#if shown}
  <div class="cookieConsentWrapper" transition:fade>
    <div class="cookieConsent">
      <div class="cookieConsent__Left">
        <div class="cookieConsent__Content">
          <h4 class="cookieConsent__Title">{heading}</h4>
          <br>
          <p class="cookieConsent__Description">
            {@html description_1}
          </p>
          <a href="./privacy.html">Privacy Policy</a>
          <p class="cookieConsent__Description">
            {@html description_2}
          </p>
        </div>
      </div>
      <div class="cookieConsent__Right">
        <button
                type="button"
                class="cookieConsent__Button"
                on:click={() => { settingsShown = true } }>
          {settingsLabel}
        </button>
        <button type="submit" class="cookieConsent__Button" on:click={choose}>
          {acceptLabel}
        </button>
      </div>
    </div>
  </div>
{/if}

{#if settingsShown}
  <div class="cookieConsentOperations" transition:fade>
    <div class="cookieConsentOperations__List">
      {#each choicesArr as choice}
        {#if Object.hasOwnProperty.call(choicesMerged, choice.id) && choicesMerged[choice.id]}
          <div
                  class="cookieConsentOperations__Item"
                  class:disabled={true}>
            <input
                    type="checkbox"
                    id={`gdpr-check-${choice.id}`}
                    bind:checked={choicesMerged[choice.id].value}
                    disabled/>      <!-- add logic to actually disable the cookies maybe-->
            <label for={`gdpr-check-${choice.id}`}>{choice.label}</label>
            <span class="cookieConsentOperations__ItemLabel">
            {choice.description}
          </span>
          </div>
        {/if}
      {/each}
      <button
              type="submit"
              class="cookieConsent__Button cookieConsent__Button--Close"
              on:click={() => { settingsShown = false } }>
        {closeLabel}
      </button>
    </div>
  </div>
{/if}
