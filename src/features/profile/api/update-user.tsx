import { useMutation, useQueryClient } from "react-query";

import { type UserDto } from "@/features/user";
import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components/use-toast";
import { type ApiError, request } from "@/shared/utils";

import { type UpdateUserDto } from "../types";

export const updateUser = async ({
  userId,
  updateUserDto,
  accessToken,
}: {
  userId: number;
  updateUserDto: UpdateUserDto;
  accessToken: string;
}) => {
  return await request<UserDto>(
    `/user/${userId}`,
    {
      method: "PATCH",
      body: JSON.stringify(updateUserDto),
      headers: {
        "Content-type": "application/json",
      },
    },
    { accessToken },
  );
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: async () => {
      toast({
        title: TOAST_SUCCESS_TITLE,
        description: "You have successfully updated account!",
      });
      await queryClient.invalidateQueries(["userData"]);
      void queryClient.invalidateQueries({
        queryKey: ["users"],
      });
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
