import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import React, { type FC, useEffect, useState } from "react";
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
import { ICON_SIZE } from "@/shared/constants";

import { useEditChapter } from "../../api";
import { useGetPathnameCourse, useInvalidatePathnameCourse } from "../../hooks";

const EditChapterFormSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
});

type EditChapterData = z.infer<typeof EditChapterFormSchema>;

interface EditChapterDialogProps {
  chapterId: number;
}

export const EditChapterDialog: FC<EditChapterDialogProps> = ({
  chapterId,
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { data: course } = useGetPathnameCourse();
  const { invalidateCourse } = useInvalidatePathnameCourse();

  const chapter = course?.chapters.find((chapter) => chapter.id === chapterId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditChapterData>({
    mode: "onBlur",
    resolver: zodResolver(EditChapterFormSchema),
  });

  const { mutate, isLoading } = useEditChapter();

  const onSubmit = ({ title }: EditChapterData) => {
    mutate(
      { title, chapterId },
      {
        onSuccess() {
          toast({
            title: TOAST_SUCCESS_TITLE,
            description: "Chapter has been edited successfuly.",
          });
          setShowDialog(false);
        },
        onError() {
          toast({
            title: TOAST_ERROR_TITLE,
            description: "Chapter hasn't been edited.",
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
    if (chapter) {
      setValue("title", chapter.title);
    }
  }, [setValue, chapter]);

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
          <DialogTitle>Edit Chapter</DialogTitle>
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
              {isLoading ? <Spinner /> : "Edit chapter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
