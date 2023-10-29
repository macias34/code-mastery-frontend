import { type MutateOptions } from "react-query";

import { type ApiError } from "@/shared/utils";

import { type CreateLessonDto, useCreateLesson } from "./create-lesson";
import {
  type UploadLessonVideoDto,
  useUploadLessonVideo,
} from "./upload-lesson-video";

type CreateLessonWithVideoDto = CreateLessonDto & {
  file: UploadLessonVideoDto["file"];
};

interface CreateLessonWithVideoArguments extends CreateLessonWithVideoDto {
  options:
    | MutateOptions<unknown, ApiError, UploadLessonVideoDto, unknown>
    | undefined;
}

export const useCreateLessonWithVideo = () => {
  const createLesson = useCreateLesson();
  const uploadVideo = useUploadLessonVideo();

  const isLoading = createLesson.isLoading || uploadVideo.isLoading;

  const createLessonWithVideo = ({
    title,
    chapterId,
    file,
    options,
  }: CreateLessonWithVideoArguments) => {
    return createLesson.mutateAsync(
      { title, chapterId },
      {
        async onSuccess(lesson) {
          const lessonId = lesson.id;
          await uploadVideo.mutateAsync({ lessonId, file }, options);
        },
      },
    );
  };

  return {
    isLoading,
    createLessonWithVideo,
    createLesson: createLesson.mutate,
    uploadVideo: uploadVideo.mutate,
  };
};
