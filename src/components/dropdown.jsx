import { useState } from "react";
import { NavbarToggle, NavDropdown, NavItem, NavLink } from "react-bootstrap";
import { IoMenuSharp } from "react-icons/io5";
import { IoColorPalette, IoGameController } from "react-icons/io5";
import { MdCreateNewFolder } from "react-icons/md";
import { FaTimeline } from "react-icons/fa6";
import { FaServer } from "react-icons/fa";
import { BiSolidTerminal } from "react-icons/bi";

function OtherDropdown() {
  const [show, setShow] = useState(false);

  return (
    <NavDropdown
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      aria-label="Some of my other sites/projects"
      as={NavItem}
      className="nav-link"
      drop={"down-centered"}
      show={show}
      title={
        <>
          <IoMenuSharp style={{ marginRight: "5px" }} />
          Others
        </>
      }
    >
      {/*<NavbarToggle*/}
      {/*        onMouseEnter={() => setShow(true)}*/}
      {/*        onMouseLeave={() => setShow(false)}*/}
      {/*        bsPrefix*/}
      {/*    >*/}
      {/*        <CgMenu style={{marginBottom: "2px"}}/> Other*/}
      {/*    </NavbarToggle>*/}
      {/*    <Menu*/}
      {/*        style={{marginTop: "0"}}*/}
      {/*        onMouseEnter={() => setShow(true)}*/}
      {/*        onMouseLeave={() => setShow(false)}*/}
      {/*        show={show}*/}
      {/*    >*/}
      <NavDropdown.Item
        title="A wordle clone that I made that has received 5m+ page views"
        className="dropdown-item"
        href="/foodle"
      >
        <IoGameController style={{ marginBottom: "2px" }} /> Foodle
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        title="A simple random color generator I made to learn some JS"
        className="dropdown-item"
        href="/random-color"
      >
        <IoColorPalette style={{ marginBottom: "2px" }} /> Random Color
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        title="My personal new tab page"
        className="dropdown-item"
        href="/StartPage"
      >
        <MdCreateNewFolder style={{ marginBottom: "2px" }} /> StartPage
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        title="Programming timeline"
        className="dropdown-item"
        href="/#/timeline"
      >
        <FaTimeline // todo: write propery not using /#/
          style={{ marginBottom: "2px" }}
        />{" "}
        Timeline
      </NavDropdown.Item>

      <NavDropdown.Divider />
      <NavDropdown.Item
        title="A Status page for all sites"
        className="dropdown-item"
        href="https://status.jasoncameron.dev"
        target="_blank"
      >
        <FaServer style={{ marginBottom: "2px" }} /> Status
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        title="A terminal style site I made to be a simple 'networking' site and my personal homepage"
        className="dropdown-item"
        href="https://terminal.jasoncameron.dev"
        target="_blank"
      >
        <BiSolidTerminal style={{ marginBottom: "2px" }} /> Terminal
      </NavDropdown.Item>
      {/*</Menu>*/}
    </NavDropdown>
  );
}

export default OtherDropdown;
