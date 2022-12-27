import React from "react";
import {Col, Row} from "react-bootstrap";
import {
    DiMongodb,
    DiPython,
    DiGit, DiJavascript, DiRedis, DiDjango,
} from "react-icons/di";
import {
    SiCloudflare, SiDiscord, SiSpotify,
} from "react-icons/si";

function Techstack() {
    return (
        <Row style={{justifyContent: "center", paddingBottom: "50px"}}>
            <Col xs={4} md={2} className="tech-icons">
                <DiPython/>
            </Col>
            <Col xs={4} md={2} className="tech-icons">
                <DiDjango/>
            </Col>
            <Col xs={4} md={2} className="tech-icons">
                <DiJavascript/>
            </Col>
            <Col xs={4} md={2} className="tech-icons">
                <DiRedis/>
            </Col>
            <Col xs={4} md={2} className="tech-icons">
                <DiMongodb/>
            </Col>
            <Col xs={4} md={2} className="tech-icons">
                <DiGit/>
            </Col>
            <Col xs={4} md={2} className="tech-icons">
                <SiCloudflare/>
            </Col>
            <Col xs={4} md={2} className="tech-icons">
                <SiDiscord/>
            </Col>
            <Col xs={4} md={2} className="tech-icons">
                <SiSpotify/>
            </Col>
        </Row>
    );
}

export default Techstack;
