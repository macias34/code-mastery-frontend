import { type UseMutationOptions, useMutation } from "react-query";

import { useUser } from "@/features/user";
import { type AccessToken, type ApiError, request } from "@/shared/utils";

export interface CreateOrderDto {
  courseId: number;
  userId: number;
}

type CreateOrderArguments = CreateOrderDto & AccessToken;

export const createOrder = ({
  userId,
  courseId,
  accessToken,
}: CreateOrderArguments) => {
  return request(
    "/order",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId,
        courseId,
      }),
    },
    { accessToken },
  );
};

export const useCreateOrder = (
  options?: UseMutationOptions<unknown, ApiError, unknown, unknown>,
) => {
  const { accessToken } = useUser();

  return useMutation<unknown, ApiError, CreateOrderArguments, unknown>({
    mutationFn: ({ userId, courseId }) =>
      createOrder({ userId, courseId, accessToken }),
    ...options,
  });
};
