import router from "next/router";
import { useMutation } from "react-query";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components/use-toast";
import { ApiError, request } from "@/shared/utils";

import { type SignUpDto } from "../types";

export const signUp = async (signUpDto: SignUpDto) => {
  const { email, password, ...personalDetails } = signUpDto;
  return await request<void>("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({
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

export const useSignUp = () => {
  return useMutation(signUp, {
    onSuccess: () => {
      toast({
        title: TOAST_SUCCESS_TITLE,
        description:
          "You have successfully signed up! Please confirm your email, then you can login.",
      });
      void router.push("/auth");
    },
    onError: (error: ApiError) => {
      toast({
        title: TOAST_ERROR_TITLE,
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
