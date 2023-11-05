import { type Dispatch, type FC, type SetStateAction } from "react";

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
  Spinner,
  toast,
} from "@/shared/components";

import { useDeleteChapter } from "../../api";
import { useInvalidatePathnameCourse } from "../../hooks";
import { type ChapterDto } from "../../types";

interface DeleteChapterAlertDialogProps {
  chapterToDelete: ChapterDto | undefined;
  setChapterToDelete: Dispatch<SetStateAction<ChapterDto | undefined>>;
}

export const DeleteChapterAlertDialog: FC<DeleteChapterAlertDialogProps> = ({
  chapterToDelete,
  setChapterToDelete,
}) => {
  const { mutate, isLoading } = useDeleteChapter();
  const { invalidateCourse } = useInvalidatePathnameCourse();

  if (!chapterToDelete) {
    return;
  }

  const { title, id: chapterId } = chapterToDelete;

  const deleteChapter = () => {
    mutate(
      { chapterId },
      {
        onSuccess() {
          toast({
            title: TOAST_SUCCESS_TITLE,
            description: `Chapter ${title} has been successfuly deleted.`,
          });

          setChapterToDelete(undefined);
        },
        onError() {
          toast({
            title: TOAST_ERROR_TITLE,
            description: `Chapter ${title} hasn't been deleted.`,
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
    <AlertDialog open={Boolean(chapterToDelete)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete chapter{" "}
            <span className="font-bold">{`"${title}"`}</span> and its lessons.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setChapterToDelete(undefined)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className=" w-32" onClick={deleteChapter}>
            {isLoading ? <Spinner /> : "Delete chapter"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
