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
import { ChapterForm, ChapterFormVariant } from "./chapter-form";

interface ChapterDialogProps {
  showChapterDialog: boolean;
  setShowChapterDialog: Dispatch<SetStateAction<boolean>>;
  variant: ChapterFormVariant;
  chapter?: ChapterDto;
  hideTrigger?: boolean;
}

export const ChapterDialog: FC<ChapterDialogProps> = ({
  showChapterDialog,
  setShowChapterDialog,
  variant,
  chapter,
  hideTrigger,
}) => {
  const dialogTitle =
    variant === ChapterFormVariant.CREATE ? "Create chapter" : "Edit chapter";

  return (
    <Dialog open={showChapterDialog}>
      {!(hideTrigger === true) && (
        <DialogTrigger asChild>
          <Button
            onClick={() => setShowChapterDialog(true)}
            variant="secondary"
            className="w-fit mt-6"
          >
            <Plus size={16} className="mr-2" /> Chapter
          </Button>
        </DialogTrigger>
      )}
      <DialogContent onInteractOutside={() => setShowChapterDialog(false)}>
        <DialogHeader className="mb-2">
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <ChapterForm
          setShowChapterDialog={setShowChapterDialog}
          variant={variant}
          chapter={chapter}
        />
      </DialogContent>
    </Dialog>
  );
};
