import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Course, useCreateCourse, useGetCourses } from "@/features/course";
import { DashboardLayout } from "@/features/dashboard";
import { UserRole } from "@/features/user";
import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PaginationBar,
  Skeleton,
} from "@/shared/components";
import { Button } from "@/shared/components/button";
import { Spinner } from "@/shared/components/spinner";
import { toast } from "@/shared/components/use-toast";
import { withRoleAuthorization } from "@/shared/utils";

const SearchFiltersSchema = z.object({
  courseName: z.string(),
  page: z.number(),
});

type SearchFiltersData = z.infer<typeof SearchFiltersSchema>;

function CoursesDashboardPage() {
  const { setValue, watch } = useForm<SearchFiltersData>({
    resolver: zodResolver(SearchFiltersSchema),
    defaultValues: {
      page: 0,
    },
  });

  const page = watch("page");

  const { data, isLoading: areCoursesLoading } = useGetCourses(page, {});
  const router = useRouter();

  const courses = data?.courses ?? [];
  const totalPages = data?.totalPages ?? -1;

  const showCourses = courses && !areCoursesLoading;

  const handleNextClick = useCallback(() => {
    setValue("page", page + 1);
  }, [setValue, page]);

  const handlePreviousClick = useCallback(() => {
    if (page > 0) {
      setValue("page", page - 1);
    }
  }, [setValue, page]);

  const handlePageSelect = useCallback(
    (page: number) => {
      setValue("page", page);
    },
    [setValue],
  );

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
          {areCoursesLoading &&
            // eslint-disable-next-line unicorn/new-for-builtins
            Array(4)
              .fill(1)
              .map((_, index) => (
                <Skeleton key={index} className="w-full h-24" />
              ))}

          {showCourses &&
            courses.map((course) => <Course key={course.id} course={course} />)}

          {areCoursesLoading ? undefined : (
            <PaginationBar
              currentPage={page}
              totalPages={totalPages}
              nextClick={handleNextClick}
              previousClick={handlePreviousClick}
              setPage={handlePageSelect}
            />
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(CoursesDashboardPage, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
