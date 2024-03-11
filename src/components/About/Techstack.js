import React from "react";
import {Row} from "react-bootstrap";
import {DiDjango, DiGit, DiJavascript, DiMongodb, DiPython, DiRedis,} from "react-icons/di";
import {SiCloudflare, SiDiscord, SiSpotify, SiSvelte,} from "react-icons/si";
import {Icon} from "./Toolstack";

function Techstack() {
    return (
        <Row style={{justifyContent: "center", paddingBottom: "50px"}}>
            <Icon icon={<DiPython/>}/>
            <Icon icon={<DiDjango/>}/>
            <Icon icon={<DiJavascript/>}/>
            <Icon icon={<SiSvelte/>}/>
            <Icon icon={<DiRedis/>}/>
            <Icon icon={<DiMongodb/>}/>
            <Icon icon={<DiGit/>}/>
            <Icon icon={<SiCloudflare/>}/>
            <Icon icon={<SiDiscord/>}/>
            <Icon icon={<SiSpotify/>}/>
        </Row>
    );
}

export default Techstack;
