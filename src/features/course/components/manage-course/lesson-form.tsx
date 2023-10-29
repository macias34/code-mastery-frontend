import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button, InputWithLabel, Label, Spinner } from "@/shared/components";

import { useCreateLessonWithVideo, useGetLesson } from "../../api";
import { useInvalidatePathnameCourse } from "../../hooks";
import { type LessonDto } from "../../types";
import { LessonFormSchema } from "../../utils";

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
  const { createLessonWithVideo, isLoading, uploadVideo } =
    useCreateLessonWithVideo();

  const [videoFile, setVideoFile] = useState<File>();
  const [showVideo, setShowVideo] = useState<boolean>(true);

  const { data: lessonWithVideoSource } = useGetLesson(lesson?.id ?? -1, {
    enabled: Boolean(lesson?.id),
  });

  const lessonFormSchema = LessonFormSchema(variant);
  type LessonFormData = z.infer<typeof lessonFormSchema>;

  const { invalidateCourse } = useInvalidatePathnameCourse();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonFormSchema),
    mode: "onBlur",
    defaultValues: {
      title: lesson?.title ?? "",
    },
  });

  useEffect(() => {
    if (lessonWithVideoSource && lessonWithVideoSource.videoSrc) {
      const { videoSrc } = lessonWithVideoSource;
      const fetchVideoBlobFromSource = async () => {
        const video: Response = await fetch(videoSrc);
        const videoBlob: Blob = await video.blob();

        const options: FilePropertyBag = {
          type: videoBlob.type,
          lastModified: Date.now(),
        };
        const videoFile = new File([videoBlob], videoSrc, options);
        setVideoFile(videoFile);
      };

      void fetchVideoBlobFromSource();
    }
  }, [lessonWithVideoSource]);

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

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Label>Video</Label>{" "}
          <button
            onClick={() => setShowVideo((previousState) => !previousState)}
            className=" text-secondary-foreground/60 text-sm"
          >
            {showVideo ? "Change video" : "Preview video"}
          </button>
        </div>
        {showVideo && videoFile ? (
          <video controls>
            <source src={videoFile.name} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <InputWithLabel
            name="files"
            labelContent=""
            input={{
              ...register("files"),
              type: "file",
              accept: "video/mp4,video/x-m4v,video/*",
            }}
            error={<ErrorMessage errors={errors} name="files" />}
          />
        )}
      </div>

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
