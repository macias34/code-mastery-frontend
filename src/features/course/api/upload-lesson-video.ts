import { type UseMutationOptions, useMutation } from "react-query";

import { type AccessToken, type ApiError, request } from "@/shared/utils";

import { type LessonDto } from "../types";

interface UploadLessonVideoDto {
  lessonId: number;
  file: File;
}

type UploadLessonVideoArguments = UploadLessonVideoDto & AccessToken;

export const uploadLessonVideo = ({
  lessonId,
  file,
  accessToken,
}: UploadLessonVideoArguments) => {
  return request<LessonDto>(
    "/lesson/upload-video",
    {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
      },
      body: JSON.stringify({
        lessonId,
        file,
      }),
    },
    { accessToken },
  );
};

export const useUploadLessonVideo = (
  options?: UseMutationOptions<
    LessonDto,
    ApiError,
    UploadLessonVideoArguments,
    unknown
  >,
) => {
  return useMutation<LessonDto, ApiError, UploadLessonVideoArguments, unknown>({
    mutationFn: uploadLessonVideo,
    ...options,
  });
};
