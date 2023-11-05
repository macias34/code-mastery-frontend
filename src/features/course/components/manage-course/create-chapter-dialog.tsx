import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  InputWithLabel,
  Spinner,
  toast,
} from "@/shared/components";

import { useCreateChapter } from "../../api";
import { useGetPathnameCourse, useInvalidatePathnameCourse } from "../../hooks";

const CreateChapterFormSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
});

type CreateChapterData = z.infer<typeof CreateChapterFormSchema>;

export const CreateChapterDialog = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { data: course } = useGetPathnameCourse();
  const { invalidateCourse } = useInvalidatePathnameCourse();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateChapterData>({
    mode: "onBlur",
    resolver: zodResolver(CreateChapterFormSchema),
  });

  const { mutate, isLoading } = useCreateChapter();

  const onSubmit = ({ title }: CreateChapterData) => {
    mutate(
      { title, courseId: course?.id ?? -1 },
      {
        onSuccess() {
          toast({
            title: TOAST_SUCCESS_TITLE,
            description: "Chapter has been added successfuly.",
          });
          setShowDialog(false);
        },
        onError() {
          toast({
            title: TOAST_ERROR_TITLE,
            description: "Chapter hasn't been added.",
            variant: "destructive",
          });
        },
        async onSettled() {
          await invalidateCourse();
        },
      },
    );
  };

  useEffect(() => {
    if (!showDialog) {
      reset();
    }
  }, [reset, showDialog]);

  return (
    <Dialog open={showDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setShowDialog(true)}
          variant="secondary"
          className="w-fit mt-6"
        >
          <Plus size={16} className="mr-2" /> Chapter
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={() => setShowDialog(false)}>
        <DialogHeader className="mb-2">
          <DialogTitle>Create Chapter</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputWithLabel
            name="title"
            labelContent="Title"
            input={{
              ...register("title"),
              placeholder: "Passing props in Svelte",
            }}
            error={<ErrorMessage errors={errors} name="title" />}
          />
          <div className="flex gap-2 self-end">
            <Button
              onClick={() => setShowDialog(false)}
              type="button"
              variant="destructive"
            >
              Cancel
            </Button>
            <Button className="w-32" variant="secondary">
              {isLoading ? <Spinner /> : "Create chapter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
