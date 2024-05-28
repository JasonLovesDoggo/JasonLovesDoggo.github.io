import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import * as React from "react";
import {useContext} from "react";
import {TimelineOppositeContent} from "@mui/lab";
import {Paper, Typography, useTheme} from "@mui/material";
import Button from '@mui/material/Button';
import hash from './hasher';
import {IconContext} from "react-icons";
import generateGlassmorphismStyle from "../utils/Glass";
import {ColorContext} from "../../App";
import pSBC from "../utils/ColorConv";

export default function TimelineCard(date, content, icon, position, links, isFirst, isLast) {
    const {color} = useContext(ColorContext);
    const glass = generateGlassmorphismStyle({transparency: 0.4, color: color.rgb, blur: 9.2, outline: 0.3});
    const theme = useTheme(); // todoP: remove later on - it's nice for testing though

    return (
        <TimelineItem key={hash(content + date)}>
            <TimelineOppositeContent sx={{margin: 'auto 0', color: 'primary.light'}} style={{float: position}} varient="body2">
                <b>{date}</b>
            </TimelineOppositeContent>
            <IconContext.Provider value={{size: "1.5em"}}>
                <TimelineSeparator>
                    {/* Conditional Connector Before Dot */}
                    {!(isFirst && !isLast) && <TimelineConnector/>}       {/*todo: rewrite using visibility: hidden as this messes with some margins */}

                    {/* Center Dot */}
                    <TimelineDot color="primary" variant="filled">
                        {icon}
                    </TimelineDot>

                    {/* Conditional Connector After Dot */}
                    {!(isLast && !isFirst) && <TimelineConnector/>}
                </TimelineSeparator>
            </IconContext.Provider>
            <TimelineContent>
                <Paper style={{...glass, float: position}} square={false} elevation={3} sx={{padding: '6px 16p'}}
                       className="timeline-content-container">
                    <Typography sx={{color: pSBC(0.7, theme.palette.primary.contrastText, theme.palette.primary.main)}} align="left" fontWeight="500" maxWidth="35vw"
                                variant="body1">
                        {content}
                    </Typography>
                    {links && links.map((data) => (
                        <Button className="timeline-button" sx={{backgroundColor: 'secondary', margin: '0.5em'}}
                                variant="contained"
                                target="_blank" href={data.url}>{data.text}</Button>))}
                </Paper>
            </TimelineContent>
        </TimelineItem>

    );
}
