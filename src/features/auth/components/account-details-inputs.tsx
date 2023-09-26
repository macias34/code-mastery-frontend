import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

import { InputWithLabel } from "@/shared/components/input-with-label";

interface FormWithAccountDetailsData {
  username: string;
  email: string;
  password: string;
}

export const AccountDetailsInputs = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormWithAccountDetailsData>();

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
