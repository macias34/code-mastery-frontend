import { signOut } from "next-auth/react";
import { useMutation } from "react-query";

import { type UserDto } from "@/features/user";
import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components/use-toast";
import { type ApiError, delay, request } from "@/shared/utils";

import { type ChangePasswordDto } from "../types";

export const changePassword = async ({
  userId,
  changePasswordDto,
  accessToken,
}: {
  userId: number;
  changePasswordDto: ChangePasswordDto;
  accessToken: string;
}) => {
  return await request<UserDto>(
    `/user/${userId}/password`,
    {
      method: "PATCH",
      body: JSON.stringify(changePasswordDto),
      headers: {
        "Content-type": "application/json",
      },
    },
    { accessToken },
  );
};

export const useChangePassword = () => {
  return useMutation(changePassword, {
    onSuccess: async () => {
      toast({
        title: TOAST_SUCCESS_TITLE,
        description:
          "You have successfully changed password! Now sign-in by providing new credientals",
      });
      await delay(2500);
      await signOut();
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
