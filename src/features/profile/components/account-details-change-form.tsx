import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUser } from "@/features/user";
import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { InputWithLabel } from "@/shared/components/input-with-label";
import { Skeleton } from "@/shared/components/skeleton";
import { Spinner } from "@/shared/components/spinner";

import { useUpdateUser } from "../api";

const AccountDetailsFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(20, "Username must contain 20 characters maximum"),
  email: z.string().email("Invalid email address"),
});

export type AccountDetailsFormData = z.infer<typeof AccountDetailsFormSchema>;

export const AccountDetailsChangeForm = () => {
  const { accessToken, userData } = useUser();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<AccountDetailsFormData>({
    mode: "onBlur",
    resolver: zodResolver(AccountDetailsFormSchema),
    defaultValues: { email: userData?.email, username: userData?.username },
  });

  const { mutate, isLoading } = useUpdateUser();

  useEffect(() => {
    reset({ email: userData?.email, username: userData?.username });
  }, [userData?.email, userData?.username, reset]);

  const onSubmit = (formData: AccountDetailsFormData) => {
    if (userData?.id) {
      mutate({
        updateUserDto: formData,
        accessToken,
        userId: userData.id,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you are done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-2 flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)} // eslint-disable-line @typescript-eslint/no-misused-promises
        >
          {userData?.username ? (
            <InputWithLabel
              name="username"
              labelContent="Username"
              input={{
                ...register("username"),
              }}
              error={<ErrorMessage errors={errors} name="username" />}
            />
          ) : (
            <Skeleton className="h-10 w-96" />
          )}

          {userData?.email ? (
            <InputWithLabel
              name="email"
              labelContent="Email"
              input={{
                type: "email",
                ...register("email"),
              }}
              error={<ErrorMessage errors={errors} name="email" />}
            />
          ) : (
            <Skeleton className="h-10 w-96" />
          )}
          <Button disabled={!isValid} type="submit" className="max-w-fit">
            {isLoading ? <Spinner className="h-6 w-6" /> : "Save changes"}
          </Button>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
