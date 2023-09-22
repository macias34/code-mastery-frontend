import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

import { signUp } from "@/features/auth";
import { ShopLayout } from "@/features/shop";
import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { InputWithLabel } from "@/shared/components/input-with-label";
import { Spinner } from "@/shared/components/spinner";
import { toast } from "@/shared/components/use-toast";
import { ApiError } from "@/shared/utils";

const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(20, "Username must contain 20 characters maximum"),
  email: z.string().email(),
  password: z.string().min(5, "Password must contain at least 5 characters"),
  firstName: z.string().min(3, "First Name must contain at least 3 characters"),
  lastName: z.string().min(3, "Last Name must contain at least 3 characters"),
  postalCode: z
    .string()
    .min(2, "Postal code must contain at least 2 characters"),
  city: z.string().min(2, "City must contain at least 2 characters"),
  street: z.string().min(2, "Street must contain at least 2 characters"),
  phoneNumber: z
    .string()
    .min(2, "Phone number must contain at least 2 characters"),
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
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "flex flex-col items-center gap-6 justify-center grow",
      }}
    >
      <Card className="w-96 my-4">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your details below to create a new account.
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
            <InputWithLabel
              name="firstName"
              labelContent="First name"
              input={{ ...register("firstName"), type: "text" }}
              error={<ErrorMessage errors={errors} name="firstName" />}
            />
            <InputWithLabel
              name="lastName"
              labelContent="Last name"
              input={{ ...register("lastName"), type: "text" }}
              error={<ErrorMessage errors={errors} name="lastName" />}
            />
            <InputWithLabel
              name="postalCode"
              labelContent="Postal code"
              input={{ ...register("postalCode"), type: "text" }}
              error={<ErrorMessage errors={errors} name="postalCode" />}
            />

            <InputWithLabel
              name="city"
              labelContent="City"
              input={{ ...register("city"), type: "text" }}
              error={<ErrorMessage errors={errors} name="city" />}
            />

            <InputWithLabel
              name="street"
              labelContent="Street"
              input={{ ...register("street"), type: "text" }}
              error={<ErrorMessage errors={errors} name="street" />}
            />

            <InputWithLabel
              name="phoneNumber"
              labelContent="Phone Number"
              input={{ ...register("phoneNumber"), type: "text" }}
              error={<ErrorMessage errors={errors} name="phoneNumber" />}
            />

            <Button className="mt-2">
              {isLoading ? <Spinner className="h-6 w-6" /> : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <p className="text-muted-foreground text-sm text-center p-4">
          Already have an account?{" "}
          <Link className="text-primary font-semibold" href="/auth">
            Sign in
          </Link>
        </p>
      </Card>
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

export default SignUpPage;
