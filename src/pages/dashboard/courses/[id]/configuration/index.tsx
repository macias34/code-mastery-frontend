import { ManageCard, ManageCourseLayout } from "@/features/course";
import { InputWithLabel } from "@/shared/components/input-with-label";

export default function CourseConfigurationDashboardPage() {
  return (
    <ManageCourseLayout>
      <ManageCard
        title="Configuration"
        description="Set course name, description, thumbnail and lecturer"
        childrenClassName=""
      >
        <InputWithLabel
          label={{ size: "lg" }}
          labelContent="Course name"
          name="courseName"
        />
      </ManageCard>
    </ManageCourseLayout>
  );
}
