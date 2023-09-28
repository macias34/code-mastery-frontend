import { type QueryKey, type UseQueryOptions, useQuery } from "react-query";

import { type CourseDto } from "@/features/course";
import { type ApiError, request } from "@/shared/utils";

export const getCourse = (id: number) => {
  return request<CourseDto>(`/course/${id.toString()}`);
};

export type UseGetCourseOptions = UseQueryOptions<
  CourseDto,
  ApiError,
  CourseDto,
  QueryKey
>;

export const useGetCourse = (id: number, options?: UseGetCourseOptions) => {
  return useQuery<CourseDto, ApiError>({
    queryFn: () => getCourse(id),
    queryKey: ["course", id],
    ...options,
  });
};
