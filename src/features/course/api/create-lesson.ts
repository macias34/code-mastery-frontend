import { type UseMutationOptions, useMutation } from "react-query";

import { useUser } from "@/features/user";
import { type AccessToken, type ApiError, request } from "@/shared/utils";

import { type LessonDto } from "../types";

export interface CreateLessonDto {
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
      headers: {
        "Content-type": "application/json",
      },
    },
    { accessToken },
  );
};

export const useCreateLesson = (
  options?: UseMutationOptions<LessonDto, ApiError, CreateLessonDto, unknown>,
) => {
  const { accessToken } = useUser();

  return useMutation<LessonDto, ApiError, CreateLessonDto, unknown>({
    mutationFn: ({ title, chapterId }) =>
      createLesson({ title, chapterId, accessToken }),
    ...options,
  });
};
