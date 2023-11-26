import { useRouter } from "next/router";

import {
  CourseChapters,
  LessonDetails,
  useGetCourse,
  useGetLesson,
} from "@/features/course";
import { ShopLayout } from "@/features/shop";
import { Spinner } from "@/shared/components";

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
      {isLoading && <Spinner />}
      {course && lesson && (
        <div className="flex gap-6 max-w-8xl px-4 mx-auto py-6 ">
          <LessonDetails lesson={lesson} />
          <CourseChapters course={course} />
        </div>
      )}
    </ShopLayout>
  );
}
