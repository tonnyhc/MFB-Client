import { useState } from "react";

import Input from "../components/common/input/Input";
import Button from "../components/common/button/Button";
import useFormState from "../hooks/useFormState";
import { register } from "../services/authenticationServices";

const AuthenticationPage = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [formData, errors, handleChange, handleBlurValidation] =
    useFormState(initialState);

  async function onSubmitRegister(e) {
    e.preventDefault();
    const formDataCopy = { ...formData };
    delete formDataCopy.confirm_email;
    delete formDataCopy.confirm_password;
    console.log(formDataCopy);
    try {
      const data = await register(formDataCopy);
      return data;
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <section className="w-full h-full px-4 py-6 text-white overflow-hidden">
      <div>
        <h3 className="font-semibold uppercase text-lg">
          Register and become the best version of yourself!
        </h3>
      </div>
      <div className="m-auto w-4/5 h-full  ">
        <form className="w-full h-full " onSubmit={onSubmitRegister}>
          <div className="flex flex-col gap-3 items-center justify-center w-full h-[85%]">
            <Input
              labelText="Username"
              labelName="username"
              inputType="text"
              value={formData.username}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              errorMessage={errors.username}
              inputSize="sm"
            />
            <Input
              labelText="Email"
              labelName="email"
              inputType="email"
              value={formData.email}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              inputSize="sm"
              errorMessage={errors.email}
            />

            <Input
              labelText="Password"
              labelName="password"
              inputType="password"
              value={formData.password}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              inputSize="sm"
              errorMessage={errors.password}
            />

            <Input
              labelText="Confirm Password"
              labelName="confirm_password"
              inputType="password"
              value={formData.confirm_password}
              isRequired={true}
              onChange={handleChange}
              onBlur={handleBlurValidation}
              inputSize="sm"
              errorMessage={errors.confirm_password}
            />
          </div>
          <Button
            text="Register"
            color="light-grey"
            width="full"
            id="continue"
            shape="rectangular"
            type=""
            disabled={Object.values(errors).some(error => !!error)}
          />
        </form>
      </div>
    </section>
  );
};
export default AuthenticationPage;
