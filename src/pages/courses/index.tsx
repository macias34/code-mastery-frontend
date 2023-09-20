import { GetServerSideProps } from "next";

import { Course } from "@/course/course";
import { type CourseResponseDto } from "@/libs/course";
import { request } from "@/libs/utils";
import { ShopLayout } from "@/shop";

export default function CoursesPage({
  courseResponse,
}: {
  courseResponse: CourseResponseDto;
}) {
  return (
    <ShopLayout>
      {courseResponse?.courses.length > 0 &&
        courseResponse.courses.map((course) => (
          <Course course={course} key={course.id} />
        ))}
    </ShopLayout>
  );
}

export const getServerSideProps = (async () => {
  const courseResponse = await request<CourseResponseDto>("/course/");
  return { props: { courseResponse } };
}) satisfies GetServerSideProps<{
  courseResponse: CourseResponseDto;
}>;
