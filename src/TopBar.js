import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth0 } from "./react-auth0-spa";
import { BiFilm } from "react-icons/bi";

const TopBar = (props) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated || !user) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Slideshow Editor</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link onClick={loginWithRedirect} href="#">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Slideshow Editor</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          <Nav.Link onClick={props.newSlideshow} href="#"><BiFilm/> New</Nav.Link>
          <Nav.Link onClick={logout} href="#">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar;
