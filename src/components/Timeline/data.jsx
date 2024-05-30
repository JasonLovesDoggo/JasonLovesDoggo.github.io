import { TbBrandGithub } from "react-icons/tb";
import { GoBook } from "react-icons/go";
import { FaChild } from "react-icons/fa6";
import { SiDiscord } from "react-icons/si"
import { MdWeb, MdCode } from "react-icons/md";


const timelineData = [
    {
        content: "I start work on the most recent version of this portfolio site",
        date: "Dec 25, 2022",
        icon: <MdCode/>
    },
    {
        content: "I publish the first version of my portfolio site",
        links: [{ text: "site", url: 'https://jasoncameron.dev/projects-archive/' }],
        date: "Feb 3, 2022",
        icon: <MdWeb />
    },
    {
        content: "I started working on my first semi-large project, a Discord bot named edoC (a semordnilap of Code)",
        links: [{ text: "GitHub", url: 'https://github.com/JasonLovesDoggo/edoC' }],
        date: "July 2021",
        icon: <SiDiscord />
    },
    {
        content: "I joined GitHub",
        date: "June 2020",
        icon: <TbBrandGithub />
    },
    {
        content: 'I start learning that "coding" exists and slowly learn what it is; my grandma buys me a "How the world works" book - I\'m hooked',
        date: "2019",
        icon: <GoBook />
    },
    {
        content: "I open up a random piece of (I believe C#) code because it looks interesting and I want to understand it",
        date: "Mid 2018",
        icon: <FaChild />
    },
];


export default timelineData;
