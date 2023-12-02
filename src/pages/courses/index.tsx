import { FormProvider, useForm } from "react-hook-form";
import { useDebounce } from "usehooks-ts";

import {
  type CourseFilter,
  CoursesSkeleton,
  FilterBar,
  ShopCourse,
  useGetCourses,
} from "@/features/course";
import { ShopLayout } from "@/features/shop";

export default function CoursesPage() {
  const methods = useForm<CourseFilter>();

  const maxPrice = useDebounce(methods.watch("maxPrice"), 300);
  const minPrice = useDebounce(methods.watch("minPrice"), 300);
  const name = useDebounce(methods.watch("name"), 300);

  const {
    data: coursesResponse,
    isLoading,
    error,
  } = useGetCourses(0, {
    maxPrice: maxPrice ?? undefined,
    minPrice: minPrice ?? 0,
    name: name,
  });

  if ((coursesResponse?.courses?.length ?? 0) === 0 || error) {
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
