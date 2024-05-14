import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const resumeLink = "https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io/raw/main/src/Assets/resume.pdf";

export default function Resume() {
    const [width, setWidth] = useState(1200);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    return (<div>
        <Container style={{maxWidth: width + "px"}} fluid className="resume-section">
            <Row className="resume">
                <Document file={pdf} className="d-flex justify-content-center">
                    <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
                </Document>
            </Row>
            <Row style={{ justifyContent: "space-evenly", position: "relative" }}>
                <Col style={{ disply: 'flex' }}>
                    <Button
                        variant="primary"
                        href={resumeLink}
                        target="_blank"
                        className="resume-download"
                    >
                        <AiOutlineDownload />
                        &nbsp;Download CV
                    </Button></Col>
                <Col style={{ display: "flex", paddingRight: "5vw" }}>By the way, I'm written in LaTeX & open sourced if you want to&nbsp;<Link
                    style={{ textDecoration: "none", fontWeight: "bolder", color: "4b8bd5" }}
                    to="https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io/blob/main/src/Assets/resume.tex"
                    target="_blank">view me</Link></Col>

            </Row>

            <Particle />
        </Container>
    </div>);
}

