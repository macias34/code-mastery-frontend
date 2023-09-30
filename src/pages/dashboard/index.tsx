import { useSession } from "next-auth/react";

import { DashboardLayout } from "@/features/dashboard";
import { UserRole } from "@/features/user";
import { withRoleAuthorization } from "@/shared/utils";

function Dashboard() {
  const session = useSession();
  console.log(session);

  return <DashboardLayout></DashboardLayout>;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(Dashboard, {
  userRoleToExclude: UserRole.USER,
  redirectDestination: "/",
});
