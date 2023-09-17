import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

import { signUp } from "@/libs/auth";
import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { ApiError } from "@/libs/utils";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { InputWithLabel } from "@/shared/ui/input-with-label";
import { Spinner } from "@/shared/ui/spinner";
import { toast } from "@/shared/ui/use-toast";
import { ShopLayout } from "@/shop";

const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(20, "Username must contain 20 characters maximum"),
  email: z.string().email(),
  password: z.string().min(5, "Password must contain at least 5 characters"),
});

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

const SignUpPage = () => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation(signUp, {
    onSuccess: () => {
      toast({
        title: TOAST_SUCCESS_TITLE,
        description:
          "You have successfully signed up! Please confirm your email, then you can login.",
      });
      void router.push("/auth");
    },
    onError: (error: ApiError) => {
      toast({
        title: TOAST_ERROR_TITLE,
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: "onBlur",
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = (formData: SignUpFormData) => {
    mutate(formData);
  };

  return (
    <ShopLayout>
      <Card className="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your details below to create a new account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputWithLabel
              name="username"
              labelContent="Username"
              input={{ ...register("username") }}
              error={<ErrorMessage errors={errors} name="username" />}
            />

            <InputWithLabel
              name="email"
              labelContent="Email"
              input={{ ...register("email"), type: "email" }}
              error={<ErrorMessage errors={errors} name="email" />}
            />
            <InputWithLabel
              name="password"
              labelContent="Password"
              input={{ ...register("password"), type: "password" }}
              error={<ErrorMessage errors={errors} name="password" />}
            />

            <Button className="mt-2">
              {isLoading ? <Spinner className="h-6 w-6" /> : "Sign up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </ShopLayout>
  );
};

export default SignUpPage;
