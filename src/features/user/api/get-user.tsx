import { useQuery } from "react-query";

import { type UserDto, useUser } from "@/features/user";
import { request } from "@/shared/utils";

interface GetUsersArguments {
  accessToken: string;
  userId: number;
}

export const getUser = async ({ accessToken, userId }: GetUsersArguments) => {
  return await request<UserDto>(
    `/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    },
    { accessToken },
  );
};

export const useGetUser = ({ userId }: { userId: number }) => {
  const { accessToken } = useUser();
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser({ accessToken, userId }),
  });
};
