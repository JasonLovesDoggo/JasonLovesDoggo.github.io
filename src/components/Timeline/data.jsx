import {TbBrandGithub} from "react-icons/tb";
import {GoBook} from "react-icons/go";
import {FaChild} from "react-icons/fa6";
import {SiDiscord} from "react-icons/si";
import {FaBaby} from "react-icons/fa";


const colors = {
    blurple: "#7289DA"
};


const timelineData = [
    {
        content: "I started working on my first semi-large project, a Discord bot named edoC (a semordnilap of Code)",
        links: [
            {text: "GitHub", url: 'https://github.com/JasonLovesDoggo/edoC', color: colors.blurple}
        ],
        date: "July 2021",
        icon: <SiDiscord/>
    },
    {
        content: "I joined GitHub",
        date: "June 2020",
        icon: <TbBrandGithub/>
    },
    {
        content: 'I start learning that "coding" exists and slowly learn what it is; my grandma buys me a "How the world works" book - I\'m hooked',
        date: "2019",
        icon: <GoBook/>
    },
    {
        content: "I open up a random piece of (I believe C#) code because it looks interesting and I want to understand it",
        date: "Mid 2018",
        icon: <FaChild/>
    },
];


export default timelineData;
