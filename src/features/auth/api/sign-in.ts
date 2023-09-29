import { request } from "@/shared/utils";

import { SignInDto } from "../types";

interface JWTToken {
  accessToken: string;
}

export const signIn = async (signInDto: SignInDto) => {
  return await request<JWTToken>("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(signInDto),
    headers: {
      "Content-type": "application/json",
    },
  });
};
