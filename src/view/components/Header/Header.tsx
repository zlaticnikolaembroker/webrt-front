import React, { useMemo } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {
  LocalStorage,
  USER_ID_FIELD_NAME,
} from "../../../localstorage/LocalStorage";

const Navigation = () => {
  const userId = useMemo(() => {
    return LocalStorage.getFromLocalStorage(USER_ID_FIELD_NAME);
  }, []);

  return (
    <Navbar bg="primary" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="/home">WebRTC</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/create-meeting">Create meeting</Nav.Link>
          <Nav.Link href="/join-meeting">Join meeting</Nav.Link>
        </Nav>
        <Nav>
          {!userId ? (
            <React.Fragment>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Nav.Link
                href="/home"
                onClick={() => {
                  LocalStorage.clearLocalStorage();
                }}
              >
                Logout
              </Nav.Link>
            </React.Fragment>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
