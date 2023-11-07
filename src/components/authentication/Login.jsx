import { Link } from "react-router-dom";

import Button from "../common/button/Button";
import Input from "../common/input/Input";
import useFormState from "../../hooks/useFormState";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { loginRequest } from "../../services/authenticationServices";
import { useState } from "react";


const Login = () => {
  const initialState = {
    email_or_username: "",
    password: "",
  };

  const [formData, errors, handleChange, handleBlurValidation] =
    useFormState(initialState);

  const [requestErrors, setRequestErrors] = useState("");
  const { userLogin } = useContext(AuthContext);

  async function onSubmitLogin(e) {
    e.preventDefault();
    try {
      const data = await loginRequest(formData);
      setRequestErrors('')
      userLogin(data);
      return data;
    } catch (error) {
      setRequestErrors(error.non_field_errors);
    }
  }

  return (
    <section className="w-full h-full px-4 py-6 text-white overflow-hidden">
      <div className="m-auto w-[85%] h-full flex flex-col justify-center items-center gap-10 ">
        <form className="w-full" onSubmit={onSubmitLogin}>
          <div className="flex flex-col gap-3 items-center justify-center w-full mb-7">
            <p className="text-red-400">{requestErrors}</p>
            <Input
              labelText="Email or Username"
              placeholder="Email or Username"
              labelName="email_or_username"
              inputType="text"
              value={formData.email_or_username}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              errorMessage={errors.email_or_username}
              inputSize="sm"
            />
            <Input
              labelText="Password"
              placeholder="Password"
              labelName="password"
              inputType="password"
              value={formData.password}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              inputSize="sm"
              //   errorMessage={errors.email}
            />
          </div>
          <Button
            text="Login"
            color="light-grey"
            width="full"
            shape="rectangular"
            // disabled={Object.values(errors).some((error) => !!error)}
          />
        </form>

        <p className="text-gray-400 text-sm">
          <Link to="/reset-password">Forgot your password?</Link>
        </p>
        <p className="text-gray-400 text-sm">
          <Link to="/register">Don't have an account? Click here to Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
