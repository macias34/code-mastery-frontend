import { useState } from "react";

import {
  ChapterDialog,
  ChapterFormVariant,
  ChapterList,
  ManageCard,
  ManageCourseLayout,
} from "@/features/course";

export default function CourseContentDashboardPage() {
  const [showCreateChapterDialog, setShowCreateChapterDialog] =
    useState<boolean>(false);

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
        <ChapterDialog
          variant={ChapterFormVariant.CREATE}
          showChapterDialog={showCreateChapterDialog}
          setShowChapterDialog={setShowCreateChapterDialog}
        />
      </ManageCard>
    </ManageCourseLayout>
  );
}
