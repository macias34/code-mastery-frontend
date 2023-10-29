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
    {
      href: "/dashboard/information-pages",
      children: "Information pages",
    },
  ];

  return (
    <ShopLayout>
      <Navigation links={links} />
      {children}
    </ShopLayout>
  );
};
