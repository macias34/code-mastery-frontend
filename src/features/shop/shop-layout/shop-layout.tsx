import React, { FC, PropsWithChildren } from "react";

import { cn } from "@/utils/cn";

import { Navbar } from "./navbar";

interface ShopLayoutProps extends PropsWithChildren {
  classNames?: {
    root?: string;
    children?: string;
  };
}

export const ShopLayout: FC<ShopLayoutProps> = ({ children, classNames }) => {
  return (
    <main className={cn("flex flex-col", classNames?.root)}>
      <Navbar />
      <div className={cn(classNames?.children)}>{children}</div>
    </main>
  );
};
