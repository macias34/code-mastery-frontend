import {
  ConfigurationForm,
  ManageCard,
  ManageCourseLayout,
} from "@/features/course";

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
