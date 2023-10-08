import { type UseMutationOptions, useMutation } from "react-query";

import { useUser } from "@/features/user";
import { type AccessToken, type ApiError, request } from "@/shared/utils";

import { type ChapterDto } from "../types";

export interface DeleteChapterDto {
  chapterId: number;
}

type DeleteChapterArguments = DeleteChapterDto & AccessToken;

export const deleteChapter = ({
  chapterId,
  accessToken,
}: DeleteChapterArguments) => {
  return request<ChapterDto>(
    `/chapter/${chapterId}`,
    {
      method: "DELETE",
    },
    { accessToken },
  );
};

export const useDeleteChapter = (
  options?: UseMutationOptions<ChapterDto, ApiError, DeleteChapterDto, unknown>,
) => {
  const { accessToken } = useUser();

  return useMutation<ChapterDto, ApiError, DeleteChapterDto, unknown>({
    mutationFn: ({ chapterId }) => deleteChapter({ chapterId, accessToken }),
    ...options,
  });
};
