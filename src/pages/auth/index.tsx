import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { SignInForm } from "@/features/auth";
import { ShopLayout } from "@/features/shop";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";

import { authOptions } from "../api/auth/[...nextauth]";

const SignInPage = () => {
  return (
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "flex flex-col items-center gap-4 justify-center grow",
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
          <SignInForm />
        </CardContent>
      </Card>
      <p className="text-muted-foreground text-sm text-center p-4">
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
