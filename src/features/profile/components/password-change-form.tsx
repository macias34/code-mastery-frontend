import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const PasswordChangeFormSchema = z.object({
  oldPassword: z.string().min(5, "Password must contain at least 5 characters"),
  newPassword: z.string().min(5, "Password must contain at least 5 characters"),
});

export type PasswordChangeFormData = z.infer<typeof PasswordChangeFormSchema>;

export const PasswordChangeForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<PasswordChangeFormData>({
    mode: "onBlur",
    resolver: zodResolver(PasswordChangeFormSchema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you will be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex flex-col gap-4 w-full">
        <InputWithLabel
          name="oldPassword"
          labelContent="Current Password"
          input={{
            type: "password",
            ...register("oldPassword"),
          }}
          error={<ErrorMessage errors={errors} name="oldPassword" />}
        />
        <InputWithLabel
          name="newPassword"
          labelContent="New Password"
          input={{
            type: "password",
            ...register("newPassword"),
          }}
          error={<ErrorMessage errors={errors} name="newPassword" />}
        />
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};
