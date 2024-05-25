import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiDjango,
  DiGit,
  DiJavascript,
  DiMongodb,
  DiPython,
  DiRedis,
} from "react-icons/di";
import {
  SiCloudflare,
  SiDiscord,
  SiPostgresql,
  SiSpotify,
  SiSvelte,
} from "react-icons/si";

function Icon({ icon }) {
  const inner_text = icon.props["aria-label"];
  let text = "";
  if (inner_text !== undefined) {
    text = <div className="text">{inner_text}</div>;
  }
  return (
    <Col xs={4} md={2} className="tech-icons">
      {icon}
      {text}
    </Col>
  );
}
export function Category({ title, children }) {
  let elements = [];
  for (let i = 0; i < children.length; i++) {
    elements.push(<Icon icon={children[i]} aria-label={children[i].props} />);
  }
  return (
    <>
      {/*<h1 className="project-heading">*/}
      {/*    {title}*/}
      {/*</h1>*/}
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {elements}
      </Row>
    </>
  );
}
export default function Techstack() {
  return (
    <Category>
      <DiPython aria-label="Python" />
      <DiDjango aria-label="Django" />
      <DiJavascript aria-label="JavaScript" />
      <SiSvelte aria-label="Svelte" />
      <DiGit aria-label="Git" />
      <SiCloudflare aria-label="Cloudflare" />
      <DiRedis aria-label="Redis" />
      <SiPostgresql aria-label="Postgresql" />
      <DiMongodb aria-label="Mongo DB" />
      <SiDiscord aria-label="Discord API" />
      <SiSpotify aria-label="Spotify API" />
    </Category>
  );
}
