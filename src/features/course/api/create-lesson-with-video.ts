import { type CreateLessonDto, useCreateLesson } from "./create-lesson";
import {
  type UploadLessonVideoDto,
  useUploadLessonVideo,
} from "./upload-lesson-video";

type CreateLessonWithVideoDto = CreateLessonDto & {
  file: UploadLessonVideoDto["file"];
};

export const useCreateLessonWithVideo = () => {
  const createLesson = useCreateLesson();
  const uploadVideo = useUploadLessonVideo();

  const isLoading = createLesson.isLoading || uploadVideo.isLoading;

  const createLessonWithVideo = ({
    title,
    chapterId,
    file,
  }: CreateLessonWithVideoDto) => {
    return createLesson.mutateAsync(
      { title, chapterId },
      {
        async onSuccess(lesson) {
          const lessonId = lesson.id;
          await uploadVideo.mutateAsync({ lessonId, file });
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
