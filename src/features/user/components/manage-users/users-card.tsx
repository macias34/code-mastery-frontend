import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { type GetUsersDto, type UserRole } from "@/features/user";
import { type UserSearchFilters } from "@/pages/dashboard/users";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { Input } from "@/shared/components/input";
import { PaginationBar } from "@/shared/components/pagination-bar";

import { RoleSelect } from "./role-select";
import { User } from "./user";
import { UserSkeleton } from "./user-skeleton";

interface Props extends Partial<GetUsersDto> {
  isLoading?: boolean;
}

export const UsersCard = ({ totalPages, users, isLoading }: Props) => {
  const { register, setValue, watch } = useFormContext<UserSearchFilters>();
  const [role, setRole] = useState<UserRole | "ALL">("ALL");

  useEffect(() => {
    setValue("role", role);
  }, [role, setValue]);

  const page = watch("page");

  const handleNextClick = useCallback(() => {
    setValue("page", page + 1);
  }, [setValue, page]);

  const handlePreviousClick = useCallback(() => {
    if (page > 0) {
      setValue("page", page - 1);
    }
  }, [setValue, page]);

  const handlePageSelect = useCallback(
    (page: number) => {
      setValue("page", page);
    },
    [setValue],
  );

  return (
    <Card className="w-3/4 max-w-5xl mx-auto my-6">
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Explore and edit users from shop</CardDescription>
        <div className="flex gap-x-5">
          <Input placeholder="Search by username" {...register("username")} />
          <RoleSelect role={role} setRole={setRole} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        {isLoading &&
          Array.from({ length: 5 })
            .fill(0)
            .map((_, index) => <UserSkeleton key={index} />)}
        {users &&
          users.length > 0 &&
          users.map((user) => <User key={user.id} user={user} />)}
      </CardContent>
      <CardFooter className="flex justify-between">
        {isLoading ? undefined : (
          <PaginationBar
            currentPage={page}
            totalPages={totalPages ?? 1}
            nextClick={handleNextClick}
            previousClick={handlePreviousClick}
            setPage={handlePageSelect}
          />
        )}
      </CardFooter>
    </Card>
  );
};
