import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import {AiFillGithub, AiOutlineTwitter,} from "react-icons/ai";
import {FaLinkedinIn} from "react-icons/fa";

function Home2() {
    return (
        <Container fluid className="home-about-section" id="about">
            <Container>
                <Row>
                    <Col md={8} className="home-about-description">
                        <h1 style={{fontSize: "2.6em"}}>
                            LET ME <span className="blue"> INTRODUCE </span> MYSELF
                        </h1>
                        <p className="home-about-body">
                            I'm Jason i'm currently a high school student at <a style={{textDecoration: "none"}}
                                                                                className="blue"
                                                                                href="https://wlmac.ca/">WLMCI</a> & a
                            passionate self-taught Backend Developer. I'm from Canada, and living in Toronto. I'm
                            currently learning Golang and attempting to get better at Django
                            <br/>
                            <br/>I am fluent in
                            <i>
                                <b className="blue"> Python, Javascript, Typescript, </b>
                            </i>
                            as well as HTML5, CSS3 and SCSS.
                            <br/>
                            <br/>
                            My field of Interest's are
                            <i>
                                <b className="blue"> Web Automation </b> and
                                also in areas related to{" "}
                                <b className="blue">
                                    Automation</b> and making life simpler.
                            </i>
                            <br/>
                            <br/>
                            Whenever possible, I also apply my passion for developing products
                            with <b className="blue">Python</b> and
                            <i>
                                <b className="blue">
                                    {" "}
                                    Frameworks & Library's
                                </b>
                            </i>
                            &nbsp; like
                            <i>
                                <b className="blue"> Django, Flask & Playwright</b>
                            </i>
                            <br/>
                            I also enjoy working with the discord API and have built a few
                            discord bots that have a combined user-base of <b className="blue">250,000+</b> active users.
                        </p>
                    </Col>
                    <Col md={4} className="myAvtar">
                        <Tilt>
                            <img src={myImg} className="img-fluid" alt="avatar"/>
                        </Tilt>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="home-about-social">
                        <h1>FIND ME ON</h1>
                        <p>
                            Feel free to <span className="blue">connect </span>with me
                        </p>
                        <ul className="home-about-social-links">
                            <li className="social-icons">
                                <a
                                    href="https://github.com/JasonLovesDoggo"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="icon-colour  home-social-icons"
                                >
                                    <AiFillGithub/>
                                </a>
                            </li>
                            <li className="social-icons">
                                <a
                                    href="https://twitter.com/JasonLovesDoggo"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="icon-colour  home-social-icons"
                                >
                                    <AiOutlineTwitter/>
                                </a>
                            </li>
                            <li className="social-icons">
                                <a
                                    href="https://www.linkedin.com/in/JasonLovesDoggo/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="icon-colour  home-social-icons"
                                >
                                    <FaLinkedinIn/>
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Home2;
