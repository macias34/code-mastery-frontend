import { type UseFormReset } from "react-hook-form";

import { type UserDto } from "@/features/user";

import { type PersonalDetailsFormData } from "../components";

export const resetPersonalDetailsForm = (
  reset: UseFormReset<PersonalDetailsFormData>,
  user: UserDto,
) => {
  if (user && user.personalDetails) {
    const { city, firstName, lastName, phoneNumber, postalCode, street } =
      user.personalDetails;

    reset({
      city,
      firstName,
      lastName,
      phoneNumber,
      postalCode,
      street,
    });
  }
};
