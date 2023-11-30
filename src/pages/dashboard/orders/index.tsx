import React from "react";

import { DashboardLayout } from "@/features/dashboard";
import { useGetOrders } from "@/features/order";
import { OrdersTable } from "@/features/order/components";
import { UserRole } from "@/features/user";
import { withRoleAuthorization } from "@/shared/utils";

export function OrdersPage() {
  const { data: orders } = useGetOrders();
  return (
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/dashboard",
          label: "Go back to dashboard",
        },
        pageTitle: "Orders",
      }}
    >
      <OrdersTable orders={orders ?? []} />
    </DashboardLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(OrdersPage, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
