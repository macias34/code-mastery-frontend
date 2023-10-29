import {
  ChapterList,
  CreateChapterDialog,
  ManageCard,
  ManageCourseLayout,
} from "@/features/course";

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
