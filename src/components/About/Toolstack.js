import React from "react";
import {SiDocker, SiGithub, SiLinux, SiPostman, SiPycharm, SiWindows} from "react-icons/si";
import {Category} from "./Techstack";

export default function Toolstack() {
    return Category({
        title: "The Tools I use", children: [
            <SiWindows/>,
            <SiLinux/>,
            <SiPycharm/>,
            <SiPostman/>,
            <SiGithub/>,
            <SiDocker/>
        ]
    });

}
