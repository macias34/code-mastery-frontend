import { type UseMutationOptions, useMutation } from "react-query";

import { useUser } from "@/features/user";
import { type AccessToken, type ApiError, request } from "@/shared/utils";

import { type ChapterDto } from "../types";

export interface CreateChapterDto {
  title: string;
  courseId: number;
}

type CreateChapterArguments = CreateChapterDto & AccessToken;

export const createChapter = ({
  title,
  courseId,
  accessToken,
}: CreateChapterArguments) => {
  return request<ChapterDto>(
    "/chapter",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        courseId,
      }),
    },
    { accessToken },
  );
};

export const useCreateChapter = (
  options?: UseMutationOptions<ChapterDto, ApiError, CreateChapterDto, unknown>,
) => {
  const { accessToken } = useUser();

  return useMutation<ChapterDto, ApiError, CreateChapterDto, unknown>({
    mutationFn: ({ title, courseId }) =>
      createChapter({ title, courseId, accessToken }),
    ...options,
  });
};
