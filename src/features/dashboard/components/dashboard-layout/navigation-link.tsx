import Link, { type LinkProps } from "next/link";
import { type FC, type PropsWithChildren } from "react";

import { buttonVariants } from "@/shared/components/button";
import { cn } from "@/shared/utils";

export type NavigationLinkProps = LinkProps & PropsWithChildren;

export const NavigationLink: FC<NavigationLinkProps> = ({
  children,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      className={cn(buttonVariants(), "bg-secondary hover:bg-background")}
    >
      {children}
    </Link>
  );
};
