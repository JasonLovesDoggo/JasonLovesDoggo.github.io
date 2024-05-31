import { TbBrandGithub } from "react-icons/tb";
import { GoBook } from "react-icons/go";
import { FaChild } from "react-icons/fa6";
import { SiDiscord } from "react-icons/si";
import { FaBaby } from "react-icons/fa";

import { BiAbacus } from "react-icons/bi";

const timelineData = [
  {
    content: "Abacus reached 1,000,000 total requests",
    date: "May 31, 2024",
    icon: <BiAbacus />,
  },
  {
    content:
      "I started working on my first semi-large project, a Discord bot named edoC (a semordnilap of Code)",
    links: [{ text: "GitHub", url: "https://github.com/JasonLovesDoggo/edoC" }],
    date: "July 2021",
    icon: <SiDiscord />,
  },
  {
    content: "I joined GitHub",
    date: "June 2020",
    icon: <TbBrandGithub />,
  },
  {
    content:
      'I start learning that "coding" exists and slowly learn what it is; my grandma buys me a "How the world works" book - I\'m hooked',
    date: "2019",
    icon: <GoBook />,
  },
  {
    content:
      "I open up a random piece of (I believe C#) code because it looks interesting and I want to understand it",
    date: "Mid 2018",
    icon: <FaChild />,
  },
  {
    content: "I'm born",
    date: "April 19, 2008",
    icon: <FaBaby />,
  },
];

export default timelineData;
