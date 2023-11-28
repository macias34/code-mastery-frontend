import { type GetServerSideProps } from "next";
import { FormProvider, useForm } from "react-hook-form";
import { useDebounce } from "usehooks-ts";

import {
  type CourseFilter,
  CoursesSkeleton,
  FilterBar,
  type GetCoursesDto,
  ShopCourse,
  useGetCourses,
} from "@/features/course";
import { ShopLayout } from "@/features/shop";
import { request } from "@/shared/utils";

export default function CoursesPage({
  courseResponse: initialCoursesResponse,
}: {
  courseResponse: GetCoursesDto;
}) {
  const methods = useForm<CourseFilter>();

  const maxPrice = useDebounce(methods.watch("maxPrice"), 300);
  const minPrice = useDebounce(methods.watch("minPrice"), 300);
  const name = useDebounce(methods.watch("name"), 300);

  const { data: coursesResponse, isLoading } = useGetCourses(
    0,
    {
      maxPrice: maxPrice ?? undefined,
      minPrice: minPrice ?? 0,
      name: name,
    },
    { initialData: initialCoursesResponse },
  );

  if ((coursesResponse?.courses?.length ?? 0) === 0) {
    return (
      <ShopLayout>
        <FormProvider {...methods}>
          <FilterBar />
        </FormProvider>

        <div className="flex justify-center gap-5 mt-10">
          <p>Brak kursów</p>
        </div>
      </ShopLayout>
    );
  }

  const courses = coursesResponse?.courses ?? [];

  return (
    <ShopLayout>
      <FormProvider {...methods}>
        <FilterBar />
        <div className="w-11/12 max-w-6xl mx-auto mt-10 ">
          <div className=" flex justify-center gap-5 mt-10 flex-wrap">
            {isLoading && <CoursesSkeleton />}
            {courses.map((course) => (
              <ShopCourse course={course} key={course.id} />
            ))}
          </div>
        </div>
      </FormProvider>
    </ShopLayout>
  );
}

export const getServerSideProps = (async () => {
  try {
    const courseResponse = await request<GetCoursesDto>("/course");
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
