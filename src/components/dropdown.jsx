import {useState} from "react";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import {Dropdown} from "react-bootstrap";
import {CgMenu} from "react-icons/cg";
import {IoColorPalette, IoGameController, IoTerminal} from "react-icons/io5";
import {MdCreateNewFolder} from "react-icons/md";
import {FaTimeline} from "react-icons/fa6";
import {FaServer} from "react-icons/fa";
import {BiSolidTerminal} from "react-icons/bi";

function NavDropdown() {
    const [show, setShow] = useState(false);

    return (
        <Dropdown title="Other sites/smaller projects" as={NavItem}>
            <Dropdown.Toggle
                as={NavLink}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                bsPrefix
            >
                <CgMenu style={{marginBottom: "2px"}}/> Other
            </Dropdown.Toggle>
            <Dropdown.Menu
                className="dropdown-container"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                show={show}
            >
                <Dropdown.Item
                    title="A wordle clone that I made that has received 5m+ page views"
                    className="dropdown-item"
                    href="/foodle"
                >
                    <IoGameController style={{marginBottom: "2px"}}/> Foodle
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item
                    title="A simple random color generator I made to learn some JS"
                    className="dropdown-item"
                    href="/random-color"
                >
                    <IoColorPalette style={{marginBottom: "2px"}}/> Random Color
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item
                    title="My personal new tab page"
                    className="dropdown-item"
                    href="/StartPage"
                >
                    <MdCreateNewFolder style={{marginBottom: "2px"}}/> StartPage
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item
                    title="Programming timeline"
                    className="dropdown-item"
                    href="/#/timeline"
                >
                    <FaTimeline // todo: write propery not using /#/
                        style={{marginBottom: "2px"}}
                    />{" "}
                    Timeline
                </Dropdown.Item>

                <Dropdown.Divider/>
                <Dropdown.Item
                    title="A Status page for all sites"
                    className="dropdown-item"
                    href="https://status.jasoncameron.dev"
                    target="_blank"
                >
                    <FaServer style={{marginBottom: "2px"}}/> Status
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item
                    title="A terminal style site I made to be a simple 'networking' site and my personal homepage"
                    className="dropdown-item"
                    href="https://terminal.jasoncameron.dev"
                    target="_blank"
                >
                    <BiSolidTerminal style={{marginBottom: "2px"}}/> Terminal
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default NavDropdown;
