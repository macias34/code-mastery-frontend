import { type UseMutationOptions, useMutation } from "react-query";

import { useUser } from "@/features/user";
import { request } from "@/shared/utils";

interface PatchLessonDTO {
  title?: string;
}

export const patchLesson = (
  lessonId: number,
  patchableArguments: PatchLessonDTO,
  accessToken: string,
) => {
  return request(
    `/lesson/${lessonId.toString()}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(patchableArguments),
    },
    {
      accessToken,
    },
  );
};
interface UsePatchLessonArguments {
  lessonId: number;
  patchableArguments: PatchLessonDTO;
}

type UsePatchLessonOptions = UseMutationOptions<
  unknown,
  unknown,
  UsePatchLessonArguments,
  unknown
>;

export const usePatchLesson = (options?: UsePatchLessonOptions) => {
  const { accessToken } = useUser();

  return useMutation({
    mutationFn: ({ lessonId, patchableArguments }: UsePatchLessonArguments) =>
      patchLesson(lessonId, patchableArguments, accessToken),
    ...options,
  });
};
