import { DashboardLayout } from "@/features/dashboard";
import { PagesCard } from "@/features/information-page/components";
import { UserRole } from "@/features/user";
import { withRoleAuthorization } from "@/shared/utils";

export function PagesDashboard() {
  return (
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/dashboard",
          label: "Go back to dashboard",
        },
        pageTitle: "Pages",
      }}
      classNames={{
        container: "justify-center",
      }}
    >
      <PagesCard />
    </DashboardLayout>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(PagesDashboard, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
