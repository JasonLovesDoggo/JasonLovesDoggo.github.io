import {useState} from "react";
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import {Dropdown} from "react-bootstrap";
import {CgMenu} from "react-icons/cg";
import {
    IoColorPalette,
    IoGameController,
} from "react-icons/io5";
import {MdCreateNewFolder} from "react-icons/md";

function NavDropdown() {
    const [show, setShow] = useState(false);

    return (
        <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}
                             onMouseEnter={() => setShow(true)}
                             onMouseLeave={() => setShow(false)} bsPrefix ><CgMenu style={{ marginBottom: "2px" }} /> Other</Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-container" onMouseEnter={() => setShow(true)}
                             onMouseLeave={() => setShow(false)} show={show}>
            <Dropdown.Item title="A wordle clone that I made that has received 5m+ page views" className="dropdown-item" href="/foodle"><IoGameController style={{ marginBottom: "2px" }}/> Foodle</Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item title="A simple random color generator I made to learn some JS" className="dropdown-item" href="/random-color"><IoColorPalette style={{ marginBottom: "2px" }}/> Random Color</Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item title="My personal new tab page" className="dropdown-item" href="/startpage"><MdCreateNewFolder style={{ marginBottom: "2px" }}/> StartPage</Dropdown.Item>
                </Dropdown.Menu>
        </Dropdown>
    );
}

export default NavDropdown;
