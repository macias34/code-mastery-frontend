import { Plus } from "lucide-react";
import { useState } from "react";

import {
  ChapterForm,
  ChapterList,
  ManageCard,
  ManageCourseLayout,
} from "@/features/course";
import { Button } from "@/shared/components";

export default function CourseContentDashboardPage() {
  const [showCreateChapterForm, setShowCreateChapterForm] =
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
        <ChapterList showCreateChapterForm={showCreateChapterForm} />
        {showCreateChapterForm && (
          <ChapterForm
            variant="create"
            setShowChapterForm={setShowCreateChapterForm}
          />
        )}

        {!showCreateChapterForm && (
          <Button
            onClick={() => setShowCreateChapterForm(true)}
            variant="secondary"
            className="w-fit mt-6"
          >
            <Plus size={16} className="mr-2" /> Chapter
          </Button>
        )}
      </ManageCard>
    </ManageCourseLayout>
  );
}
