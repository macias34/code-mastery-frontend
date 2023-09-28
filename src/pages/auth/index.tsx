import { type GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { SignInForm } from "@/features/auth";
import { ResetPasswordDialog } from "@/features/auth/components/reset-password-dialog";
import { ShopLayout } from "@/features/shop";
import { TOAST_SUCCESS_TITLE } from "@/libs/toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { toast } from "@/shared/components/use-toast";

import { authOptions } from "../api/auth/[...nextauth]";

interface SignInPageProps {
  emailConfirmed: boolean;
}

const SignInPage = ({ emailConfirmed }: SignInPageProps) => {
  const router = useRouter();

  if (emailConfirmed) {
    toast({
      title: TOAST_SUCCESS_TITLE,
      description: "Your email has been confirmed. You can sign in now.",
    });
  }

  useEffect(() => {
    if (emailConfirmed) {
      void router.replace("/auth");
    }
  }, []);

  return (
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "flex flex-col items-center gap-4 justify-center grow py-6",
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
      <ResetPasswordDialog />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  }

  const emailConfirmed = (query.emailConfirmed as string | undefined) === "";

  return {
    props: {
      emailConfirmed,
    },
  };
};

export default SignInPage;
