import React, { useCallback, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigation } from "react-navi";
import { Endpoint, LoginUserInput } from "../../../http";
import post, { PostResponse } from "../../../http/Http";
import {
  USERNAME_FIELD_NAME,
  USER_ID_FIELD_NAME,
} from "../../../localstorage/LocalStorage";

interface FormData {
  email?: string;
  password?: string;
  showPassword: boolean;
}

interface FormErrors {
  email: boolean;
  password: boolean;
  requestError: boolean;
  invalidLogin: boolean;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({ showPassword: false });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: true,
    password: true,
    requestError: false,
    invalidLogin: false,
  });

  const isEmailValid = useCallback((email?: string): boolean => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }, []);

  const validateData = useCallback(
    (dataToValidate: FormData) => {
      const errors: FormErrors = {
        email: false,
        password: false,
        requestError: false,
        invalidLogin: false,
      };
      if (!isEmailValid(dataToValidate.email)) {
        errors.email = true;
      }
      if (
        dataToValidate.password === undefined ||
        dataToValidate.password.length === 0
      ) {
        errors.password = true;
      }
      setFormErrors(errors);
    },
    [isEmailValid]
  );

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

  const handlePasswordChanged = useCallback(
    (newPassword?: string) => {
      setFormData({
        ...formData,
        password: newPassword,
      });
      validateData({
        ...formData,
        password: newPassword,
      });
    },
    [formData, validateData]
  );

  const navigation = useNavigation();

  const handleLoginClicked = async () => {
    const response = await post(
      Endpoint.LoginUserEndpoint,
      JSON.stringify({
        password: formData.password,
        email: formData.email,
      } as LoginUserInput)
    );
    if ((response as unknown as PostResponse).error) {
      setFormErrors({
        ...formErrors,
        requestError: true,
      });
      return;
    }
    if (response.data !== "null") {
      localStorage.setItem(
        USERNAME_FIELD_NAME,
        JSON.parse(response.data).username ?? "username"
      );
      localStorage.setItem(
        USER_ID_FIELD_NAME,
        JSON.parse(response.data).id ?? "id"
      );
      const event = new Event("login");
      document.dispatchEvent(event);
      navigation.navigate("home");
      return;
    }
    setFormErrors({
      ...formErrors,
      invalidLogin: true,
    });
  };

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
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => {
              handleEmailChanged(event.target.value);
            }}
            isInvalid={formErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            Please enter valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={formData.showPassword ? "text" : "password"}
            placeholder="Enter password"
            isInvalid={formErrors.password}
            onChange={(event) => {
              handlePasswordChanged(event.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please enter password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Form.Check
            type="checkbox"
            label={formData.showPassword ? "Hide password" : "Show password"}
            onChange={(event) => {
              setFormData({
                ...formData,
                showPassword: event.target.checked,
              });
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            handleLoginClicked();
          }}
        >
          Login
        </Button>
        <Form.Group className="mb-3">
          {formErrors.requestError ? (
            <Form.Label color={"red"}>Something went wrong.</Form.Label>
          ) : null}
          {formErrors.invalidLogin ? (
            <Form.Label color={"red"}>Invalid login.</Form.Label>
          ) : null}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
