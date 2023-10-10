import { type UseMutationOptions, useMutation } from "react-query";

import { type AccessToken, type ApiError, request } from "@/shared/utils";

import { type LessonDto } from "../types";

interface CreateLessonDto {
  title: string;
  chapterId: number;
}

type CreateLessonArguments = CreateLessonDto & AccessToken;

export const createLesson = ({
  title,
  chapterId,
  accessToken,
}: CreateLessonArguments) => {
  return request<LessonDto>(
    "/lesson",
    {
      method: "POST",
      body: JSON.stringify({
        title,
        chapterId,
      }),
    },
    { accessToken },
  );
};

export const useCreateLesson = (
  options?: UseMutationOptions<
    LessonDto,
    ApiError,
    CreateLessonArguments,
    unknown
  >,
) => {
  return useMutation<LessonDto, ApiError, CreateLessonArguments, unknown>({
    mutationFn: createLesson,
    ...options,
  });
};
