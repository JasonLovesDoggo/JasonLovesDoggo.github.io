import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import scavenger from "../../Assets/Projects/scavenger.png";
import videobot from "../../Assets/Projects/videobot.png";
import metropolis from "../../Assets/Projects/metropolis.png";
import foodle from "../../Assets/Projects/foodle.png";
import portfolio from "../../Assets/Projects/portfolio.png";

function Projects() {
    return (
        <Container fluid className="project-section">
            <Container>
                <h1 className="project-heading">
                    My Recent <strong className="blue">Projects </strong>
                </h1>
                <p style={{color: "white"}}>
                    Here are a few of my projects that i've worked on.
                </p>
                <Row style={{justifyContent: "center", paddingBottom: "10px"}}>
                    <Col md={4} className="project-card">
                        <ProjectCard
                            imgPath={metropolis}
                            isBlog={false}
                            title="Metropolis"
                            description="Metropolis is my schools student run data centralization platform for info about clubs, events and everything else a student would need to know, It was built in django and there is a team of 45 developers, artists, and creators who worked in tandem to build the site. I personally worked on backend development"
                            ghLink="https://github.com/wlmac/metropolis"
                            demoLink="https://maclyonsden.com"
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

                    <Col md={4} className="project-card">
                        <ProjectCard
                            imgPath={portfolio}
                            isBlog={false}
                            title="Portfolio Site"
                            description="My personal portfolio site written in react.js. The site showcases some of my programming projects, photography & has a contact form. It was built using React.js, react-bootstrap along with a couple other libraries and is hosted on github pages and managed using Cloudflare."
                            ghLink="https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io"
                            demoLink="https://jasoncameron.dev"
                        />
                    </Col>
                </Row>
            </Container>
            <Particle/>
        </Container>
    );
}

export default Projects;
