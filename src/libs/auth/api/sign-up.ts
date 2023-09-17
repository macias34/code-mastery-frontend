import { request } from "@/libs/utils";

import { SignUpDto } from "../dto";

export const signUp = async (signUpDto: SignUpDto) => {
  return await request<void>("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(signUpDto),
    headers: {
      "Content-type": "application/json",
    },
  });
};
