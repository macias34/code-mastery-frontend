import {
  ChapterList,
  CreateChapterDialog,
  DashboardCourseLayout,
  ManageCard,
} from "@/features/course";

export default function CourseContentDashboardPage() {
  return (
    <DashboardCourseLayout>
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
    </DashboardCourseLayout>
  );
}
