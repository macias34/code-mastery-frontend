import { request } from "@/libs/utils";

import { SignInDto } from "../dto";

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
