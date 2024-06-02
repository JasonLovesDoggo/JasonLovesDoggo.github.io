import Timeline from "@mui/lab/Timeline";
import Particle from "../Particle";
import { Container } from "react-bootstrap";
import timelineData from "./data";
import { IconButton } from "@mui/material"
import TimelineCard from "./TimelineCard";
import {MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp} from "react-icons/md";
import { memo, useEffect, useState } from "react";

function ProgrammingTimeline() { // fixme: breaks when screen is smaller than 633px wide
  const [buttonFlipped, setButtonFlipped] = useState(false)
  const handleScrollAction = () => {
    window.scrollTo({
      top: buttonFlipped ? 0 : document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => { // cleanup for unmount
    const onScrollListener = event => {
      const arrow_button = document.getElementById("downArrow");
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 0.9)) { // when the user is 90% to the bottom
        setButtonFlipped(true);
      }
      else {
        setButtonFlipped(false)
      }
    };

    window.addEventListener('scroll', onScrollListener);

    // 👇️ remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('scroll', onScrollListener);
    };
  }, []);


  const downArrowStyle = {
    backgroundColor: "primary.light",
    borderRadius: "2rem",
    width: "fit-content",
    position: "fixed",
    bottom: "5.5rem",
    right: '2rem',

    '&:hover': {
        backgroundColor: "primary.lighter",
    }
  }

  return (
    <Container
      className="timeline-container"
      style={{ marginTop: '5em', minHeight: '88.3vh' }}
      fluid
    >
      <IconButton id="downArrow" sx={downArrowStyle} onClick={handleScrollAction} aria-label="scroll to bottom">
        {buttonFlipped ? <MdKeyboardDoubleArrowUp/> :  <MdKeyboardDoubleArrowDown />}
      </IconButton>
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

export default memo(ProgrammingTimeline);
