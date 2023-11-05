import { useRouter } from "next/router";

import { Course, useCreateCourse, useGetCourses } from "@/features/course";
import { DashboardLayout } from "@/features/dashboard";
import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components";
import { Button } from "@/shared/components/button";
import { Spinner } from "@/shared/components/spinner";
import { toast } from "@/shared/components/use-toast";
import { useState } from "react";

export default function CoursesDashboardPage() {
  const [page] = useState<number>(1);
  const { data } = useGetCourses(page);
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
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/dashboard",
          label: "Go back to dashboard",
        },
        pageTitle: "Courses",
      }}
      classNames={{
        container: "justify-center",
      }}
    >
      <Card className="w-full max-w-5xl my-6 h-fit">
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex flex-col gap-1.5 w-fit">
            <CardTitle className="text-2xl">Courses</CardTitle>
            <CardDescription className="text-base">
              Create and manage courses
            </CardDescription>
          </div>
          <Button onClick={createCourse} className="w-40" size="lg">
            {isLoading ? <Spinner /> : "Create course"}
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          {data && data.courses && data.courses.map(course=> <Course key={course.id} course={course} />)}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
