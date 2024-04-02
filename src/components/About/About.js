import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import LaptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";

function About() {
    return (
        <Container fluid className="about-section">
            <Container>
                <Row style={{justifyContent: "center", padding: "10px"}}>
                    <Col
                        md={7}
                        style={{
                            justifyContent: "center",
                            paddingTop: "30px",
                            paddingBottom: "50px",
                        }}
                    >
                        <h1 style={{textAlign: "center", fontSize: "2.1em", paddingBottom: "20px"}}>
                            Know Who <strong className="blue">I am</strong>
                        </h1>
                        <Aboutcard/>
                    </Col>
                    <Col
                        md={5}
                        style={{paddingTop: "120px", paddingBottom: "50px"}}
                        className="about-img"
                    >
                        <img src={LaptopImg} alt="about" className="img-fluid"/>
                    </Col>
                </Row>
                <h1 className="project-heading">
                    My Professional <strong className="blue">Skillset </strong>
                </h1>

                <Techstack/>

                <h1 className="project-heading">
                    The <strong className="blue">Tools</strong> I use
                </h1>
                <Toolstack/>

                <Github/>
            </Container>
            <Particle/>

        </Container>
    );
}

export default About;
