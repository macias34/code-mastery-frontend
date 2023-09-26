import { signIn as NextAuthSignIn, type SignInResponse } from "next-auth/react";
import { type UseMutationOptions, useMutation } from "react-query";

import { type SignInFormData } from "@/features/auth";

const signIn = async (
  data: SignInFormData & { redirect?: boolean },
): Promise<SignInResponse | undefined> => {
  const response = await NextAuthSignIn("credentials", {
    ...data,
    redirect: false,
  });

  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
};

export const useSignIn = (
  options?: UseMutationOptions<
    SignInResponse | undefined,
    Error,
    SignInFormData
  >,
) => {
  return useMutation(signIn, {
    ...options,
  });
};
