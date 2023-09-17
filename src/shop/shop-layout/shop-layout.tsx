import React, { FC, PropsWithChildren } from "react";

import { cn } from "@/libs/utils/cn";

import { Navbar } from "./navbar";

interface ShopLayoutProps extends PropsWithChildren {
  className?: string;
}

export const ShopLayout: FC<ShopLayoutProps> = ({ children, className }) => {
  return (
    <main className={cn("min-h-screen", className)}>
      <Navbar />
      {children}
    </main>
  );
};
