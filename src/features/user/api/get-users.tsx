import { useQuery } from "react-query";

import { type GetUsersDto, useUser } from "@/features/user";
import { request } from "@/shared/utils";

import { type UserFilter } from "../../profile/types";

// TODO: Think about good placement for this function, maybe in dashboard/users/api or dashboard/api ??

interface GetUsersArguments {
  accessToken: string;
  userFilter: UserFilter;
  page: number;
}

type CreateSearchParametersArguments = Omit<GetUsersArguments, "accessToken">;

const createSearchParameters = ({
  page,
  userFilter: { email, role, username },
}: CreateSearchParametersArguments) => {
  const searchParameters = new URLSearchParams();

  if (email) {
    searchParameters.append("email", email);
  }
  if (role) {
    searchParameters.append("role", role);
  }
  if (username) {
    searchParameters.append("username", username);
  }
  searchParameters.append("page", page.toString());
  searchParameters.append("size", "5");

  return searchParameters;
};

export const getUsers = async ({
  userFilter,
  accessToken,
  page,
}: GetUsersArguments) => {
  const searchParameters = createSearchParameters({ userFilter, page });

  return await request<GetUsersDto>(
    `/user?${searchParameters.toString()}`,
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
  const { accessToken } = useUser();
  return useQuery({
    queryKey: [
      "users",
      page,
      userFilter.email,
      userFilter.role,
      userFilter.username,
    ],
    queryFn: () => getUsers({ accessToken, page, userFilter }),
  });
};
