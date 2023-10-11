import { Plus } from "lucide-react";
import React, { type Dispatch, type FC, type SetStateAction } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components";

import { type ChapterDto } from "../../types";
import { LessonForm } from "./lesson-form";

interface LessonDialogProps {
  chapter: ChapterDto;
  showLessonDialog: boolean;
  setShowLessonDialog: Dispatch<SetStateAction<boolean>>;
}

export const LessonDialog: FC<LessonDialogProps> = ({
  chapter,
  showLessonDialog,
  setShowLessonDialog,
}) => {
  const { id, title } = chapter;

  return (
    <Dialog open={showLessonDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setShowLessonDialog(true)}
          className="w-fit"
          variant="secondary"
        >
          <Plus size={16} className="mr-2" /> Lesson
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={() => setShowLessonDialog(false)}>
        <DialogHeader className="mb-2">
          <DialogTitle>Create lesson ({title})</DialogTitle>
        </DialogHeader>
        <LessonForm setShowLessonDialog={setShowLessonDialog} chapterId={id} />
      </DialogContent>
    </Dialog>
  );
};
