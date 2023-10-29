import { type QueryKey, type UseQueryOptions, useQuery } from "react-query";

import { type LessonDto } from "@/features/course";
import { type ApiError, request } from "@/shared/utils";

export const getLesson = (id: number) => {
  return request<LessonDto>(`/lesson/${id.toString()}`);
};

export type UseGetLessonOptions = UseQueryOptions<
  LessonDto,
  ApiError,
  LessonDto,
  QueryKey
>;

export const useGetLesson = (id: number, options?: UseGetLessonOptions) => {
  return useQuery<LessonDto, ApiError>({
    queryFn: () => getLesson(id),
    queryKey: ["lesson", id],
    ...options,
  });
};
