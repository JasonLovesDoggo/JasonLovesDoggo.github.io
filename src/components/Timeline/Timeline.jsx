import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import Particle from "../Particle";
import { Container } from "react-bootstrap";
import timelineData from "./data";
import TimelineCard from "./TimelineCard";

function ProgrammingTimeline() {
  return (
    <Container
      className="timeline-container"
      style={{ marginTop: '5em', minHeight: '90vh' }}
      fluid
    >
      <Timeline position="alternate">
        {timelineData.map((event, index) =>
          TimelineCard(
            event.date,
            event.content,
            event.icon,
            index % 2 === 0 ? "inline-start" : "inline-end",
            event.links,
            index === 0,
            index === timelineData.length - 1,
          ),
        )}
      </Timeline>
      <Particle />
    </Container>
  );
}

export default React.memo(ProgrammingTimeline);
