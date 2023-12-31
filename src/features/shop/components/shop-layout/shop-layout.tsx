import React, { type FC, type PropsWithChildren } from "react";

import { cn } from "@/shared/utils/cn";

import { Navbar } from "./navbar";

interface ShopLayoutProps extends PropsWithChildren {
  classNames?: {
    root?: string;
    children?: string;
  };
}

export const ShopLayout: FC<ShopLayoutProps> = ({ children, classNames }) => {
  return (
    <main className={cn("flex flex-col min-h-screen", classNames?.root)}>
      <Navbar />
      <div className={cn(classNames?.children, "py-6 container")}>
        {children}
      </div>
    </main>
  );
};
