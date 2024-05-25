import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
    AiFillGithub,
    AiOutlineTwitter,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import ViewCount from "./viewcount";
import Wakatime from "./wakatime";

function Footer() {
    let date = new Date();
    let year = date.getFullYear();
    return (
        <Container fluid className="footer">
            <Row style={{ placeItems: "center" }}>
                <Col md="4" className="footer-body">
                    <ul className="footer-icons">
                        <li className="social-icons">
                            <a
                                href="https://github.com/JasonLovesDoggo"
                                style={{ color: "white" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiFillGithub />
                            </a>
                        </li>
                        <li className="social-icons">
                            <a
                                href="https://twitter.com/JasonLovesDoggo"
                                style={{ color: "white" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiOutlineTwitter />
                            </a>
                        </li>
                        <li className="social-icons">
                            <a
                                href="https://www.linkedin.com/in/jsoncameron/"
                                style={{ color: "white" }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedinIn />
                            </a>
                        </li>
                        <li className="social-icons">
                        </li>
                    </ul>
                </Col>
                <Col md="4" className="footer-copywright">
                    <h3>Copyright © {year} Jason Cameron</h3>
                </Col>
                <Col md="4" className="footer-copywright">
                    <ul className="footer-icons">
                        <li className="social-icons">
                            <ViewCount />
                        </li>
                        <li className="social-icons">
                            <Wakatime />
                        </li>
                        {/* <li className="social-icons status">
                            <a href="https://status.jasoncameron.dev" target="_blank" rel="noopener noreferrer"
                               style={{color: "white", textDecoration: "none"}}><FaServer/>&nbsp;&nbsp;<span style={{textAlign: "center"}}>Status</span></a>
                        </li> */}

                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;