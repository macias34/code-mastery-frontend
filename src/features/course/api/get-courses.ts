import { type QueryKey, type UseQueryOptions, useQuery } from "react-query";

import { type CourseFilter, type GetCoursesDto } from "@/features/course";
import { type ApiError, request } from "@/shared/utils";

export const getCourses = (page: number, courseFilter?: CourseFilter) => {
  const url = new URLSearchParams();
  url.append("page", page.toString());
  for (const key in courseFilter) {
    if (courseFilter[key as keyof CourseFilter]) {
      url.append(
        key,
        courseFilter?.[key as keyof CourseFilter]?.toString() ?? "",
      );
    }
  }
  return request<GetCoursesDto>(
    `/course?page=${page}&size=8&${url.toString()}`,
  );
};

export type UseGetCoursesOptions = UseQueryOptions<
  GetCoursesDto,
  ApiError,
  GetCoursesDto,
  QueryKey
>;

export const useGetCourses = (
  page: number,
  courseFilter: CourseFilter,
  options?: UseGetCoursesOptions,
) => {
  return useQuery<GetCoursesDto, ApiError>({
    queryFn: () => getCourses(page, courseFilter),
    queryKey: [
      "course",
      page,
      courseFilter.maxPrice,
      courseFilter.minPrice,
      courseFilter.name,
    ],
    ...options,
  });
};
