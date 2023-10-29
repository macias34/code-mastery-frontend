import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button, InputWithLabel, Spinner } from "@/shared/components";

import { useCreateLessonWithVideo, useGetLesson } from "../../api";
import { useInvalidatePathnameCourse } from "../../hooks";
import { type LessonDto } from "../../types";
import { LessonFormSchema } from "../../utils";

type LessonFormData = z.infer<typeof LessonFormSchema>;

export enum LessonFormVariant {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

export interface LessonFormProps {
  chapterId: number;
  setShowLessonDialog: Dispatch<SetStateAction<boolean>>;
  variant: LessonFormVariant;
  lesson?: LessonDto;
}

export const LessonForm: FC<LessonFormProps> = ({
  chapterId,
  setShowLessonDialog,
  variant,
  lesson,
}) => {
  const { createLessonWithVideo, isLoading, createLesson, uploadVideo } =
    useCreateLessonWithVideo();

  // const { data: lessonWithVideoSource } = useGetLesson(lesson?.id ?? -1, {
  //   enabled: Boolean(lesson?.id),
  // });

  // console.log(lessonWithVideoSource);

  const { invalidateCourse } = useInvalidatePathnameCourse();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(LessonFormSchema),
    mode: "onBlur",
    defaultValues: {
      title: lesson?.title ?? "",
    },
  });

  useEffect(() => {
    if (lesson) {
    }
  }, [lesson]);

  const onSubmit = async (formData: LessonFormData) => {
    const { title, files } = formData;
    const file = files[0];

    if (!file) {
      return;
    }

    if (variant === LessonFormVariant.CREATE) {
      try {
        await createLessonWithVideo({ title, chapterId, file });
        setShowLessonDialog(false);
        await invalidateCourse();
      } catch (error) {
        console.error(error);
      }
    }
    // if (variant === LessonFormVariant.EDIT) {
    // }
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
          {isLoading && <Spinner />}
          {!isLoading && variant === LessonFormVariant.CREATE
            ? "Create lesson"
            : "Edit lesson"}
        </Button>
      </div>
    </form>
  );
};
