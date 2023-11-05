import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

import { request } from "@/shared/utils";

import { type UserDto } from "../types";

export const useUser = () => {
  const session = useSession();
  const accessToken = session.data?.user?.accessToken ?? "";
  const expiresAt = session.data?.expires ?? "";

  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: () => request<UserDto>("/user/me", {}, { accessToken }),
    enabled: !!accessToken,
  });

  const isLoading = isUserDataLoading && session.status === "loading";

  return {
    accessToken,
    userData,
    isLoading,
    expiresAt,
  };
};
