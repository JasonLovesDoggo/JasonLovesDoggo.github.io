import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import * as React from "react";
import {TimelineOppositeContent} from "@mui/lab";
import {Box, createTheme, Typography} from "@mui/material";
import {indigo} from '@mui/material/colors';


// export function TimelineCard(time, content, icon) {
//     const variants = ["outlined"];/*, "filled"];*/
//     const randomIndex = Math.floor(Math.random() * variants.length);
//     return (
//         <TimelineItem>
//             <TimelineOppositeContent className="timeline-date"
//                 sx={{m: "auto 0"}}
//                 align="right"
//                 variant="body2"
//                 color="text.secondary"
//             >
//                 {time}
//             </TimelineOppositeContent>
//             <TimelineSeparator>
//                 <TimelineConnector/>
//                 <TimelineDot variant={variants[randomIndex]}>
//                     {icon}
//                 </TimelineDot>
//                 <TimelineConnector/>
//
//
//             </TimelineSeparator>
//             <TimelineContent className="timeline-content" >{content}</TimelineContent>
//         </TimelineItem>
//     );
// }

export const Theme =  createTheme({
    palette: {
        primary: {
            main: indigo[50],
        },
        secondary: {
            main: indigo[300],
        },
    },
});

export default function TimelineCard(date, content, icon) {
    return (
        <TimelineItem>
            <TimelineOppositeContent color="primary">
                <Typography component="h4" color="primary">
                    <Box fontWeight='bold' display='inline'>{date}</Box></Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot color="primary" variant="filled">
                    {icon}
                </TimelineDot>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent className="timeline-content">
                <div>
                    <Typography variant="body1" color="primary">
                        {content}
                    </Typography>
                </div>
            </TimelineContent>
        </TimelineItem>

    );
}
