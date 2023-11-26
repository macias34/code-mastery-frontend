import { useRouter } from "next/router";
import { useEffect } from "react";

import {
  CourseChapters,
  CourseChaptersSkeleton,
  LessonDetails,
  useGetCourse,
  useGetLesson,
} from "@/features/course";
import { ShopLayout } from "@/features/shop";
import { useUser } from "@/features/user";
import { TOAST_ERROR_TITLE } from "@/libs/toast";
import { Skeleton, toast } from "@/shared/components";
import { withRoleAuthorization } from "@/shared/utils";

function LessonPage() {
  const { query, push } = useRouter();
  const { userData } = useUser();

  const lessonId = query?.lessonId
    ? Number.parseInt(query.lessonId as string)
    : -1;
  const courseId = query?.id ? Number.parseInt(query.id as string) : -1;
  const { data: course, isLoading: isCourseLoading } = useGetCourse(courseId, {
    enabled: courseId > 0,
  });

  const { data: lesson, isLoading: isLessonLoading } = useGetLesson(lessonId);

  const hasBoughtCourse = userData?.courses.some(
    (userCourse) => userCourse.id === courseId,
  );

  useEffect(() => {
    if (!hasBoughtCourse) {
      void push(`/course/${courseId}`);
      toast({
        title: TOAST_ERROR_TITLE,
        description: "You have not bought this course",
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [hasBoughtCourse, courseId, push]);

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

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(LessonPage, {
  userRolesToExclude: [],
  redirectDestination: "/courses",
});
