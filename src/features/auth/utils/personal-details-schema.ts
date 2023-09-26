import { SignUpFormSchema } from "./sign-up-form-schema";

export const PersonalDetailsSchema = SignUpFormSchema.pick({
  firstName: true,
  lastName: true,
  postalCode: true,
  city: true,
  street: true,
  phoneNumber: true,
});
