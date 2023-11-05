import { type GetServerSideProps } from "next";

import { FilterBar, type GetCoursesDto, ShopCourse } from "@/features/course";
import { ShopLayout } from "@/features/shop";
import { request } from "@/shared/utils";

export default function CoursesPage({
  courseResponse,
}: {
  courseResponse: GetCoursesDto;
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
          {courses.map((course) => (
            <ShopCourse course={course} key={course.id} />
          ))}
        </div>
      </div>
    </ShopLayout>
  );
}

export const getServerSideProps = (async () => {
  try {
    const courseResponse = await request<GetCoursesDto>("/course/");
    return { props: { courseResponse } };
  } catch {
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
  courseResponse: GetCoursesDto;
}>;
