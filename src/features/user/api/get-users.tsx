import { useQuery } from "react-query";

import { type GetUsersDto, useUser } from "@/features/user";
import { request } from "@/shared/utils";

import { type UserFilter } from "../../profile/types";

// TODO: Think about good placement for this function, maybe in dashboard/users/api or dashboard/api ??

export const getUsers = async ({
  userFilter,
  accessToken,
  page,
}: {
  accessToken: string;
  userFilter: UserFilter;
  page: number;
}) => {
  const searchParams = new URLSearchParams();
  searchParams.append("page", page.toString());
  searchParams.append("size", "5");
  userFilter.email && searchParams.append("email", userFilter.email);
  userFilter.role && searchParams.append("role", userFilter.role);
  userFilter.username && searchParams.append("username", userFilter.username);

  return await request<GetUsersDto>(
    `/user?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    },
    { accessToken },
  );
};

export const useUsers = ({
  userFilter,
  page,
}: {
  userFilter: UserFilter;
  page: number;
}) => {
  const userData = useUser();
  return useQuery({
    queryKey: ["users", page, userFilter],
    queryFn: () =>
      getUsers({ accessToken: userData.accessToken, page, userFilter }),
  });
};
