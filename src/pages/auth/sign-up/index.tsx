import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { useState } from "react";

import { SignUpForm } from "@/features/auth";
import { ShopLayout } from "@/features/shop";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";

const SignUpPage = () => {
  const [step, setStep] = useState(0);

  return (
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "flex flex-col items-center gap-4 justify-center grow",
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
      <p className="text-muted-foreground text-sm text-center">
        Already have an account?{" "}
        <Link className="text-primary font-semibold" href="/auth">
          Sign in
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

export default SignUpPage;
