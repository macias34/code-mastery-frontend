import Link, { type LinkProps } from "next/link";
import { type FC, type PropsWithChildren } from "react";

import { buttonVariants } from "@/shared/components/button";
import { cn } from "@/shared/utils";

export type NavigationItem = LinkProps & PropsWithChildren;
interface NavigationLinkProps extends NavigationItem {
  pathname: string;
}

export const NavigationLink: FC<NavigationLinkProps> = ({
  children,
  pathname,
  ...rest
}) => {
  const isOnCurrentPathname = pathname === rest.href;

  return (
    <Link
      {...rest}
      className={cn(buttonVariants(), "bg-secondary hover:bg-background", {
        "bg-background": isOnCurrentPathname,
      })}
    >
      {children}
    </Link>
  );
};
