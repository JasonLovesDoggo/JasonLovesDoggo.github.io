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
    const [scale, setScale] = useState(1.7);

    useEffect(() => {
        setScale(window.innerWidth > 786 ? 1.7 : 0.6);
    }, []);
    console.log(scale)
    return (<div>
        <Container fluid className="resume-section">
            <Row className="resume">
                <Document file={pdf} className="d-flex justify-content-center">
                    <Page pageNumber={1} scale={scale} />
                </Document>
            </Row>
            <Row className="resume-text-row" style={{ maxWidth: `calc(${scale} * 612px)` }}>

                <Col className="resume-text">By the way, I'm written in LaTeX & open sourced if you want to&nbsp;<Link
                    style={{ textDecoration: "none", fontWeight: "bolder", color: "4b8bd5" }}
                    to="https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io/blob/main/src/Assets/resume.tex"
                    target="_blank">view me</Link></Col>
                <Col className="resume-download">
                    <Button
                        variant="primary"
                        href={resumeLink}
                        target="_blank"
                    >
                        <AiOutlineDownload />
                        &nbsp;Download CV
                    </Button></Col>
            </Row>

            <Particle />
        </Container>
    </div>);
}

