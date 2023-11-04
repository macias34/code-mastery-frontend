import { Trash } from "lucide-react";
import { type FC, useState } from "react";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Spinner,
  toast,
} from "@/shared/components";
import { ICON_SIZE } from "@/shared/constants";

import { useDeleteLesson } from "../../api";
import { useInvalidatePathnameCourse } from "../../hooks";
import { type LessonDto } from "../../types";

interface DeleteLessonAlertDialogProps {
  lesson?: LessonDto;
}

export const DeleteLessonAlertDialog: FC<DeleteLessonAlertDialogProps> = ({
  lesson,
}) => {
  const { mutate, isLoading } = useDeleteLesson();
  const { invalidateCourse } = useInvalidatePathnameCourse();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const deleteChapter = () => {
    mutate(
      { lessonId: lesson?.id ?? -1 },
      {
        onSuccess() {
          toast({
            title: TOAST_SUCCESS_TITLE,
            description: `Lesson ${
              lesson?.title ?? ""
            } has been successfuly deleted.`,
          });
        },
        onError() {
          toast({
            title: TOAST_ERROR_TITLE,
            description: `Chapter ${lesson?.title ?? ""} hasn't been deleted.`,
            variant: "destructive",
          });
        },

        async onSettled() {
          await invalidateCourse();
        },
      },
    );
  };

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => setShowDialog(true)}
          variant="outline"
          size="icon"
        >
          <Trash
            className="cursor-pointer hover:text-white/80 transition"
            size={ICON_SIZE.SMALL}
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete lesson{" "}
            <span className="font-bold">{`"${lesson?.title ?? ""}"`}</span> with
            its video.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowDialog(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className=" w-32" onClick={deleteChapter}>
            {isLoading ? <Spinner /> : "Delete lesson"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
