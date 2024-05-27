import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import * as React from "react";
import {TimelineOppositeContent} from "@mui/lab";
import {createTheme, Paper, Typography} from "@mui/material";
import {indigo} from '@mui/material/colors';
import Button from '@mui/material/Button';
import hash from './hasher';
import {IconContext} from "react-icons";

export const Theme = createTheme({
    palette: {
        primary: {
            main: indigo[100],
        },
        secondary: {
            main: indigo['A100'],
        },
    },
});

export default function TimelineCard(date, content, icon, position, links, isFirst, isLast) {
    return (
        <TimelineItem key={hash(content)}>
            <TimelineOppositeContent sx={{margin: 'auto 0'}} style={{float: position}} color="primary" varient="body2">
                <b>{date}</b>

            </TimelineOppositeContent>
            <IconContext.Provider value={{size: "1.5em"}}> {/* Wrap TimelineSeparator */}
                <TimelineSeparator>
                    {/* Conditional Connector Before Dot */}
                    {!(isFirst && !isLast) && <TimelineConnector/>}

                    {/* Center Dot */}
                    <TimelineDot color="primary" variant="filled">
                        {icon}
                    </TimelineDot>

                    {/* Conditional Connector After Dot */}
                    {!(isLast && !isFirst) && <TimelineConnector/>}
                </TimelineSeparator>
            </IconContext.Provider>
            <TimelineContent>
                <Paper style={{float: position}} square={false} elevation={3} sx={{padding: '6px 16p'}} className="timeline-content-container">
                    <Typography align="left" className="timeline-content" maxWidth="35vw" variant="body1">
                        {content}
                    </Typography>
                    {links && links.map((data) => (
                    <Button className="timeline-button" sx={{background: data.color}} variant="contained" target="_blank" href={data.url}>{data.text}</Button>))}
                </Paper>
            </TimelineContent>
        </TimelineItem>

    );
}
