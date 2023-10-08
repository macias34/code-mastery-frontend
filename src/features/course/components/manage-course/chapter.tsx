import { Pencil, Trash } from "lucide-react";
import { type Dispatch, type FC, type SetStateAction, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components";
import { ICON_SIZE } from "@/shared/constants";
import { cn } from "@/shared/utils";

import { type ChapterDto } from "../../types";
import { ChapterForm } from "./chapter-form";

interface ChapterProps {
  chapter: ChapterDto;
  index: number;
  setChapterToDelete: Dispatch<SetStateAction<ChapterDto | undefined>>;
}

export const Chapter: FC<ChapterProps> = ({
  chapter,
  index,
  setChapterToDelete,
}) => {
  const [showEditChapterForm, setShowEditChapterForm] =
    useState<boolean>(false);

  return (
    <Card>
      {!showEditChapterForm && (
        <CardHeader className="group flex flex-row items-center gap-4 space-y-0">
          <CardTitle>
            <span className="font-bold">Chapter {index + 1}:</span>{" "}
            {chapter.title}
          </CardTitle>

          <div className="hidden gap-2 items-center group-hover:flex">
            <Pencil
              onClick={() => setShowEditChapterForm(true)}
              className="cursor-pointer hover:text-white/80 transition"
              size={ICON_SIZE.SMALL}
            />
            <Trash
              onClick={() => setChapterToDelete(chapter)}
              className="cursor-pointer hover:text-white/80 transition"
              size={ICON_SIZE.SMALL}
            />
          </div>
        </CardHeader>
      )}

      <CardContent className={cn({ "pb-0": Boolean(!showEditChapterForm) })}>
        {showEditChapterForm && (
          <ChapterForm
            className="mt-6"
            setShowChapterForm={setShowEditChapterForm}
            variant="edit"
            chapter={chapter}
          />
        )}
      </CardContent>
    </Card>
  );
};
