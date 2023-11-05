import {
  ChapterList,
  CreateChapterDialog,
  ManageCourseLayout,
} from "@/features/course";
import { ManageCard } from "@/features/dashboard";

export default function CourseContentDashboardPage() {
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
