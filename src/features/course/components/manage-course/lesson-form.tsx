import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, type FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, InputWithLabel, Spinner } from "@/shared/components";

import { useCreateLesson, useUploadLessonVideo } from "../../api";

const ACCEPTED_VIDEO_TYPES = new Set(["video/mp4", "video/x-m4v", "video/*"]);

const LessonFormSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
  files: z
    .custom<FileList>()
    .refine((files) => files?.length == 1, "Video is required.")
    .refine(
      (files) => ACCEPTED_VIDEO_TYPES.has(files?.[0]?.type ?? ""),
      ".mp4 and other video files are accepted.",
    ),
});

type LessonFormData = z.infer<typeof LessonFormSchema>;

export interface LessonFormProps {
  chapterId: number;
  setShowLessonDialog: Dispatch<SetStateAction<boolean>>;
}

export const LessonForm: FC<LessonFormProps> = ({
  chapterId,
  setShowLessonDialog,
}) => {
  const { mutate: createLesson, isLoading: isCreateLessonLoading } =
    useCreateLesson();
  const { mutate: uploadVideo, isLoading: isUploadVideoLoading } =
    useUploadLessonVideo();

  const isLoading = isCreateLessonLoading || isUploadVideoLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(LessonFormSchema),
    mode: "onBlur",
  });

  const onSubmit = (formData: LessonFormData) => {
    const { title, files } = formData;
    const file = files[0];

    if (!file) {
      return;
    }

    createLesson(
      { title, chapterId },
      {
        onSuccess(lesson) {
          const lessonId = lesson.id;
          uploadVideo(
            { lessonId, file },
            {
              onSuccess() {
                setShowLessonDialog(true);
              },
            },
          );
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <InputWithLabel
        name="title"
        labelContent="Title"
        input={{
          ...register("title"),
          placeholder: "Passing props between Svelte components",
        }}
        error={<ErrorMessage errors={errors} name="title" />}
      />
      <InputWithLabel
        name="files"
        labelContent="Video"
        input={{
          ...register("files"),
          type: "file",
          accept: "video/mp4,video/x-m4v,video/*",
        }}
        error={<ErrorMessage errors={errors} name="files" />}
      />
      <div className="flex gap-2 self-end">
        <Button
          onClick={() => setShowLessonDialog(false)}
          type="button"
          variant="destructive"
        >
          Cancel
        </Button>
        <Button className="w-32" variant="secondary">
          {isLoading ? <Spinner /> : "Create lesson"}
        </Button>
      </div>
    </form>
  );
};
