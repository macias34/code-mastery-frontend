import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useUpdateUser } from "@/features/profile";
import { ButtonWithLoader, InputWithLabel, Label } from "@/shared/components";

import { useGetUser } from "../../../api";
import { useUser } from "../../../hooks";
import { type UserDto, UserRole } from "../../../types";
import { type ChangeUserData, ChangeUserDataSchema } from "../../../utils";
import { RoleSelect } from "../role-select";
import { FormSkeleton } from "./form-skeleton";

interface Props {
  userId: number;
}

export const EditUserForm = ({ userId }: Props) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<ChangeUserData>({
    resolver: zodResolver(ChangeUserDataSchema),
  });

  const { isLoading, mutate } = useUpdateUser();

  const { accessToken } = useUser();
  const { data: userData, isLoading: isUserDataLoading } = useGetUser({
    userId,
  });

  const [role, setRole] = useState<UserRole | "ALL">(
    userData?.role || UserRole.USER,
  );

  const setFieldsToDefault = useCallback(
    (userData: UserDto | undefined) => {
      if (userData) {
        setValue("username", userData.username);
        setValue("note", userData.note);
        setRole(userData.role);
      }
    },
    [setValue],
  );

  useEffect(() => {
    setFieldsToDefault(userData);
  }, [userData, setFieldsToDefault]);

  useEffect(() => {
    setValue("role", role as UserRole);
  }, [role, setValue]);

  function onSubmit(data: ChangeUserData) {
    void mutate({
      userId,
      updateUserDto: data,
      accessToken,
    });
  }

  return (
    <form
      className="flex flex-col justify-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isUserDataLoading && !userData ? (
        <FormSkeleton />
      ) : (
        <>
          <InputWithLabel
            name="username"
            labelContent="Username"
            input={{
              ...register("username"),
            }}
            error={<ErrorMessage errors={errors} name="username" />}
          />

          <InputWithLabel
            name="note"
            labelContent="Note"
            input={{
              ...register("note"),
            }}
            error={<ErrorMessage errors={errors} name="note" />}
          />

          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role</Label>
            <RoleSelect
              role={role}
              setRole={setRole}
              trigger={{ className: "w-full" }}
            />
          </div>
        </>
      )}

      <ButtonWithLoader
        className="w-fit self-end"
        disabled={!isValid}
        isLoading={isLoading}
      >
        Save
      </ButtonWithLoader>
    </form>
  );
};
