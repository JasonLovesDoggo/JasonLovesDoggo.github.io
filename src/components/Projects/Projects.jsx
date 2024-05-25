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
import {SiDevpost} from "react-icons/si";

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
                            description="Metropolis, our school's student-run data hub, offers club info, event updates, and student essentials. Built using Django, React & React Native, our team of 45 developers, artists, and creators collaborates on this platform. I handle backend maintenance, feature implementation, DevOps, and site management."
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
                            description="A scavenger hunt platform engineered to prevent any form of cheating or RNG-based finds while ensuring fairness and integrity. It was created in Django uses a Oauth 2.0 system with the main mld (metropolis) site to handle authentication. Then, in 2023 I made complete rewrite of the app to allow for dyanmic contest along with the ability to run any number of contests concurrently."
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
                            description="PhysioQuest uses AI to gamify physiotherapy exercises, encouraging consistent and accurate completion. This approach aims to boost adherence to prescribed routines, potentially enhancing rehabilitation outcomes. Built with Python, OpenCV, HTML, SCSS & Django. Winner @ JamHacks 7."
                            ghLink="https://github.com/JasonLovesDoggo/jamhacks"
                            demoLink="https://devpost.com/software/physioquest"
                            demoText="Devpost"
                            demoIcon={<SiDevpost/>}
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
                            demoText="Devpost"
                            demoIcon={<SiDevpost/>}
                        />
                    </Col>
                    <Col md={4} className="project-card">
                        <ProjectCard
                            imgPath={partneredu}
                            isBlog={false}
                            title="PartnerEdu"
                            description="PartnerEdu is a platform that connects students to opportunities such as COOP placements in order to provide educational experiences for students. Highly scalable using Django, Bootstrap, Postgres, Redis & Docker. National Runner Up @ CNLC 2024."
                            ghLink="https://github.com/JasonLovesDoggo/PartnerEdu"
                            demoLink="https://fbla.jasoncameron.dev"
                        />
                    </Col>
                    <Col md={4} className="project-card">
                        <ProjectCard
                            imgPath={partneredu}
                            isBlog={false}
                            title="mCTF"
                            description="mCTF, an online judge for cybersecurity challenge problems and school-wide and provincial contests, hosting over 200 problems, 1500 users & 20000 submissions. Extensively scaled using Docker, Kubernetes, K3s & Django."
                            ghLink="https://github.com/mcpt/ctf"
                            demoLink="https://ctf.mcpt.ca"
                        />
                    </Col>
                    <Col md={4} className="project-card">
                        <ProjectCard
                            imgPath={partneredu}
                            isBlog={false}
                            title="Abacus"
                            description="Abacus at it's core is a simple counter. However, it was designed from the ground up to be scalable, secure and easy to use. It was build using Golang, Gin, Docker, Redis. In fact it's currently powereing the page view counter on this site."
                            ghLink="https://github.com/jasonlovesdoggo/abacus"
                            demoLink="https://abacus.jasoncameron.dev"
                        />
                    </Col>

                </Row>
            </Container>
            <Particle/>
        </Container>
    );
}

export default Projects;
