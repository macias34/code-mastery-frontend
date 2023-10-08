import { type Dispatch, type SetStateAction, useMemo } from "react";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components";

import { type ChapterFormVariant } from "../components";
import { useInvalidatePathnameCourse } from "./use-invalidate-pathname-course";

const onSuccess = (
  title: string,
  actionWord: string,
  setShowCreateChapterForm: Dispatch<SetStateAction<boolean>>,
) => {
  toast({
    title: TOAST_SUCCESS_TITLE,
    description: `Chapter "${title}" has been successfuly ${actionWord}.`,
  });
  setShowCreateChapterForm(false);
};

const onError = (title: string, actionWord: string) => {
  toast({
    title: TOAST_ERROR_TITLE,
    description: `Chapter "${title}" hasn't been ${actionWord}.`,
    variant: "destructive",
  });
};

const onSettled = async (invalidateCourse: () => Promise<void>) => {
  await invalidateCourse();
};

interface GetChapterFormMutationOptionsArguments {
  setShowCreateChapterForm: Dispatch<SetStateAction<boolean>>;
  variant: ChapterFormVariant;
  title: string;
}

export const useChapterFormMutationOptions = ({
  setShowCreateChapterForm,
  variant,
  title,
}: GetChapterFormMutationOptionsArguments) => {
  const actionWord = variant === "create" ? "created" : "edited";
  const { invalidateCourse } = useInvalidatePathnameCourse();

  return useMemo(() => {
    return {
      onSuccess: () => onSuccess(title, actionWord, setShowCreateChapterForm),
      onError: () => onError(title, actionWord),
      onSettled: () => onSettled(invalidateCourse),
    };
  }, [title, actionWord, setShowCreateChapterForm, invalidateCourse]);
};
