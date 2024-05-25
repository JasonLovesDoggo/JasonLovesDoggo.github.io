import React, { useState, useLayoutEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();
const resumeLink = "https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io/raw/main/src/Assets/resume.pdf";


function useGetScale() {
    const [scale, setScale] = useState(1.7);
    useLayoutEffect(() => {
        function updateScale() {
            setScale(window.innerWidth > 786 ? 1.7 : 0.6);
        }
        window.addEventListener('resize', updateScale);
        updateScale();
        return () => window.removeEventListener('resize', updateScale);
    }, []);
    return scale;
}


export default function Resume() {

    const scale = useGetScale();
    return (<div>
        <Container fluid className="resume-section">
            <Row className="resume">
                <Document file={pdf} className="d-flex justify-content-center">
                    <Page pageNumber={1} scale={scale} />
                </Document>
            </Row>
            <Row className="resume-text-row">

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

