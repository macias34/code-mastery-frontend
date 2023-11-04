import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { type FC, useState } from "react";
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

import { useCreateLessonWithVideo } from "../../api";
import { useInvalidatePathnameCourse } from "../../hooks";
import { LessonFormSchema } from "../../utils";
import { LessonFormVariant } from "./lesson-form";

interface CreateLessonDialogProps {
  chapterId: number;
}
export const CreateLessonDialog: FC<CreateLessonDialogProps> = ({
  chapterId,
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const { createLessonWithVideo, isLoading } = useCreateLessonWithVideo();

  const lessonFormSchema = LessonFormSchema(LessonFormVariant.CREATE);
  type LessonFormData = z.infer<typeof lessonFormSchema>;

  const { invalidateCourse } = useInvalidatePathnameCourse();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (formData: LessonFormData) => {
    const { title, files } = formData;
    const file = files?.[0];

    if (!file) {
      return;
    }

    await createLessonWithVideo({
      title,
      chapterId,
      file,
      options: {
        onSuccess() {
          toast({
            title: TOAST_SUCCESS_TITLE,
            description: "Lesson has been succesfully created.",
          });
          setShowDialog(false);
        },
        onError(error) {
          toast({
            title: TOAST_ERROR_TITLE,
            description: error.message,
            variant: "destructive",
          });
        },
        async onSettled() {
          await invalidateCourse();
        },
      },
    });
  };

  return (
    <Dialog open={showDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setShowDialog(true)}
          className="w-fit mb-6"
          variant="secondary"
        >
          <Plus size={16} className="mr-2" /> Lesson
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
            <Label>Video</Label>
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
              {isLoading ? <Spinner /> : "Create lesson"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
