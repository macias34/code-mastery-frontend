import { ConfigurationForm, ManageCourseLayout } from "@/features/course";
import { ManageCard } from "@/features/dashboard";

export default function CourseConfigurationDashboardPage() {
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
