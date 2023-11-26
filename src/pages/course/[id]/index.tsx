import { useRouter } from "next/router";

import { CourseChapters, CourseDetails, useGetCourse } from "@/features/course";
import { ShopLayout } from "@/features/shop";
import { Spinner } from "@/shared/components";

export default function CoursePage() {
  const { query } = useRouter();
  const courseId = query?.id ? Number.parseInt(query.id as string) : -1;
  const { data: course, isLoading } = useGetCourse(courseId, {
    enabled: courseId > 0,
  });

  return (
    <ShopLayout>
      {isLoading && <Spinner />}
      {course && (
        <div className="grid gap-6 max-w-6xl px-4 mx-auto py-6 grid-cols-1 md:grid-cols-3">
          <CourseDetails course={course} />
          <CourseChapters course={course} />
        </div>
      )}
    </ShopLayout>
  );
}
