import { type UseMutationOptions, useMutation } from "react-query";

import { useUser } from "@/features/user";
import { type AccessToken, type ApiError, request } from "@/shared/utils";

import { type ChapterDto } from "../types";

export interface DeleteLessonDto {
  lessonId: number;
}

type DeleteLessonArguments = DeleteLessonDto & AccessToken;

export const deleteLesson = ({
  lessonId,
  accessToken,
}: DeleteLessonArguments) => {
  return request<ChapterDto>(
    `/lesson/${lessonId}`,
    {
      method: "DELETE",
    },
    { accessToken },
  );
};

export const useDeleteLesson = (
  options?: UseMutationOptions<ChapterDto, ApiError, DeleteLessonDto, unknown>,
) => {
  const { accessToken } = useUser();

  return useMutation<ChapterDto, ApiError, DeleteLessonDto, unknown>({
    mutationFn: ({ lessonId }) => deleteLesson({ lessonId, accessToken }),
    ...options,
  });
};
