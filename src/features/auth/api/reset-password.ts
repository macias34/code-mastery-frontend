import { useMutation } from "react-query";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components";
import { delay, request } from "@/shared/utils";

import { type ResetPasswordDto, type SendPasswordResetLinkDto } from "../types";

export const sendResetPasswordLink = async (dto: SendPasswordResetLinkDto) => {
  return await request(`/user/send-reset-password-link?email=${dto.email}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const useSendResetPasswordLink = () => {
  return useMutation(sendResetPasswordLink, {
    onError: (error: Error) => {
      toast({
        title: TOAST_ERROR_TITLE,
        description: error?.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: TOAST_SUCCESS_TITLE,
        description: "Email link has been send",
      });
    },
  });
};

export const resetPassword = async ({
  newPassword,
  token,
}: ResetPasswordDto) => {
  return await request(`/user/reset-password?token=${token}`, {
    method: "POST",
    body: JSON.stringify({ newPassword }),
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const useResetPassword = () => {
  return useMutation(resetPassword, {
    onError: (error: Error) => {
      toast({
        title: TOAST_ERROR_TITLE,
        description: error?.message,
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      toast({
        title: TOAST_SUCCESS_TITLE,
        description: "Password changed successfully",
      });
      await delay(2500);
      window.location.href = "/auth";
    },
  });
};
