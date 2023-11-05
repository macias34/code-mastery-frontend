import { type QueryKey, type UseQueryOptions, useQuery } from "react-query";

import { type GetCoursesDto } from "@/features/course";
import { type ApiError, request } from "@/shared/utils";

export const getCourses = (page: number) => {
  return request<GetCoursesDto>(`/course?page=${page}&size=4`);
};

export type UseGetCoursesOptions = UseQueryOptions<
  GetCoursesDto,
  ApiError,
  GetCoursesDto,
  QueryKey
>;

export const useGetCourses = (page: number, options?: UseGetCoursesOptions) => {
  return useQuery<GetCoursesDto, ApiError>({
    queryFn: () => getCourses(page),
    queryKey: ["course", page],
    ...options,
  });
};
