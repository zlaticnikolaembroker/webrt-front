import React, { useCallback, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigation } from "react-navi";
import {
  LocalStorage,
  USERNAME_FIELD_NAME,
} from "../../../localstorage/LocalStorage";

interface FormInput {
  userName: string;
}

interface FormError {
  userName: boolean;
}

const CreateMeeting = () => {
  const navigation = useNavigation();

  const generateMeetingId = useCallback((): string => {
    let meetingID: string = "";
    for (let i = 0; i < 9; i++) {
      meetingID = meetingID + Math.floor(Math.random() * 10).toString();
    }

    return meetingID;
  }, []);

  const [formData, setFormData] = useState<FormInput>({ userName: "" });
  const [formDataError, setFormDataError] = useState<FormError>({
    userName: true,
  });

  const checkFormData = useCallback((formData: FormInput) => {
    if (!formData.userName || formData.userName.length === 0) {
      setFormDataError({
        userName: true,
      });
    } else {
      setFormDataError({
        userName: false,
      });
    }
  }, []);

  const handleCreateMeeting = useCallback(() => {
    if (!formDataError.userName) {
      const meetingId = generateMeetingId();
      navigation.navigate(`meeting/${meetingId}`);
      LocalStorage.setToLocalStorage(USERNAME_FIELD_NAME, formData.userName);
    }
  }, [formDataError, generateMeetingId, navigation, formData]);

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
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            isInvalid={formDataError.userName}
            onChange={(e) => {
              setFormData({
                userName: e.target.value,
              });
              checkFormData({
                userName: e.target.value,
              });
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please enter username.
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            handleCreateMeeting();
          }}
        >
          Create meeting
        </Button>
      </Form>
    </div>
  );
};

export default CreateMeeting;
