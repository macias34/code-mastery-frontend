import { type UseMutationOptions, useMutation } from "react-query";

import { useUser } from "@/features/user";
import { type AccessToken, type ApiError, request } from "@/shared/utils";

import { type ChapterDto } from "../types";

export interface EditChapterDto {
  title: string;
  chapterId: number;
}

type EditChapterArguments = EditChapterDto & AccessToken;

export const editChapter = ({
  title,
  chapterId,
  accessToken,
}: EditChapterArguments) => {
  return request<ChapterDto>(
    `/chapter/${chapterId}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    },
    { accessToken },
  );
};

export const useEditChapter = (
  options?: UseMutationOptions<ChapterDto, ApiError, EditChapterDto, unknown>,
) => {
  const { accessToken } = useUser();

  return useMutation<ChapterDto, ApiError, EditChapterDto, unknown>({
    mutationFn: ({ title, chapterId }) =>
      editChapter({ title, chapterId, accessToken }),
    ...options,
  });
};
