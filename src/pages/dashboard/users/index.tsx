import { type GetServerSideProps } from "next";
import { FormProvider, useForm } from "react-hook-form";

import { withRoleAuthorization } from "@/features/auth";
import { UsersCard } from "@/features/dashboard/users";
import { type UserFilter } from "@/features/profile/types";
import { ShopLayout } from "@/features/shop";
import { type UserRole } from "@/features/user";
import { useUsers } from "@/features/user/api";

export type UserSearchFilters = Omit<Required<UserFilter>, "role"> & {
  role: UserRole | "ALL";
  page: number;
};

export default function UsersDashboard() {
  const methods = useForm<UserSearchFilters>({
    defaultValues: {
      email: "",
      username: "",
      role: "ALL",
      page: 0,
    },
  });

  const page = methods.watch("page");
  const role = methods.watch("role");
  const username = methods.watch("username");

  console.log(role);

  const { data: usersReponse, isLoading: areUsersLoading } = useUsers({
    userFilter: {
      email: "",
      username,
      role: role === "ALL" ? undefined : role,
    },
    page: page,
  });

  return (
    <ShopLayout>
      <FormProvider {...methods}>
        <UsersCard {...usersReponse} isLoading={areUsersLoading} />
      </FormProvider>
    </ShopLayout>
  );
}

// @TODO - add role authorization
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return withRoleAuthorization({ req, res });
};
