// ╔╗ ╔═╗╔╗╔╔╦╗╔═╗
// ╠╩╗║╣ ║║║ ║ ║ ║
// ╚═╝╚═╝╝╚╝ ╩ ╚═╝
// ┌─┐┌─┐┌┐┌┌─┐┬┌─┐┬ ┬┬─┐┌─┐┌┬┐┬┌─┐┌┐┌
// │  │ ││││├┤ ││ ┬│ │├┬┘├─┤ │ ││ ││││
// └─┘└─┘┘└┘└  ┴└─┘└─┘┴└─┴ ┴ ┴ ┴└─┘┘└┘

const CONFIG = {
  // ┌┐ ┌─┐┌─┐┬┌─┐┌─┐
  // ├┴┐├─┤└─┐││  └─┐
  // └─┘┴ ┴└─┘┴└─┘└─┘

  // General
  name: 'Jason',
  imageBackground: true,
  openInNewTab: false,
  twelveHourFormat: true,

  // Greetings
  greetingMorning: 'Good morning!',
  greetingAfternoon: 'Good afternoon,',
  greetingEvening: 'Good evening,',
  greetingNight: 'Go to Sleep!',

  // Layout
  bentoLayout: 'bento', // 'bento', 'lists', 'buttons'

  // Weather
  weatherKey: '0b1ff0c4df328e60e18be7e0df00be41', // Write here your API Key
  weatherIcons: 'OneDark', // 'Onedark', 'Nord', 'Dark', 'White'
  weatherUnit: 'C', // 'F', 'C'
  language: 'en', // More languages in https://openweathermap.org/current#multi

  trackLocation: true, // If false or an error occurs, the app will use the lat/lon below

  defaultLatitude: '43.653',
  defaultLongitude: '79.3832',

  // Autochange
  autoChangeTheme: true,

  // Autochabge by OS
  changeThemeByOS: true,

  // Autochange by hour options (24hrs format, string must be in: hh:mm)
  changeThemeByHour: false,
  hourDarkThemeActive: '18:30',
  hourDarkThemeInactive: '07:00',

  // ┌┐ ┬ ┬┌┬┐┌┬┐┌─┐┌┐┌┌─┐
  // ├┴┐│ │ │  │ │ ││││└─┐
  // └─┘└─┘ ┴  ┴ └─┘┘└┘└─┘

  firstButtonsContainer: [
    {
      id: '1',
      name: 'Github',
      icon: 'github',
      link: 'https://github.com/JakeWasChosen',
    },
    {
      id: '2',
      name: 'Mail',
      icon: 'mail',
      link: 'https://mail.google.com/mail/u/0/#inbox',
    },
    {
      id: '3',
      name: 'WakaTime',
      icon: 'activity',
      link: 'https://wakatime.com/dashboard',
    },
    {
      id: '4',
      name: 'Calendar',
      icon: 'calendar',
      link: 'https://calendar.google.com/calendar/r',
    },
    {
      id: '5',
      name: 'Keep',
      icon: 'trello',
      link: 'https://keep.google.com/u/0/',
    },
    {
      id: '6',
      name: 'columns',
      icon: 'columns',
      link: 'https://columns.app/',
    },
  ],

  secondButtonsContainer: [
    {
      id: '1',
      name: 'Music',
      icon: 'headphones',
      link: 'https://open.spotify.com',
    },
    {
      id: '2',
      name: 'twitter',
      icon: 'twitter',
      link: 'https://twitter.com/',
    },
    {
      id: '3',
      name: 'bot',
      icon: 'bot',
      link: 'https://discord.com/app',
    },
    {
      id: '4',
      name: 'Amazon',
      icon: 'shopping-bag',
      link: 'https://amazon.com/',
    },
    {
      id: '5',
      name: 'Hashnode',
      icon: 'pen-tool',
      link: 'https://hashnode.com/',
    },
    {
      id: '6',
      name: 'Figma',
      icon: 'figma',
      link: 'https://figma.com/',
    },
  ],

  // ┬  ┬┌─┐┌┬┐┌─┐
  // │  │└─┐ │ └─┐
  // ┴─┘┴└─┘ ┴ └─┘

  // First Links Container
  firstlistsContainer: [
    {
      icon: 'terminal',
      id: '1',
      links: [
        {
          name: 'Website',
          link: 'https://nasoj.me/',
        },
        {
          name: 'Web Design Shortcuts',
          link: 'chrome://bookmarks/?id=119',
        },
        {
          name: 'Google Analytics',
          link: 'https://analytics.google.com/analytics/web/#/',
        },
        {
          name: 'Google ReCaptcha Analytics',
          link: 'https://www.google.com/recaptcha/admin/site/515481777',
        },
      ],
    },
    {
      icon: 'coffee',
      id: '2',
      links: [
        {
          name: 'Instagram',
          link: 'https://www.instagram.com/',
        },
        {
          name: 'Discord',
          link: 'discord://discordapp.com/channels/@me',
        },
        {
          name: 'Twitter',
          link: 'https://twitter.com/home?lang=en',
        },
        {
          name: 'Spotify',
          link: 'spotify://',
        },
      ],
    },
  ],

  // Second Links Container
  secondListsContainer: [
    {
      icon: 'binary',
      id: '1',
      links: [
        {
          name: 'Spotify',
          link: 'https://www.spotify.com',
        },
        {
          name: 'Reddit',
          link: 'https://www.reddit.com',
        },
        {
          name: 'Hashnode',
          link: 'https://www.hashnode.com',
        },
        {
          name: 'Pocket',
          link: 'https://www.pocket.com',
        },
      ],
    },
    {
      icon: 'github',
      id: '2',
      links: [
        {
          name: 'Front',
          link: 'https://www.reddit.com/r/Frontend/',
        },
        {
          name: 'Rust',
          link: 'https://www.reddit.com/r/rust/',
        },
        {
          name: 'Go',
          link: 'https://www.reddit.com/r/golang/',
        },
        {
          name: 'Repos',
          link: 'https://github.com/JakeWasChosen',
        },
      ],
    },
  ],
};
