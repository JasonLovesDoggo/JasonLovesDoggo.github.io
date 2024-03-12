import React from "react";
import {Col, Row} from "react-bootstrap";
import {DiDjango, DiGit, DiJavascript, DiMongodb, DiPython, DiRedis,} from "react-icons/di";
import {SiCloudflare, SiDiscord, SiSpotify, SiSvelte,} from "react-icons/si";

function Icon({icon}) {
    return (
        <Col xs={4} md={2} className="tech-icons">
            {icon}
        </Col>
    );

}
export function Category({title, children}) {
    let elements = []
    for (let i = 0; i < children.length; i++) {
        elements.push(
            <Icon icon={children[i]}/>
        )
    }
    return (
        <div>
            {/*<h1 className="project-heading">*/}
            {/*    {title}*/}
            {/*</h1>*/}
            <Row style={{justifyContent: "center", paddingBottom: "50px"}}>
                {elements}
            </Row>
        </div>

    );
}
export default function Techstack() {
    return <Category>
        <DiPython/>
        <DiDjango/>
        <DiJavascript/>
        <SiSvelte/>
        <DiRedis/>
        <DiMongodb/>
        <DiGit/>
        <SiCloudflare/>
        <SiDiscord/>
        <SiSpotify/>
    </Category>;
}
