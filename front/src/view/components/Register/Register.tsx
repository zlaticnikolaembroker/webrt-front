import React, {useCallback, useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useNavigation} from "react-navi";
import {Endpoint, RegisterUserInput} from "../../../http";
import post, {PostResponse} from "../../../http/Http";
import {
    USERNAME_FIELD_NAME,
    USER_ID_FIELD_NAME,
} from "../../../localstorage/LocalStorage";

interface FormData {
    email?: string;
    username?: string;
    password?: string;
    showPassword: boolean;
    repeatedPassword?: string;
    showRepeatedPassword: boolean;
}

interface FormErrors {
    email: boolean;
    password: boolean;
    username: boolean;
    repeatedPassword: boolean;
    passwordsDoesntMatch: boolean;
    requestError: boolean;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        showPassword: false,
        showRepeatedPassword: false,
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: true,
        password: true,
        repeatedPassword: true,
        passwordsDoesntMatch: true,
        username: true,
        requestError: false,
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
                repeatedPassword: false,
                passwordsDoesntMatch: false,
                requestError: false,
                username: false,
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
            if (
                dataToValidate.username === undefined ||
                dataToValidate.username.length === 0
            ) {
                errors.username = true;
            }
            if (
                dataToValidate.repeatedPassword === undefined ||
                dataToValidate.repeatedPassword.length === 0
            ) {
                errors.repeatedPassword = true;
            }
            if (dataToValidate.password !== dataToValidate.repeatedPassword) {
                errors.passwordsDoesntMatch = true;
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

    const handleRepeatedPasswordChanged = useCallback(
        (newPassword?: string) => {
            setFormData({
                ...formData,
                repeatedPassword: newPassword,
            });
            validateData({
                ...formData,
                repeatedPassword: newPassword,
            });
        },
        [formData, validateData]
    );

    const navigation = useNavigation();

    const handleRegisterClicked = useCallback(async () => {
        const response = await post(
            Endpoint.RegisterUserEndpoint,
            JSON.stringify({
                password: formData.password,
                email: formData.email,
                username: formData.username,
            } as RegisterUserInput)
        );
        if ((response as unknown as PostResponse).error) {
            setFormErrors({
                ...formErrors,
                requestError: true,
            });
            return;
        }
        localStorage.setItem(USERNAME_FIELD_NAME, formData.username ?? "username");
        localStorage.setItem(USER_ID_FIELD_NAME, response.data);
        const event = new Event("register");
        document.dispatchEvent(event);
        navigation.navigate("home");
    }, [formData, formErrors, navigation]);

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
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={(event) => {
                            handleUsernameChanged(event.target.value);
                        }}
                        isInvalid={formErrors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter username.
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

                <Form.Group className="mb-3">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control
                        type={formData.showRepeatedPassword ? "text" : "password"}
                        placeholder="Repeat password"
                        isInvalid={
                            formErrors.repeatedPassword || formErrors.passwordsDoesntMatch
                        }
                        onChange={(event) => {
                            handleRepeatedPasswordChanged(event.target.value);
                        }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formErrors.repeatedPassword
                            ? "Please enter repeated password."
                            : "Passwords doesn't match."}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 text-center">
                    <Form.Check
                        type="checkbox"
                        label={
                            formData.showRepeatedPassword
                                ? "Hide repeated password"
                                : "Show repeated password"
                        }
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                showRepeatedPassword: event.target.checked,
                            });
                        }}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={(event) => {
                        event.preventDefault();
                        handleRegisterClicked();
                    }}
                >
                    Register
                </Button>
                {formErrors.requestError ? (
                    <Form.Control.Feedback type="invalid">
                        Something went wrong.
                    </Form.Control.Feedback>
                ) : null}
            </Form>
        </div>
    );
};

export default Register;
