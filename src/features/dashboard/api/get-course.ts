import { QueryKey, UseQueryOptions, useQuery } from "react-query";

import { type CourseDto } from "@/features/course";
import { type ApiError, request } from "@/shared/utils";

export const getCourse = (id: number) => {
  return request<CourseDto>(`/course/${id.toString()}`);
};

export const useGetCourse = (
  id: number,
  options?: UseQueryOptions<CourseDto, ApiError, CourseDto, QueryKey>,
) => {
  return useQuery<CourseDto, ApiError>({
    queryFn: () => getCourse(id),
    queryKey: ["course", id],
    ...options,
  });
};
