import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import * as React from "react";
import {TimelineOppositeContent} from "@mui/lab";
import {Box, createTheme, Typography} from "@mui/material";
import {indigo} from '@mui/material/colors';
import Button from '@mui/material/Button';


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

const cyrb53 = (str, seed = 1) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
export default function TimelineCard(date, content, icon, position, links) {
    return (
        <TimelineItem key={cyrb53(content)}>
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
                    <Typography maxWidth="30vw" sx={{float: position}} variant="body1" color="primary">
                        {content}
                    </Typography>
                    {links && links.map((data) => (
                    <Button sx={{background: data.color}} variant="contained" target="_blank" href={data.url}>{data.text}</Button>))}
                </div>
            </TimelineContent>
        </TimelineItem>

    );
}
