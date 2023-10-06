import { Plus } from "lucide-react";
import { useState } from "react";

import {
  CreateChapterForm,
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
        childrenClassName="flex flex-col gap-6"
      >
        {showCreateChapterForm && (
          <CreateChapterForm
            setShowCreateChapterForm={setShowCreateChapterForm}
          />
        )}

        {!showCreateChapterForm && (
          <Button
            onClick={() => setShowCreateChapterForm(true)}
            variant="secondary"
            className="w-fit"
          >
            <Plus size={16} className="mr-2" /> Chapter
          </Button>
        )}
      </ManageCard>
    </ManageCourseLayout>
  );
}
