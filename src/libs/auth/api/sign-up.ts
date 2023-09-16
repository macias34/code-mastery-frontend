import { request } from "@/libs/utils";

import { SignUpDto } from "../dto";

export const signIn = async (signUpDto: SignUpDto) => {
  return await request("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(signUpDto),
    headers: {
      "Content-type": "application/json",
    },
  });
};
