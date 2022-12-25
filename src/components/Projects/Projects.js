import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import scavenger from "../../Assets/Projects/scavenger.png";
import videobot from "../../Assets/Projects/videobot.png";
import metropolis from "../../Assets/Projects/metropolis.png";
import foodle from "../../Assets/Projects/foodle.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="blue">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few of my projects that i've worked on.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={metropolis}
              isBlog={false}
              title="Metropolis"
              description="Metropolis is my schools student run website for info about clubs, events and everything else a student would need to know, It was built in django and there is a team of 45 developers, artists, and creators who worked in tandem to build the site. I personally worked on backend development"
              ghLink="https://github.com/wlmac/metropolis"
              demoLink="https://maclyonsden.com"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Blog Site"
              description="My personal blog was built with Next.js and Tailwind CSS. It retrieves its content from markdown files and uses Next.js to render it. It supports dark & light mode and enables easy writing of blog posts using markdown."
              ghLink="https://github.com/JasonLovesDoggo/Blog"
              demoLink="https://blog.jasoncameron.dev/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={videobot}
              isBlog={false}
              title="RedditVideoMakerBot"
              description="A completely automated video creation bot for reddit videos typically catered to TikTok and youtube shorts It was built using Python, PRAW, Playwright & ffmpeg. As of writing this, videos created by the bot have gained over 350,000,000 views"
              ghLink="https://github.com/elebumm/RedditVideoMakerBot"
              demoLink="https://www.youtube.com/watch?v=3gjcY_00U1w"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="TODO"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
              ghLink="https://github.com/JasonLovesDoggo/Plant_AI"
              demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={foodle}
              isBlog={false}
              title="Foodle"
              description="Foodle | The Wordle for food. Its my own twist on wordle, It was built using Svelte, SCSS, Typescript and managed using Cloudflare, Github Pages & Google Analytics. When I built it I never expected it to get over 5,000,000 page visits in just under a month, It was my first time using Svelte and I really enjoyed it."
              ghLink="https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io/tree/master/foodle"
              demoLink="https://jasoncameron.dev/foodle"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={scavenger}
              isBlog={false}
              title="Scavenger"
              description="A scavenger hunt website designed to prevent any form of cheating and RNG-based wins on a typical scavenger hunt. It was created in Django uses a Oauth 2.0 system with the main mld (metropolis) site to handle authentication. I learnt a lot about django while building this and I also gained some "
              ghLink="https://github.com/wlmac/scavenger"
              demoLink="https://scavenger2022.maclyonsden.com"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
