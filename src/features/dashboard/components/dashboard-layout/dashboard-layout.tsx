import React, { type FC, type PropsWithChildren } from "react";

import { cn } from "@/shared/utils";

import { Aside, type AsideItem } from "./aside";
import { Navbar } from "./navbar";

interface DashboardLayoutProps extends PropsWithChildren {
  asideItems?: AsideItem[];
  navbar: {
    backLink: {
      label: string;
      href: string;
    };
    pageTitle: string;
  };
  classNames?: {
    root?: string;
    container?: string;
  };
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  asideItems,
  navbar,
  classNames,
}) => {
  return (
    <main className={cn("flex flex-col min-h-screen", classNames?.root)}>
      <Navbar backLink={navbar.backLink} pageTitle={navbar.pageTitle} />
      <div
        className={cn("container flex gap-32 pb-6 grow", classNames?.container)}
      >
        {asideItems && asideItems.length > 0 && <Aside items={asideItems} />}
        {children}
      </div>
    </main>
  );
};
