import React, { type FC, type PropsWithChildren } from "react";

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
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  asideItems,
  navbar,
}) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar backLink={navbar.backLink} pageTitle={navbar.pageTitle} />
      <div className="container flex gap-32 pb-6 max-w-7xl grow">
        {asideItems && asideItems.length > 0 && <Aside items={asideItems} />}
        {children}
      </div>
    </main>
  );
};
