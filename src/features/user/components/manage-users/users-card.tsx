import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { ManageCard } from "@/features/dashboard";
import { type GetUsersDto, type UserRole } from "@/features/user";
import { type UserSearchFilters } from "@/pages/dashboard/users";
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
    <ManageCard
      title="Users"
      description="Explore and edit users from shop"
      classNames={{
        children: "flex flex-col min-h-[440px] justify-between",
      }}
    >
      <div className="flex flex-col gap-10">
        <div className="flex gap-x-5">
          <Input placeholder="Search by username" {...register("username")} />
          <RoleSelect role={role} setRole={setRole} displayAllOption />
        </div>
        <div className="flex flex-col gap-6">
          {isLoading &&
            Array.from({ length: 5 })
              .fill(0)
              .map((_, index) => <UserSkeleton key={index} />)}
          {users &&
            users.length > 0 &&
            users.map((user) => <User key={user.id} user={user} />)}
        </div>
      </div>

      {isLoading ? undefined : (
        <PaginationBar
          currentPage={page}
          totalPages={totalPages ?? 1}
          nextClick={handleNextClick}
          previousClick={handlePreviousClick}
          setPage={handlePageSelect}
        />
      )}
    </ManageCard>
  );
};
