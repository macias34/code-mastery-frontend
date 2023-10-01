import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { SignInForm } from "@/features/auth";
import { ShopLayout } from "@/features/shop";
import { TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { withNoRoleAuthorization } from "@/shared/utils";

const SignInPage = () => {
  const { replace } = useRouter();
  const searchParameters = useSearchParams();
  const emailConfirmed = searchParameters.get("emailConfirmed");

  if (emailConfirmed != null) {
    toast({
      title: TOAST_SUCCESS_TITLE,
      description: "Your email has been confirmed. You can sign in now.",
    });
  }

  useEffect(() => {
    if (emailConfirmed != null) {
      void replace("/auth");
    }
  }, [emailConfirmed, replace]);

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
      <p className="text-muted-foreground text-sm text-center mt-4">
        No account?{" "}
        <Link className="text-primary font-semibold" href="/auth/sign-up">
          Sign up
        </Link>
      </p>
    </ShopLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withNoRoleAuthorization(SignInPage, {
  redirectDestination: "/",
});
