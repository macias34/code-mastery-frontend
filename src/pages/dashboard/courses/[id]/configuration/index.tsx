import {
  ConfigurationForm,
  DashboardCourseLayout,
  ManageCard,
} from "@/features/course";

export default function CourseConfigurationDashboardPage() {
  return (
    <DashboardCourseLayout>
      <ManageCard
        title="Configuration"
        description="Set course name, description, thumbnail and instructor"
      >
        <ConfigurationForm />
      </ManageCard>
    </DashboardCourseLayout>
  );
}
