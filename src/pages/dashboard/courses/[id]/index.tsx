import { ManageCourseLayout } from "@/features/course";
import { ManageCard } from "@/features/dashboard";

export default function CourseDashboardPage() {
  return (
    <ManageCourseLayout>
      <ManageCard title="Home" description="Control center for your course">
        32 stopnie
      </ManageCard>
    </ManageCourseLayout>
  );
}
