import { useRouter } from "next/router";

import {
  CourseChapters,
  CourseChaptersSkeleton,
  CourseDetails,
  useGetCourse,
} from "@/features/course";
import { ShopLayout } from "@/features/shop";
import { Skeleton } from "@/shared/components";

export default function CoursePage() {
  const { query } = useRouter();
  const courseId = query?.id ? Number.parseInt(query.id as string) : -1;
  const { data: course, isLoading } = useGetCourse(courseId, {
    enabled: courseId > 0,
  });

  return (
    <ShopLayout>
      <div className="grid gap-6 max-w-6xl px-4 mx-auto py-6 grid-cols-1 md:grid-cols-3">
        {isLoading && (
          <>
            <Skeleton className="h-[500px] md:col-span-2" />
            <CourseChaptersSkeleton />
          </>
        )}
        {course && (
          <>
            <CourseDetails course={course} />
            <CourseChapters course={course} />
          </>
        )}
      </div>
    </ShopLayout>
  );
}
