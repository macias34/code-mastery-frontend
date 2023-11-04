import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import React, { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  InputWithLabel,
  Label,
  Spinner,
  toast,
} from "@/shared/components";
import { ICON_SIZE } from "@/shared/constants";

import {
  useCreateLessonWithVideo,
  useGetLesson,
  useInvalidateLesson,
  usePatchLesson,
} from "../../api";
import { useInvalidatePathnameCourse } from "../../hooks";
import { type LessonDto } from "../../types";
import { LessonFormSchema } from "../../utils";

export enum LessonFormVariant {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

export interface LessonFormProps {
  lesson?: LessonDto;
}

export const EditLessonDialog: FC<LessonFormProps> = ({ lesson }) => {
  const { isLoading, uploadVideo } = useCreateLessonWithVideo();
  const lessonId = lesson?.id ?? -1;
  const { mutate: patchLesson } = usePatchLesson();
  const { invalidateLesson } = useInvalidateLesson(lessonId);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<File>();
  const [showVideo, setShowVideo] = useState<boolean>(true);

  const { data: lessonWithVideoSource } = useGetLesson(lesson?.id ?? -1, {
    enabled: Boolean(lesson?.id),
  });

  const lessonFormSchema = LessonFormSchema(LessonFormVariant.EDIT);
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

  const onSubmit = (formData: LessonFormData) => {
    const { title, files } = formData;
    const file = files?.[0];

    if (file) {
      uploadVideo({ lessonId, file });
    }
    patchLesson(
      { lessonId, patchableArguments: { title } },
      {
        onSuccess() {
          toast({
            title: TOAST_SUCCESS_TITLE,
            description: "Lesson has been succesfully edited.",
          });
          setShowDialog(false);
        },
        onError(error) {
          toast({
            title: TOAST_ERROR_TITLE,
            description: error as string,
            variant: "destructive",
          });
        },
        async onSettled() {
          await invalidateCourse();
          await invalidateLesson();
        },
      },
    );
  };

  return (
    <Dialog open={showDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setShowDialog(true)}
          variant="outline"
          size="icon"
        >
          <Pencil
            className=" hover:text-white/80 transition"
            size={ICON_SIZE.SMALL}
          />
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={() => setShowDialog(false)}>
        <DialogHeader className="mb-2">
          <DialogTitle>Create lesson</DialogTitle>
        </DialogHeader>

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
                type="button"
                onClick={() => setShowVideo((previousState) => !previousState)}
                className=" text-secondary-foreground/60 text-sm"
              >
                {showVideo ? "Change video" : "Preview video"}
              </button>
            </div>
            {showVideo && videoFile ? (
              <video controls className=" max-h-72">
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
              onClick={() => setShowDialog(false)}
              type="button"
              variant="destructive"
            >
              Cancel
            </Button>
            <Button className="w-32" variant="secondary">
              {isLoading ? <Spinner /> : "Edit lesson"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
