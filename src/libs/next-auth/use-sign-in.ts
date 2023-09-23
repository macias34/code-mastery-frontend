import { signIn as NextAuthSignIn } from "next-auth/react";
import { useMutation } from "react-query";

import { SignInFormData } from "@/features/auth";

const signIn = async (data: SignInFormData) => {
  const res = await NextAuthSignIn("credentials", { ...data, redirect: false });
  return res;
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};
