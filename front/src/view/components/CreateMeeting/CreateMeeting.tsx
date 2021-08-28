import React, { useCallback, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigation } from "react-navi";
import { CreateMeetingInput, Endpoint } from "../../../http";
import post, { PostResponse } from "../../../http/Http";
import {
  USERNAME_FIELD_NAME,
  LocalStorage,
} from "../../../localstorage/LocalStorage";

interface FormInput {
  userName: string;
}

interface FormError {
  userName: boolean;
  requestFailed: boolean;
}

const CreateMeeting = () => {
  const navigation = useNavigation();

  const generateMeetingId = useCallback((): number => {
    let meetingID: string = "";
    for (let i = 0; i < 9; i++) {
      meetingID = meetingID + Math.floor(Math.random() * 10).toString();
    }

    return Number(meetingID);
  }, []);

  const username = localStorage.getItem(USERNAME_FIELD_NAME);

  const [formData, setFormData] = useState<FormInput>({
    userName: username ?? "",
  });

  const [formDataError, setFormDataError] = useState<FormError>({
    userName: username && username.length > 0 ? false : true,
    requestFailed: false,
  });

  const checkFormData = useCallback((formData: FormInput) => {
    if (!formData.userName || formData.userName.length === 0) {
      setFormDataError({
        userName: true,
        requestFailed: false,
      });
    } else {
      setFormDataError({
        userName: false,
        requestFailed: false,
      });
    }
  }, []);

  const handleCreateMeeting = useCallback(async () => {
    if (!formDataError.userName) {
      const meetingId = generateMeetingId();
      const response = await post(
        Endpoint.CreateMeetingEndpoint,
        JSON.stringify({
          meetingNumber: meetingId,
        } as CreateMeetingInput)
      );
      if ((response as unknown as PostResponse).error) {
        setFormDataError({
          ...formDataError,
          requestFailed: true,
        });
        return;
      }

      if (JSON.parse(response.data).id) {
        LocalStorage.setToLocalStorage(USERNAME_FIELD_NAME, formData.userName);
        navigation.navigate(`meeting/${meetingId}`);
      } else {
        setFormDataError({
          ...formDataError,
          requestFailed: true,
        });
      }
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
            defaultValue={username ?? undefined}
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
