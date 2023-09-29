import { z } from "zod";

export const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be at least 3 characters long")
    .max(20, "Username should be at max 20 characters long"),
  email: z.string().email(),
  password: z.string().min(5, "Password should be at least 5 characters long"),
  firstName: z
    .string()
    .min(3, "First name should be at least 3 characters long"),
  lastName: z.string().min(3, "Last name should be at least 3 characters long"),
  postalCode: z
    .string()
    .min(2, "Postal code should be at least 2 characters long"),
  city: z.string().min(2, "City should be at least 2 characters long"),
  street: z.string().min(2, "Street should be at least 3 characters long"),
  phoneNumber: z
    .string()
    .min(2, "Phone number should be at least 2 characters long"),
});
