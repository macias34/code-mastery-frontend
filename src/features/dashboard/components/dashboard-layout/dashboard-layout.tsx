import { type FC, type PropsWithChildren } from "react";

import { ShopLayout } from "@/features/shop";

import { Navigation } from "./navigation";
import { type NavigationItem } from "./navigation-link";

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const links: NavigationItem[] = [
    {
      href: "/dashboard",
      children: "Dashboard",
    },
    {
      href: "/dashboard/courses",
      children: "Courses",
    },
    {
      href: "/dashboard/orders",
      children: "Orders",
    },
    {
      href: "/dashboard/users",
      children: "Users",
    },
  ];

  return (
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "grow flex",
      }}
    >
      <Navigation links={links} />
      {children}
    </ShopLayout>
  );
};
