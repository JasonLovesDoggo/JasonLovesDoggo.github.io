import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  const text = props.demoText || "Demo";
  const icon = props.demoIcon || <CgWebsite />;
  const isBlog = props.isBlog || false;

  return (
    <Col md={4} className="project-card">
      <Card className="project-card-view">
        <Card.Img variant="top" src={props.imgPath} alt="card-img" />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Button variant="primary" href={props.ghLink} target="_blank">
            <BsGithub /> &nbsp;
            {isBlog ? "Blog" : "GitHub"}
          </Button>
          {"\n"}
          {"\n"}

          {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

          {!isBlog && props.demoLink && (
            <Button
              variant="primary"
              href={props.demoLink}
              target="_blank"
              style={{ marginLeft: "10px" }}
            >
              {icon} &nbsp;
              {text}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProjectCards;
