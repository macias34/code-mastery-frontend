import { FormProvider, useForm } from "react-hook-form";

import { DashboardLayout } from "@/features/dashboard";
import { type UserFilter } from "@/features/profile";
import { UserRole, UsersCard } from "@/features/user";
import { useUsers } from "@/features/user";
import { withRoleAuthorization } from "@/shared/utils";

export type UserSearchFilters = Omit<Required<UserFilter>, "role"> & {
  role: UserRole | "ALL";
  page: number;
};

// @TODO: Move useForm to component

function UsersDashboard() {
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

  const { data: usersResponse, isLoading: areUsersLoading } = useUsers({
    userFilter: {
      email: "",
      username,
      role: role === "ALL" ? undefined : role,
    },
    page: page,
  });

  return (
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/dashboard",
          label: "Go back to dashboard",
        },
        pageTitle: "Users",
      }}
    >
      <FormProvider {...methods}>
        <UsersCard {...usersResponse} isLoading={areUsersLoading} />
      </FormProvider>
    </DashboardLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(UsersDashboard, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
