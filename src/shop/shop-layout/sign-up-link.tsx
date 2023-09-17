import Link from "next/link";
import React from "react";

import { cn } from "@/libs/utils";
import { buttonVariants } from "@/shared/ui/button";

export const SignUpLink = () => {
  return (
    <Link
      className={cn(
        buttonVariants({
          size: "lg",
          className: "font-semibold ml-4",
        }),
      )}
      href="/auth/sign-up"
    >
      Sign up
    </Link>
  );
};
