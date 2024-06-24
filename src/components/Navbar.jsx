import React, {useState} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import logo from "../Assets/logo.png";
import {CgCodeSlash, CgFileDocument, CgGitFork} from "react-icons/cg";
import {AiFillStar, AiOutlineHome, AiOutlineUser} from "react-icons/ai";
import {BsCameraFill} from "react-icons/bs";
import Dropdown from "./dropdown";

function TopNavbar() {
    const [navColour, updateNavbar] = useState(false);
    const [expand, updateExpanded] = useState(false);

    function scrollHandler() {
        if (window.scrollY >= 20) {
            updateNavbar(true);
        } else {
            updateNavbar(false);
        }
    }

    window.addEventListener("scroll", scrollHandler);
    return (
        <Navbar fixed="top" className={navColour ? "sticky" : "navbar"}>
            <Container>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => {
                        updateExpanded(expand ? false : "expanded");
                    }}
                ></Navbar.Toggle>
                <Navbar.Brand href="/">
                    <img src={logo} className="img-fluid logo" alt="My Icon"/>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => {
                        updateExpanded(expand ? false : "expanded");
                    }}
                ></Navbar.Toggle>
                <Navbar.Collapse
                    className="justify-content-end"
                    id="responsive-navbar-nav"
                >
                    <Nav className="ms-auto" defaultActiveKey="#home">
                        <Nav.Link title="Go back home" href="/">
                            <AiOutlineHome style={{marginBottom: "2px"}}/> Home
                        </Nav.Link>

                        <Nav.Link href="/about" title="About me">
                            <AiOutlineUser style={{marginBottom: "2px"}}/> About
                        </Nav.Link>

                        <Nav.Link href="/projects" title="My Projects">
                            <CgCodeSlash style={{marginBottom: "2px"}}/> Projects
                        </Nav.Link>

                        <Nav.Link
                            href="/photos"
                            title="A page to display my photos mostly of my dog."
                        >
                            <BsCameraFill style={{marginBottom: "2px"}}/> Photos
                        </Nav.Link>
                        <Nav.Link href="/resume" title="My Resume">
                            <CgFileDocument style={{marginBottom: "2px"}}/> Resume
                        </Nav.Link>
                        <Nav.Item className="nav-item">
                            <Dropdown/>
                        </Nav.Item>
                        <Nav.Item className="fork-btn">
                            <Button
                                href="https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io"
                                target="_blank"
                                className="fork-btn-inner"
                                title="Fork me on Github"
                            >
                                <CgGitFork style={{fontSize: "1.2em"}}/>{" "}
                                <AiFillStar style={{fontSize: "1.1em"}}/>
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNavbar;
