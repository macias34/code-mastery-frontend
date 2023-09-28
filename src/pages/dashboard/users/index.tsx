import { type GetServerSideProps } from "next";
import { FormProvider, useForm } from "react-hook-form";

import { withRoleAuthorization } from "@/features/auth";
import { DashboardLayout } from "@/features/dashboard";
import { type UserFilter } from "@/features/profile/types";
import { type UserRole, UsersCard } from "@/features/user";
import { useUsers } from "@/features/user";

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

  const { data: usersReponse, isLoading: areUsersLoading } = useUsers({
    userFilter: {
      email: "",
      username,
      role: role === "ALL" ? undefined : role,
    },
    page: page,
  });

  return (
    <DashboardLayout>
      <FormProvider {...methods}>
        <UsersCard {...usersReponse} isLoading={areUsersLoading} />
      </FormProvider>
    </DashboardLayout>
  );
}

// @TODO - add role authorization
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return withRoleAuthorization({ req, res });
};
