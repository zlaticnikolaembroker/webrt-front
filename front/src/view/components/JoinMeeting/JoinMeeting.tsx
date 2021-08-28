import React, { useCallback, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigation } from "react-navi";
import {
  Endpoint,
  CreateMeetingInput,
  GetMeetingByNumberInput,
} from "../../../http";
import post, { PostResponse } from "../../../http/Http";
import {
  LocalStorage,
  USERNAME_FIELD_NAME,
} from "../../../localstorage/LocalStorage";

interface FormData {
  meetingID?: string;
  username?: string;
}

interface FormErrors {
  meetingID: boolean;
  username: boolean;
  requestFailed: boolean;
}

const JoinMeeting = () => {
  const username = localStorage.getItem(USERNAME_FIELD_NAME);

  const [formData, setFormData] = useState<FormData>({
    username: username ?? undefined,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    meetingID: true,
    username: username && username.length > 0 ? false : true,
    requestFailed: false,
  });

  const validateFormData = useCallback((dataToValidate: FormData) => {
    let newFormErrorValue: FormErrors = {
      meetingID: false,
      username: false,
      requestFailed: false,
    };
    if (
      dataToValidate.meetingID === undefined ||
      dataToValidate.meetingID.replaceAll(" ", "").length !== 9 ||
      !dataToValidate.meetingID.replaceAll(" ", "").match(/^[0-9]+$/) //has only digits from 0 to 9
    ) {
      newFormErrorValue.meetingID = true;
    }

    if (
      dataToValidate.username === undefined ||
      dataToValidate.username.length === 0
    ) {
      newFormErrorValue.username = true;
    }
    setFormErrors(newFormErrorValue);
  }, []);

  const navigation = useNavigation();

  const handleJoinMeetingClicked = useCallback(async () => {
    if (!formErrors.username && !formErrors.meetingID && formData.username) {
      const response = await post(
        Endpoint.GetMeetingByNumberEndpoint,
        JSON.stringify({
          meetingNumber: Number(formData.meetingID),
        } as GetMeetingByNumberInput)
      );

      if ((response as unknown as PostResponse).error) {
        setFormErrors({
          ...formErrors,
          requestFailed: true,
        });
        return;
      }
      try {
        const result = JSON.parse(response.data);

        if (result.id) {
          LocalStorage.setToLocalStorage(
            USERNAME_FIELD_NAME,
            formData.username
          );
          navigation.navigate(
            `/meeting/${formData.meetingID?.replaceAll(" ", "")}`
          );
        } else {
          setFormErrors({
            ...formErrors,
            requestFailed: true,
          });
        }

        LocalStorage.setToLocalStorage(USERNAME_FIELD_NAME, formData.username);
        navigation.navigate(
          `/meeting/${formData.meetingID?.replaceAll(" ", "")}`
        );
      } catch (err) {
        setFormErrors({
          ...formErrors,
          requestFailed: true,
        });
        return;
      }
    }
  }, [navigation, formData, formErrors]);

  const handleMeetingIDChanged = useCallback(
    (newMeetingId: string) => {
      setFormData({
        meetingID: newMeetingId,
        username: formData.username,
      });
      validateFormData({
        meetingID: newMeetingId,
        username: formData.username,
      });
    },
    [formData, validateFormData]
  );

  const handleUsernameChanged = useCallback(
    (newUsername: string) => {
      setFormData({
        meetingID: formData.meetingID,
        username: newUsername,
      });
      validateFormData({
        meetingID: formData.meetingID,
        username: newUsername,
      });
    },
    [formData, validateFormData]
  );

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
          <Form.Control
            type="text"
            placeholder="Enter meeting Id"
            onChange={(event) => {
              handleMeetingIDChanged(event.target.value);
            }}
            isInvalid={formErrors.meetingID}
          />
          <Form.Control.Feedback type="invalid">
            Please enter valid meeting id.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(event) => {
              handleUsernameChanged(event.target.value);
            }}
            isInvalid={formErrors.username}
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
            handleJoinMeetingClicked();
          }}
        >
          Join meeting
        </Button>

        <Form.Group className="mb-3">
          {formErrors.requestFailed ? (
            <Form.Label color={"red"}>
              Something went wrong, probably meeting doesn't exist.
            </Form.Label>
          ) : null}
        </Form.Group>
      </Form>
    </div>
  );
};

export default JoinMeeting;
