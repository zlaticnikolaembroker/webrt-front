import React from "react";
import { Form, Button } from "react-bootstrap";

const JoinMeeting = () => {
  return (
    <div
      style={{
        alignContent: "center",
        margin: "auto",
        marginTop: "50px",
        height: "50%",
        width: "40%",
        backgroundColor: "burlywood",
        paddingTop: "100px",
        paddingBottom: "100px",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
      <Form className="text-center">
        <Form.Group className="mb-3" controlId="meetingId">
          <Form.Label>Meeting Id</Form.Label>
          <Form.Control type="text" placeholder="Enter meeting Id" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          Join meeting
        </Button>
      </Form>
    </div>
  );
};

export default JoinMeeting;
