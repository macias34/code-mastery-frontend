import { useRouter } from "next/router";

import {
  CourseChapters,
  CourseChaptersSkeleton,
  LessonDetails,
  useGetCourse,
  useGetLesson,
} from "@/features/course";
import { ShopLayout } from "@/features/shop";
import { Skeleton } from "@/shared/components";

export default function LessonPage() {
  const { query } = useRouter();

  const lessonId = query?.lessonId
    ? Number.parseInt(query.lessonId as string)
    : -1;
  const courseId = query?.id ? Number.parseInt(query.id as string) : -1;
  const { data: course, isLoading: isCourseLoading } = useGetCourse(courseId, {
    enabled: courseId > 0,
  });

  const { data: lesson, isLoading: isLessonLoading } = useGetLesson(lessonId);

  const isLoading = isLessonLoading || isCourseLoading;

  return (
    <ShopLayout>
      <div className="flex gap-6 max-w-8xl px-4 mx-auto py-6 ">
        {isLoading && (
          <>
            <Skeleton className="w-full h-[80vh]" />
            <CourseChaptersSkeleton />
          </>
        )}
        {course && lesson && (
          <>
            <LessonDetails lesson={lesson} />
            <CourseChapters course={course} />
          </>
        )}
      </div>
    </ShopLayout>
  );
}
