import { signIn as NextAuthSignIn, SignInResponse } from "next-auth/react";
import { UseMutationOptions, useMutation } from "react-query";

import { SignInFormData } from "@/features/auth";
import { ApiError } from "@/shared/utils";

const signIn = async (
  data: SignInFormData & { redirect?: boolean },
): Promise<SignInResponse | undefined> => {
  const res = await NextAuthSignIn("credentials", { ...data, redirect: false });

  if (res?.error) {
    throw new Error(res.error);
  }

  return res;
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
