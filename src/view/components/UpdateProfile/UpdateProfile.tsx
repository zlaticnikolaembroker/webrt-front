import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Endpoint, GetUserByIdInput } from "../../../http";
import post, { PostResponse } from "../../../http/Http";
import {
  LocalStorage,
  USERNAME_FIELD_NAME,
  USER_ID_FIELD_NAME,
} from "../../../localstorage/LocalStorage";

interface FormData {
  id?: number;
  password?: string;
  email?: string;
  username?: string;
}

interface FormErrors {
  email: boolean;
  username: boolean;
  requestError: boolean;
  requestSuccess: boolean;
}

const UpdateProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId: number = useMemo(() => {
    return Number(LocalStorage.getFromLocalStorage(USER_ID_FIELD_NAME));
  }, []);

  const [formData, setFormData] = useState<FormData>({});

  const isEmailValid = useCallback((email?: string): boolean => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }, []);

  const validateData = useCallback(
    (dataToValidate: FormData) => {
      const errors: FormErrors = {
        email: false,
        requestError: false,
        username: false,
        requestSuccess: false,
      };
      if (!isEmailValid(dataToValidate.email)) {
        errors.email = true;
      }
      if (
        dataToValidate.username === undefined ||
        dataToValidate.username.length === 0
      ) {
        errors.username = true;
      }
      setFormErrors(errors);
    },
    [isEmailValid]
  );

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: true,
    username: true,
    requestError: false,
    requestSuccess: false,
  });

  useEffect(() => {
    if (!isNaN(userId)) {
      post(
        Endpoint.GetUserByIdEndpoint,
        JSON.stringify({
          id: userId,
        } as GetUserByIdInput)
      )
        .then((result) => {
          try {
            if (result.data) {
              setFormData({
                email: JSON.parse(result.data).email,
                username: JSON.parse(result.data).username,
                id: JSON.parse(result.data).id,
                password: JSON.parse(result.data).password,
              });
              validateData({
                email: JSON.parse(result.data).email,
                username: JSON.parse(result.data).username,
              });
            }
          } catch (err) {
            setFormErrors({
              email: false,
              requestError: true,
              requestSuccess: false,
              username: false,
            });
          } finally {
          }
        })
        .catch((err) => {
          setFormErrors({
            email: false,
            requestError: true,
            requestSuccess: false,
            username: false,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userId, validateData]);

  const handleEmailChanged = useCallback(
    (newEmail?: string) => {
      setFormData({
        ...formData,
        email: newEmail,
      });
      validateData({
        ...formData,
        email: newEmail,
      });
    },
    [formData, validateData]
  );

  const handleUsernameChanged = useCallback(
    (newusername?: string) => {
      setFormData({
        ...formData,
        username: newusername,
      });
      validateData({
        ...formData,
        username: newusername,
      });
    },
    [formData, validateData]
  );

  const handleUpdateProfileClicked = useCallback(async () => {
    const response = await post(
      Endpoint.UpdateUserEndpoint,
      JSON.stringify(formData)
    );
    if ((response as unknown as PostResponse).error) {
      setFormErrors({
        ...formErrors,
        requestError: true,
      });
      return;
    }
    setFormErrors({
      ...formErrors,
      requestSuccess: true,
    });
    localStorage.setItem(USERNAME_FIELD_NAME, formData.username ?? "");
  }, [formData, formErrors]);

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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form className="text-center">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => {
                handleEmailChanged(event.target.value);
              }}
              isInvalid={formErrors.email}
              defaultValue={formData.email}
            />
            <Form.Control.Feedback type="invalid">
              Please enter valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(event) => {
                handleUsernameChanged(event.target.value);
              }}
              isInvalid={formErrors.username}
              defaultValue={formData.username}
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
              handleUpdateProfileClicked();
            }}
          >
            Update
          </Button>

          <Form.Group className="mb-3">
            {formErrors.requestError ? (
              <Form.Label color={"red"}>Something went wrong.</Form.Label>
            ) : null}
            {formErrors.requestSuccess ? (
              <Form.Label color={"red"}>
                Profile updated successfully.
              </Form.Label>
            ) : null}
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default UpdateProfile;
