import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import { useContext } from "react";
import { TimelineOppositeContent } from "@mui/lab";
import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import hash from "./hasher";
import { IconContext } from "react-icons";
import generateGlassmorphismStyle from "../utils/Glass";
import { ColorContext } from "../../App";

export default function TimelineCard(
  date,
  content,
  icon,
  position,
  links,
  isFirst,
  isLast,
) {
  const { color } = useContext(ColorContext);
  const glass = generateGlassmorphismStyle({
    transparency: 0.4,
    color: color,
    blur: 9.2,
    outline: 0.3,
  });
  const contentHash = hash(content);
  return (
    <TimelineItem key={contentHash}>
      <TimelineOppositeContent
        sx={{ margin: "auto 0", color: "primary.light" }}
        style={{ float: position }}
        varient="body2"
      >
        <b>{date}</b>
      </TimelineOppositeContent>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <TimelineSeparator>
          <TimelineConnector
            sx={{
              visibility: isFirst && !isLast ? "hidden" : "inherit",
              caretColor: "transparent",
            }}
          />
          <TimelineDot color="primary" variant="filled">
            {icon}
          </TimelineDot>

          <TimelineConnector
            sx={{
              visibility: isLast && !isFirst ? "hidden" : "inherit",
              caretColor: "transparent",
            }}
          />
        </TimelineSeparator>
      </IconContext.Provider>
      <TimelineContent>
        <Paper
          key={contentHash + "l"}
          style={{ ...glass, float: position }}
          square={false}
          elevation={3}
          sx={{ padding: "6px 16p" }}
          className="timeline-content-container"
        >
          <Typography
            sx={{ color: "primary.contrastText", marginBottom: "0" }}
            align="left"
            fontWeight="500"
            maxWidth="35vw"
            variant="body1"
            component="div" // used in case content is JSX
          >
              {content}
          </Typography>
          {links &&
            links.map((data) => (
              <Button
                key={contentHash + data.url}
                className="timeline-button"
                sx={{
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                  margin: "0.5em",
                  ":hover": { backgroundColor: 'primary.lighter' },
                  transition: "none",
                }}
                variant="contained"
                target="_blank"
                href={data.url}
              >
                {data.text}
              </Button>
            ))}
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
}
