import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import router from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSignIn } from "@/libs/next-auth";
import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { Button } from "@/shared/components/button";
import { InputWithLabel } from "@/shared/components/input-with-label";
import { Spinner } from "@/shared/components/spinner";
import { toast } from "@/shared/components/use-toast";

const SignInFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be at least 3 characters")
    .max(20, "Username should be 20 characters maximum"),
  password: z.string().min(5, "Password should be at least 5 characters"),
});

export type SignInFormData = z.infer<typeof SignInFormSchema>;

export const SignInForm = () => {
  const { mutate, isLoading } = useSignIn({
    async onSuccess() {
      await router.push("/");
      toast({
        title: TOAST_SUCCESS_TITLE,
        description: "You have successfuly signed in.",
      });
    },
    onError(error: Error) {
      toast({
        title: TOAST_ERROR_TITLE,
        description: error?.message,
        variant: "destructive",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    mode: "onBlur",
    resolver: zodResolver(SignInFormSchema),
  });

  function onSubmit(data: SignInFormData) {
    mutate(data);
  }
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)} // eslint-disable-line @typescript-eslint/no-misused-promises
    >
      <InputWithLabel
        name="username"
        labelContent="Username"
        input={{ ...register("username"), placeholder: "johndoe3" }}
        error={<ErrorMessage errors={errors} name="username" />}
      />

      <InputWithLabel
        name="password"
        labelContent="Password"
        input={{
          ...register("password"),
          type: "password",
          placeholder: "●●●●●●●●",
        }}
        error={<ErrorMessage errors={errors} name="password" />}
      />

      <Button className="mt-2">
        {isLoading ? <Spinner className="h-6 w-6" /> : "Sign in"}
      </Button>
    </form>
  );
};
