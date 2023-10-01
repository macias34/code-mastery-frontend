import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useResetPassword } from "@/features/auth";
import { InputWithLabel, Spinner } from "@/shared/components/";
import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";

const PasswordResetFormSchema = z
  .object({
    password: z.string().min(5, "Password should be at least 5 characters"),
    confirmPassword: z
      .string()
      .min(5, "Password should be at least 5 characters"),
  })
  .superRefine(({ confirmPassword, password }, context) => {
    if (confirmPassword !== password) {
      context.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type PasswordResetFormData = z.infer<typeof PasswordResetFormSchema>;

export const ResetPasswordForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<PasswordResetFormData>({
    mode: "onBlur",
    resolver: zodResolver(PasswordResetFormSchema),
  });

  const searchParameters = useSearchParams();
  const { mutate, isLoading } = useResetPassword();

  const onSubmit = (formData: PasswordResetFormData) => {
    mutate({
      newPassword: formData.password,
      token: searchParameters.get("token") ?? "",
    });
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Reset your password here. After saving, you will be able to sign in
          with new password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex flex-col gap-4 ">
        <form
          className="space-y-2 flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmit)} // eslint-disable-line @typescript-eslint/no-misused-promises
        >
          <InputWithLabel
            name="password"
            labelContent="New password"
            input={{
              type: "password",
              ...register("password"),
            }}
            error={<ErrorMessage errors={errors} name="password" />}
          />
          <InputWithLabel
            name="confirmPassword"
            labelContent="Confirm new password"
            input={{
              type: "password",
              ...register("confirmPassword"),
            }}
            error={<ErrorMessage errors={errors} name="confirmPassword" />}
          />
          <Button disabled={!isValid} type="submit" className=" w-36">
            {isLoading ? <Spinner className="h-6 w-6" /> : "Save password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
