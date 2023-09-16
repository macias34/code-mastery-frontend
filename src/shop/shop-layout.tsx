import React, { FC, PropsWithChildren } from "react";

import { cn } from "@/libs/utils/cn";

interface ShopLayoutProps extends PropsWithChildren {
  className?: string;
}

export const ShopLayout: FC<ShopLayoutProps> = ({ children, className }) => {
  return <main className={cn("min-h-screen", className)}>{children}</main>;
};
