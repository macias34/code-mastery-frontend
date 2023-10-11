import { type UseMutationOptions, useMutation } from "react-query";

import { useUser } from "@/features/user";
import { type AccessToken, type ApiError, request } from "@/shared/utils";

export interface UploadLessonVideoDto {
  lessonId: number;
  file: File;
}

type UploadLessonVideoArguments = UploadLessonVideoDto & AccessToken;

export const uploadLessonVideo = ({
  lessonId,
  file,
  accessToken,
}: UploadLessonVideoArguments) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("lessonId", lessonId.toString());

  return request(
    "/lesson/upload-video",
    {
      method: "POST",
      body: formData,
    },
    { accessToken },
  );
};

export const useUploadLessonVideo = (
  options?: UseMutationOptions<
    unknown,
    ApiError,
    UploadLessonVideoDto,
    unknown
  >,
) => {
  const { accessToken } = useUser();
  return useMutation<unknown, ApiError, UploadLessonVideoDto, unknown>({
    mutationFn: ({ lessonId, file }) =>
      uploadLessonVideo({ lessonId, file, accessToken }),
    ...options,
  });
};
