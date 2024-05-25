import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Particle from "../Particle";
import { Container } from "react-bootstrap"
import timelineData from "./data"
// eslint-disable-next-line
Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))];
}

function generateTimelineItem(item) {
  const variants = ["outlined", "filled"]
  return (<TimelineItem position="alternate">
    <TimelineSeparator>
      <TimelineDot variant={variants.random()} />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent >{{ item }}</TimelineContent>
  </TimelineItem>)
}

export default function ProgrammingTimeline() {
  let events = []
  for (let year in timelineData) {
    for (let event in year) {
      events.push(generateTimelineItem(event));
      console.log(generateTimelineItem(event));
    }
  }
  return (
    <Container className="timeline-container" style={{ minHeight: "100vh" }} fluid>
      <Timeline position="alternate">
        {events}
      </Timeline>
      <Particle />
    </Container >
  );
}