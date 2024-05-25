const timelineData = {
  2018: {
    0: [
      "I Open up a random piece of (I belive C#) code because it looks interesting",
    ],
  },
  2019: {
    0: [
      'I start learning what coding is and that it exists; my grandma buys me a "How the world works" book - I\'m hooked',
    ],
  },
  2020: {
    6: ["I joined GitHub"],
  },
};

export function num2name(month) {
  const month_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return month_names[month];
}

export default timelineData;
