import { type QueryKey, type UseQueryOptions, useQuery } from "react-query";

import { type LessonDto } from "@/features/course";
import { useUser } from "@/features/user";
import { type ApiError, request } from "@/shared/utils";

export const getLesson = (id: number, accessToken: string) => {
  return request<LessonDto>(`/lesson/${id.toString()}`, {}, { accessToken });
};

export type UseGetLessonOptions = UseQueryOptions<
  LessonDto,
  ApiError,
  LessonDto,
  QueryKey
>;

export const useGetLesson = (id: number, options?: UseGetLessonOptions) => {
  const { accessToken } = useUser();

  return useQuery<LessonDto, ApiError>({
    queryFn: () => getLesson(id, accessToken),
    queryKey: ["lesson", id],
    ...options,
  });
};
