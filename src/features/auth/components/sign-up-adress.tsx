import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

import { InputWithLabel } from "@/shared/components/input-with-label";

import { SignUpFormData } from "./sign-up-form";

export const SignUpAdress = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormData>();
  return (
    <>
      <InputWithLabel
        name="postalCode"
        labelContent="Postal code"
        input={{
          ...register("postalCode"),
          type: "text",
          placeholder: "10001",
        }}
        error={<ErrorMessage errors={errors} name="postalCode" />}
      />
      <InputWithLabel
        name="city"
        labelContent="City"
        input={{
          ...register("city"),
          type: "text",
          placeholder: "New York",
        }}
        error={<ErrorMessage errors={errors} name="city" />}
      />
      <InputWithLabel
        name="street"
        labelContent="Street"
        input={{
          ...register("street"),
          type: "text",
          placeholder: "Wall Street",
        }}
        error={<ErrorMessage errors={errors} name="street" />}
      />
    </>
  );
};
