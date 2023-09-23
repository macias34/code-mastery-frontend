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
      <div className="flex gap-4 justify-between">
        <InputWithLabel
          name="firstName"
          labelContent="First name"
          input={{
            ...register("firstName"),
            type: "text",
            placeholder: "John",
          }}
          error={<ErrorMessage errors={errors} name="firstName" />}
        />
        <InputWithLabel
          name="lastName"
          labelContent="Last name"
          input={{
            ...register("lastName"),
            type: "text",
            placeholder: "Doe",
          }}
          error={<ErrorMessage errors={errors} name="lastName" />}
        />
      </div>

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
