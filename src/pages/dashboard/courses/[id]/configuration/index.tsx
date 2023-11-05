import { ConfigurationForm, ManageCourseLayout } from "@/features/course";
import { ManageCard } from "@/features/dashboard";
import { UserRole } from "@/features/user";
import { withRoleAuthorization } from "@/shared/utils";

export function CourseConfigurationDashboardPage() {
  return (
    <ManageCourseLayout>
      <ManageCard
        title="Configuration"
        description="Set course name, description, thumbnail and instructor"
      >
        <ConfigurationForm />
      </ManageCard>
    </ManageCourseLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(CourseConfigurationDashboardPage, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
