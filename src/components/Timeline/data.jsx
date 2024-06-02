import {TbBrandGithub} from "react-icons/tb";
import {GoBook} from "react-icons/go";
import {FaChild} from "react-icons/fa6";
import {SiDiscord} from "react-icons/si";
import {BiAbacus} from "react-icons/bi";
import {Box} from "@mui/material";
import {MdWeb} from "react-icons/md";

const timelineData = [
    {
        content: <Box>Abacus reached <b>1,000,000</b> total requests</Box>,
        date: "May 31, 2024",
        icon: <BiAbacus/>,
    },
    {
        content: "I publish the first version of my portfolio site",
        links: [{text: "site", url: 'https://jasoncameron.dev/projects-archive/'}],
        date: "Feb 3, 2022",
        icon: <MdWeb/>
    },
    {
        content:
            <Box>I started working on my first semi-large project, a Discord bot named edoC (a semordnilap of Code), which eventually peaked at just over <b>40,000</b> active users and over <b>200</b> commands</Box>,
        links: [{text: "GitHub", url: "https://github.com/JasonLovesDoggo/edoC"}],
        date: "May 21, 2021", icon: <SiDiscord/>, // date is from when the edoC discord bot user was created
    },
    {
        content: "I start learning Python and make a couple of small projects (my first ever project was a discord weather bot!)",
        date: "June 2021",
        icon: <GoBook/>
    }, // todo: icon
    {
        content: "I joined GitHub",
        date: "June 2020",
        icon: <TbBrandGithub/>,

    },
    {
        content:
            'I start learning that "coding" exists and slowly learn what it is; my grandma buys me a "How the world works" book - I\'m hooked',
        date: "2019",
        icon: <GoBook/>
    },
    {
        content:
            "I open up a random piece of (I believe C#) code because it looks interesting and I want to understand it",
        date: "Mid 2018",
        icon: <FaChild/>,
    },
];


export default timelineData;
