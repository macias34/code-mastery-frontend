import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

import { InputWithLabel } from "@/shared/components/input-with-label";

import { SignUpFormData } from "./sign-up-form";

export const SignUpPersonalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormData>();

  return (
    <>
      <InputWithLabel
        name="username"
        labelContent="Username"
        input={{
          ...register("username"),
          type: "text",
          placeholder: "johndoe3",
        }}
        error={<ErrorMessage errors={errors} name="username" />}
      />

      <InputWithLabel
        name="email"
        labelContent="Email"
        input={{
          ...register("email"),
          type: "email",
          className: "w-full grow",
          placeholder: "johndoe@mail.com",
        }}
        error={<ErrorMessage errors={errors} name="email" />}
      />

      <InputWithLabel
        name="phoneNumber"
        labelContent="Phone Number"
        input={{
          ...register("phoneNumber"),
          type: "text",
          placeholder: "(607) 772-1621",
        }}
        error={<ErrorMessage errors={errors} name="phoneNumber" />}
      />

      <InputWithLabel
        name="password"
        labelContent="Password"
        input={{
          ...register("password"),
          type: "password",
          placeholder: "●●●●●●●●",
        }}
        error={<ErrorMessage errors={errors} name="password" />}
      />
    </>
  );
};
