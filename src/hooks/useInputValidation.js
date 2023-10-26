import { useState } from "react";

const useInputValidation = (regex = null) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

  const validateInput = (inputValue, inputType) => {
    if (inputType == 'email' && !inputValue.match(emailRegex)){
        return "Invalid email";
    };
    if (inputType == 'password' && !inputValue.match(passwordRegex)){
        return "Weak password";
    }

    if (regex && !inputValue.match(regex)) {
      return "Invalid input";
    }
    return null; // No error
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const inputType = event.target.type;
    setValue(inputValue);

    // Perform validation
    const validationError = validateInput(inputValue, inputType );
    setError(validationError);
  };

  return {
    value,
    error,
    handleChange,
    isValid: error === null,
  };
};

export default useInputValidation;
