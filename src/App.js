import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Profile from './Profile';
import { useAuth0 } from "./react-auth0-spa";


const App = () => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <Container className="p-3">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Slideshow Editor</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          <Nav.Link onClick={loginWithRedirect} href="#">Login</Nav.Link>
          <Nav.Link onClick={logout} href="#">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Jumbotron>
      <p>Example of a cloud native application which includes authentication and authorization. Technologies include: React, Go, Auth0, Casbin, Docker and CircleCI.</p>
      <Profile/>
    </Jumbotron>
  </Container>
  );
}

export default App;
