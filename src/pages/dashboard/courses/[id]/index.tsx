import { ManageCourseLayout, useGetPathnameCourse } from "@/features/course";
import { ManageCard } from "@/features/dashboard";
import { UserRole } from "@/features/user";
import { withRoleAuthorization } from "@/shared/utils";

export function CourseDashboardPage() {
  const { data: course } = useGetPathnameCourse();

  return (
    <ManageCourseLayout>
      <ManageCard title="Home" description="Control center for your course">
        {course?.name ?? ""}
      </ManageCard>
    </ManageCourseLayout>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(CourseDashboardPage, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
