import React from "react";
import {Col, Row} from "react-bootstrap";
import {
    SiDiscord,
    SiGithub,
    SiLinux,
    SiPostman,
    SiPycharm,
    SiStackoverflow,
    SiWindows,
} from "react-icons/si";

export function Icon({icon}) {
    return (
        <Col xs={4} md={2} className="tech-icons">
            {icon}
        </Col>
    );

}
function Toolstack() {
    return (
        <Row style={{justifyContent: "center", paddingBottom: "50px"}}>
           <Icon icon={<SiWindows/>}/>
            <Icon icon={<SiLinux/>}/>
            <Icon icon={<SiPycharm/>}/>
            <Icon icon={<SiPostman/>}/>
            <Icon icon={<SiGithub/>}/>
            <Icon icon={<SiDiscord/>}/>
            <Icon icon={<SiStackoverflow/>}/>
        </Row>
    );
}

export default Toolstack;
