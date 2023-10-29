import React, {
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components";

import { type ChapterDto, type LessonDto } from "../../types";
import {
  LessonForm,
  LessonFormLessonFormVariant,
  LessonFormVariant,
} from "./lesson-form";

interface LessonDialogProps {
  chapter: ChapterDto;
  variant: LessonFormVariant;
  lesson?: LessonDto;
  hideTrigger?: boolean;
  trigger: (
    setShowLessonDialog: Dispatch<SetStateAction<boolean>>,
  ) => ReactNode;
}

export const LessonDialog: FC<LessonDialogProps> = ({
  chapter,
  variant,
  lesson,
  hideTrigger,
  trigger,
}) => {
  const [showLessonDialog, setShowLessonDialog] = useState<boolean>(false);

  return (
    <Dialog open={showLessonDialog}>
      {!(hideTrigger === true) && (
        <DialogTrigger asChild>{trigger(setShowLessonDialog)}</DialogTrigger>
      )}
      <DialogContent onInteractOutside={() => setShowLessonDialog(false)}>
        <DialogHeader className="mb-2">
          <DialogTitle>
            {variant === LessonFormVariant.CREATE
              ? `Create lesson (${chapter?.title ?? ""})`
              : `Edit lesson ${lesson?.title ?? ""}`}
          </DialogTitle>
        </DialogHeader>
        <LessonForm
          variant={variant}
          setShowLessonDialog={setShowLessonDialog}
          chapterId={chapter.id}
          lesson={lesson}
        />
      </DialogContent>
    </Dialog>
  );
};
