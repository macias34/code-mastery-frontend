import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
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

import { authOptions } from "../api/auth/[...nextauth]";

const SignInFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(20, "Username must contain 20 characters maximum"),
  password: z.string().min(5, "Password must contain at least 5 characters"),
});

type SignInFormData = z.infer<typeof SignInFormSchema>;

const SignInPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    mode: "onBlur",
    resolver: zodResolver(SignInFormSchema),
  });

  async function onSubmit(data: SignInFormData) {
    setIsLoading(true);
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.ok) {
      await router.push("/");

      toast({
        title: TOAST_SUCCESS_TITLE,
        description: "You have successfuly signed in.",
      });
    }

    if (res?.error) {
      toast({
        title: TOAST_ERROR_TITLE,
        description: "The credentials you provided are incorrect.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "flex flex-col items-center gap-6 justify-center grow",
      }}
    >
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your details below to start exploring courses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)} // eslint-disable-line @typescript-eslint/no-misused-promises
          >
            <InputWithLabel
              name="username"
              labelContent="Username"
              input={{ ...register("username") }}
              error={<ErrorMessage errors={errors} name="username" />}
            />

            <InputWithLabel
              name="password"
              labelContent="Password"
              input={{ ...register("password"), type: "password" }}
              error={<ErrorMessage errors={errors} name="password" />}
            />

            <Button className="mt-2">
              {isLoading ? <Spinner className="h-6 w-6" /> : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-sm">
        No account?{" "}
        <Link className="text-primary font-semibold" href="/auth/sign-up">
          Sign up
        </Link>
      </p>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  }

  return {
    props: {},
  };
};

export default SignInPage;
