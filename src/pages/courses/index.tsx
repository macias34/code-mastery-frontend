import { type GetServerSideProps } from "next";

import { Course } from "@/course/course";
import { FilterBar } from "@/course/filter-bart/filter-bar";
import { type CourseResponseDto } from "@/course/types";
import { request } from "@/libs/utils";
import { ShopLayout } from "@/shop";

export default function CoursesPage({
  courseResponse,
}: {
  courseResponse: CourseResponseDto;
}) {
  const { courses } = courseResponse;

  if (courses.length === 0) {
    return (
      <ShopLayout>
        <div className="flex justify-center gap-5 mt-10">
          <p>Brak kursów</p>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <FilterBar />
      <div className="w-11/12 max-w-6xl mx-auto mt-10 ">
        <div className=" flex justify-center gap-5 mt-10 flex-wrap">
          {courseResponse.courses.map((course) => (
            <Course course={course} key={course.id} />
          ))}
        </div>
      </div>
    </ShopLayout>
  );
}

export const getServerSideProps = (async () => {
  try {
    const courseResponse = await request<CourseResponseDto>("/course/");
    return { props: { courseResponse } };
  } catch (e) {
    return {
      props: {
        courseResponse: {
          courses: [],
          currentPage: 0,
          totalPages: 0,
          totalElements: 0,
        },
      },
    };
  }
}) satisfies GetServerSideProps<{
  courseResponse: CourseResponseDto;
}>;
