import { request } from "@/utils";

import { type SignUpDto } from "../types";

export const signUp = async (signUpDto: SignUpDto) => {
  const { username, email, password, ...personalDetails } = signUpDto;
  return await request<void>("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      personalDetails,
      invoiceDetailsSameAsPersonal: true,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
};
