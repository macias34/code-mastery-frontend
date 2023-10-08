import { type Dispatch, type SetStateAction, useMemo } from "react";

import { TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components";

import { type ChapterFormVariant } from "../components";
import { useInvalidatePathnameCourse } from "./use-invalidate-pathname-course";

const onSuccess = (
  actionWord: string,
  setShowChapterForm: Dispatch<SetStateAction<boolean>>,
) => {
  toast({
    title: TOAST_SUCCESS_TITLE,
    description: `Chapter has been successfuly ${actionWord}.`,
  });
  setShowChapterForm(false);
};

const onError = (actionWord: string) => {
  toast({
    description: `Chapter hasn't been ${actionWord}.`,
    variant: "destructive",
  });
};

const onSettled = async (invalidateCourse: () => Promise<void>) => {
  await invalidateCourse();
};

interface GetChapterFormMutationOptionsArguments {
  setShowChapterForm: Dispatch<SetStateAction<boolean>>;
  variant: ChapterFormVariant;
}

export const useChapterFormMutationOptions = ({
  setShowChapterForm,
  variant,
}: GetChapterFormMutationOptionsArguments) => {
  const actionWord = variant === "create" ? "created" : "edited";
  const { invalidateCourse } = useInvalidatePathnameCourse();

  return useMemo(() => {
    return {
      onSuccess: () => onSuccess(actionWord, setShowChapterForm),
      onError: () => onError(actionWord),
      onSettled: () => onSettled(invalidateCourse),
    };
  }, [actionWord, setShowChapterForm, invalidateCourse]);
};
