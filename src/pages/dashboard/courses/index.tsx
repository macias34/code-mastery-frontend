import { useRouter } from "next/router";

import { DashboardLayout, useCreateCourse } from "@/features/dashboard";
import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { Button } from "@/shared/components/button";
import { Spinner } from "@/shared/components/spinner";
import { toast } from "@/shared/components/use-toast";

export default function CoursesDashboardPage() {
  const router = useRouter();

  const { mutate, isLoading } = useCreateCourse({
    onSuccess(course) {
      const { id } = course;
      const createdCourseUrl = `/dashboard/courses/${id.toString()}`;

      toast({
        title: TOAST_SUCCESS_TITLE,
        description: "Successfuly created course.",
      });
      void router.push(createdCourseUrl);
    },
    onError(error) {
      toast({
        title: TOAST_ERROR_TITLE,
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createCourse = () => {
    mutate();
  };

  return (
    <DashboardLayout>
      <Button onClick={createCourse} className="w-40" size="lg">
        {isLoading ? <Spinner /> : "Create course"}
      </Button>
    </DashboardLayout>
  );
}
