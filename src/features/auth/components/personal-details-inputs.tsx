import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";

import { PersonalDetailsFormData } from "@/features/profile";
import { InputWithLabel } from "@/shared/components/input-with-label";

export const PersonalDetailsInputs = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PersonalDetailsFormData>();
  return (
    <>
      <div className="flex gap-4 justify-between">
        <InputWithLabel
          className="w-1/2"
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
          className="w-1/2"
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
        name="phoneNumber"
        labelContent="Phone Number"
        input={{
          ...register("phoneNumber"),
          type: "text",
          placeholder: "(607) 772-1621",
        }}
        error={<ErrorMessage errors={errors} name="phoneNumber" />}
      />
      <div className="flex gap-4 justify-between">
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
      </div>
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
