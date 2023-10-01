import Link from "next/link";
import { useState } from "react";

import { SignUpForm } from "@/features/auth";
import { ShopLayout } from "@/features/shop";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { withNoRoleAuthorization } from "@/shared/utils";

const SignUpPage = () => {
  const [step, setStep] = useState(0);

  return (
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "flex flex-col items-center gap-4 justify-center grow py-6",
      }}
    >
      <div className="flex flex-col">
        <Card className="w-96 flex flex-wrap">
          <CardHeader className="w-full">
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              {step === 0 && "Enter your personal details."}
              {step === 1 && "Enter your address details."}
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <SignUpForm step={step} setStep={setStep} />
          </CardContent>
        </Card>
      </div>
      <p className="text-muted-foreground text-sm text-center mt-4">
        Already have an account?{" "}
        <Link className="text-primary font-semibold" href="/auth">
          Sign in
        </Link>
      </p>
    </ShopLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withNoRoleAuthorization(SignUpPage, {
  redirectDestination: "/",
});
