import React, { useCallback, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {
  LocalStorage,
  USER_ID_FIELD_NAME,
} from "../../../localstorage/LocalStorage";

const Navigation = () => {
  const getUserId = useCallback((): string | null => {
    return LocalStorage.getFromLocalStorage(USER_ID_FIELD_NAME);
  }, []);

  const [userId, setUserid] = useState<string | null>(getUserId());

  document.addEventListener("login", () => {
    setUserid(getUserId());
  });

  document.addEventListener("register", () => {
    setUserid(getUserId());
  });

  return (
    <Navbar bg="primary" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="/home">WebRTC</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/meeting">Join meeting</Nav.Link>
        </Nav>
        <Nav>
          {!userId ? (
            <React.Fragment>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Nav.Link href="/update-profile">Update profile</Nav.Link>
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
