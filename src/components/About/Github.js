import React from "react";
import GitHubCalendar from "react-github-calendar";
import {Row} from "react-bootstrap";

function Github() {
    const BlueTheme = {
dark: ["#1e447e","#125b96","#246fb1","#3583cb","#58abff"],
        }
        return (
        <Row style={{justifyContent: "center", paddingBottom: "10px"}}>
            <h1 className="project-heading" style={{paddingBottom: "20px"}}>
                The Days I <strong>Code</strong>
            </h1>

            <GitHubCalendar
                username="JasonLovesDoggo"
                blockSize={14}
                blockRadius={7}
                blockMargin={5}
                color="#4b8bd5"
                theme={BlueTheme}
                fontSize={16}
            />
        </Row>
    );
}

export default Github;
