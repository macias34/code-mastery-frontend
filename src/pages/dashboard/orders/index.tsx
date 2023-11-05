import React from "react";

import { DashboardLayout } from "@/features/dashboard";
import { UserRole } from "@/features/user";
import { withRoleAuthorization } from "@/shared/utils";

export function OrdersPage() {
  return (
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/dashboard",
          label: "Go back to dashboard",
        },
        pageTitle: "Orders",
      }}
    ></DashboardLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(OrdersPage, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
