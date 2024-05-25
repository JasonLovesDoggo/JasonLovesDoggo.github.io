import React from "react";
import {
  SiDocker,
  SiGithub,
  SiLinux,
  SiPostman,
  SiPycharm,
  SiWindows,
} from "react-icons/si";
import { Category } from "./Techstack";

export default function Toolstack() {
  return Category({
    title: "The Tools I use",
    children: [
      <SiWindows aria-label="Windows" />,
      <SiLinux aria-label="Linux (Ubuntu, Debian, NixOS and a little bit of arch)" />,
      <SiPycharm aria-label="Pycharm" />,
      <SiPostman aria-label="Postman (API testing)" />,
      <SiGithub aria-label="Github (Including Gh pages, Actions, Deployments, REST API & More)" />,
      <SiDocker aria-label="Docker / Docker Compose" />,
    ],
  });
}
