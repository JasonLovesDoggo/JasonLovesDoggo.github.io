import {useState} from "react";
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import {Dropdown} from "react-bootstrap";
import {CgCodeSlash} from "react-icons/cg";

function NavDropdown() {
    const [show, setShow] = useState(false);

    return (
        <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}
                             onMouseEnter={() => setShow(true)}
                             onMouseLeave={() => setShow(false)} bsPrefix ><CgCodeSlash style={{ marginBottom: "2px" }} /> Other</Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-container" onMouseEnter={() => setShow(true)}
                             onMouseLeave={() => setShow(false)} show={show}>
            <Dropdown.Item className="dropdown-item" href="/foodle">Foodle</Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item className="dropdown-item" href="/small/random-color">Random Color</Dropdown.Item>
                </Dropdown.Menu>
        </Dropdown>
    );
}

export default NavDropdown;
