import {
  ChapterList,
  CreateChapterDialog,
  ManageCourseLayout,
} from "@/features/course";
import { ManageCard } from "@/features/dashboard";
import { UserRole } from "@/features/user";
import { withRoleAuthorization } from "@/shared/utils";

export function CourseContentDashboardPage() {
  return (
    <ManageCourseLayout>
      <ManageCard
        title="Content"
        description="Control content of your course"
        classNames={{
          children: "flex flex-col",
        }}
      >
        <ChapterList />
        <CreateChapterDialog />
      </ManageCard>
    </ManageCourseLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(CourseContentDashboardPage, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
