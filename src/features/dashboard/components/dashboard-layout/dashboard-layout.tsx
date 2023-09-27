import { type FC, type PropsWithChildren } from "react";

import { ShopLayout } from "@/features/shop";

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return <ShopLayout>{children}</ShopLayout>;
};
