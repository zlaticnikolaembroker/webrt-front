import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="/home">WebRTC</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/create-meeting">Create meeting</Nav.Link>
          <Nav.Link href="/join-meeting">Join meeting</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
