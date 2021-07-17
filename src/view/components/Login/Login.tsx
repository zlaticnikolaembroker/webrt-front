import React, { useCallback, useState } from "react";
import { Form, Button } from "react-bootstrap";

interface FormData {
  email?: string;
  password?: string;
  showPassword: boolean;
}

interface FormErrors {
  email: boolean;
  password: boolean;
}

const Login = () => {
  const [fromData, setFormData] = useState<FormData>({ showPassword: false });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: true,
    password: true,
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
        ...fromData,
        email: newEmail,
      });
      validateData({
        ...fromData,
        email: newEmail,
      });
    },
    [fromData, validateData]
  );

  const handlePasswordChanged = useCallback(
    (newPassword?: string) => {
      setFormData({
        ...fromData,
        password: newPassword,
      });
      validateData({
        ...fromData,
        password: newPassword,
      });
    },
    [fromData, validateData]
  );

  const handleLoginClicked = () => {};

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
            type={fromData.showPassword ? "text" : "password"}
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
            label={fromData.showPassword ? "Hide password" : "Show password"}
            onChange={(event) => {
              setFormData({
                ...fromData,
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
      </Form>
    </div>
  );
};

export default Login;
