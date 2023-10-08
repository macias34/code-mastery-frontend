import { Pencil, Trash } from "lucide-react";
import { type Dispatch, type FC, type SetStateAction } from "react";

import { Card, CardHeader, CardTitle } from "@/shared/components";
import { ICON_SIZE } from "@/shared/constants";

import { type ChapterDto } from "../../types";

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
  return (
    <Card>
      <CardHeader className="group flex flex-row items-center gap-4 space-y-0">
        <CardTitle>
          <span className="font-bold">Chapter {index + 1}:</span>{" "}
          {chapter.title}
        </CardTitle>

        <div className="hidden gap-2 items-center group-hover:flex">
          <Pencil
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
    </Card>
  );
};
