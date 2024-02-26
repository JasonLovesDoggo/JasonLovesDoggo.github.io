import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import scavenger from "../../Assets/Projects/scavenger.png";
import videobot from "../../Assets/Projects/videobot.png";
import metropolis from "../../Assets/Projects/metropolis.png";
import foodle from "../../Assets/Projects/foodle.png";
import portfolio from "../../Assets/Projects/portfolio.png";
import physioquest from "../../Assets/Projects/physioquest.png";
import screentimeshowdown from "../../Assets/Projects/screentimeshowdown.png";
import partneredu from "../../Assets/Projects/partneredu.png";

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
                            description="Metropolis is my schools student run data centralization platform for info about clubs, events and everything else a student would need to know, It was built in django and there is a team of 45 developers, artists, and creators who worked in tandem to build the site. My contributions to the site include the maintaining and adding all new features to the backend along devops and running the site as a whole."
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
                            description="Foodle | The Wordle for food. Its my own twist on wordle, It was built using Svelte, SCSS, Typescript and managed using Cloudflare, Github Pages & Google Analytics. When I built it I never expected it to get well over 5,000,000 page visits. Foodle was really the first time I dipped my toes into web dev, let's just say I enjoyed it."
                            ghLink="https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io/tree/master/foodle"
                            demoLink="https://jasoncameron.dev/foodle"
                        />
                    </Col>

                    <Col md={4} className="project-card">
                        <ProjectCard
                            imgPath={scavenger}
                            isBlog={false}
                            title="Scavenger"
                            description="A scavenger hunt platform engineered to prevent any form of cheating or RNG-based finds while ensuring fairness and integrity. It was created in Django uses a Oauth 2.0 system with the main mld (metropolis) site to handle authentication. Then, in 2023 I made a maassive overhaul to the site to eliminate any hardcoded data and allow multiple concurrent events."
                            ghLink="https://github.com/wlmac/scavenger/tree/main"
                            demoLink="https://scavenger.maclyonsden.com"
                        />
                    </Col>

                    <Col md={4} className="project-card">
                        <ProjectCard
                            imgPath={portfolio}
                            isBlog={false}
                            title="Portfolio Site"
                            description="My personal portfolio site to showcase some of my creations. The site showcases some of my programming projects, photography & has a contact form. It was built using React.js, react-bootstrap along with a couple other libraries and is hosted on github pages and managed using Cloudflare."
                            ghLink="https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io"
                            demoLink="https://jasoncameron.dev"
                        />
                    </Col>

                    <Col md={4} className="project-card">
                        <ProjectCard
                            imgPath={physioquest}
                            isBlog={false}
                            title="PhysioQuest"
                            description="Gamifying physiotherapy with AI to encourage consistency and accuracy when completing quests/exercises. Built with Python, OpenCV, HTML, SCSS & Django. Winner @ JamHacks 7."
                            ghLink="https://github.com/JasonLovesDoggo/jamhacks"
                        />
                    </Col>

                    <Col md={4} className="project-card">
                        <ProjectCard
                            imgPath={screentimeshowdown}
                            isBlog={false}
                            title="Screentime Showdown"
                            description="Getting rid of your social media addiction doesn't have to be a painful process. Turn it into a fun challenge with your friends and see if you can win the pot! Built with JavaScript, Material UI, React, Express.js, Cohere & Paybilt. Winner @ HackTheValley 8."
                            ghLink="https://github.com/JasonLovesDoggo/screentimeshowdown"
                            demoLink="https://devpost.com/software/screentime-showdown"
                        />
                    </Col>
                    <Col md={4} className="project-card">
                        <ProjectCard
                            imgPath={partneredu}
                            isBlog={false}
                            title="PartnerEdu"
                            description="PartnerEdu is a platform that connects students to opertunities such as COOP placements in order to provide educational experiences for students. Highly scalable using Django, Bootstrap, Postgres, Redis & Docker. National Finalist @ CNLC 2024."
                            ghLink="https://github.com/JasonLovesDoggo/PartnerEdu"
                            demoLink="https://fbla.jasoncameron.dev"
                        />
                    </Col>

                </Row>
            </Container>
            <Particle/>
        </Container>
    );
}

export default Projects;
