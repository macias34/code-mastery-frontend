import { FormProvider, useForm } from "react-hook-form";

import { DashboardLayout } from "@/features/dashboard";
import { type UserFilter } from "@/features/profile";
import { UserRole, UsersCard } from "@/features/user";
import { useUsers } from "@/features/user";
import { useRoleAuthorization } from "@/shared/utils";

export type UserSearchFilters = Omit<Required<UserFilter>, "role"> & {
  role: UserRole | "ALL";
  page: number;
};

export default function UsersDashboard() {
  useRoleAuthorization({ userRoleToExclude: UserRole.USER });

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
