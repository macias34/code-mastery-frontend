import React from "react";

import { DashboardLayout } from "@/features/dashboard";

export default function OrdersPage() {
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
