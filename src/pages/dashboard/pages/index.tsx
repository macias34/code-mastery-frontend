import { DashboardLayout } from "@/features/dashboard";
import { PagesCard } from "@/features/information-page/components";

export default function PagesDashboard() {
  return (
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/dashboard",
          label: "Go back to dashboard",
        },
        pageTitle: "Pages",
      }}
    >
      <PagesCard />
    </DashboardLayout>
  );
}
