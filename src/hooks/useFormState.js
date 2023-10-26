import { useState } from "react";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

function validateField(value, regex, errorMessage) {
  if (!value.match(regex)) {
    return errorMessage;
  }
  return "";
}

const useFormState = (defaultState, regexValidator) => {
  const [fields, setFields] = useState(defaultState);
  const [errors, setErrors] = useState(defaultState);

  const handleBlurValidation = (e) => {
    const { name, value, type } = e.target;

    if (type == "email") {
      const emailError = validateField(value, emailRegex, "Invalid email!");
      setErrors((oldErrors) => ({ ...oldErrors, [name]: emailError }));
      return emailError;
    }
    if (name == "confirm_password") {
      const confirmError =
        value !== fields.password ? "Password don't match!" : "";
      setErrors((oldErrors) => ({ ...oldErrors, [name]: confirmError }));
      return confirmError;
    }
    if (type == "password") {
      const passwordError = validateField(
        value,
        passwordRegex,
        "Weak password!"
      );
      setErrors((oldErrors) => ({ ...oldErrors, [name]: passwordError }));
      return passwordError;
    }
    if (type === "text" && name === "username") {
      const usernameError = validateField(
        value,
        usernameRegex,
        "Invalid username!"
      );
      setErrors((oldErrors) => ({ ...oldErrors, [name]: usernameError }));
      return usernameError;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      const confirmError =
        fields.confirm_password !== value ? "Passwords don't match!" : "";
      setErrors((oldErrors) => ({
        ...oldErrors,
        confirm_password: confirmError,
      }));
    }
  };

  const changeDefaultState = (newDefaultState) => {
    setFields(newDefaultState);
  };

  return [
    fields,
    errors,
    handleChange,
    handleBlurValidation,
    changeDefaultState,
  ];
};

export default useFormState;
