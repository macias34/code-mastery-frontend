import { FileTerminal } from "lucide-react";
import { type FC, useState } from "react";

import { EmptyStateCard, Spinner } from "@/shared/components";
import { ICON_SIZE } from "@/shared/constants";

import { useGetPathnameCourse } from "../../hooks";
import { type ChapterDto } from "../../types";
import { Chapter } from "./chapter";
import { DeleteChapterAlertDialog } from "./delete-chapter-alert-dialog";

interface ChapterListProps {
  showCreateChapterForm: boolean;
}

export const ChapterList: FC<ChapterListProps> = ({
  showCreateChapterForm,
}) => {
  const { data: course, isLoading } = useGetPathnameCourse();
  const [chapterToDelete, setChapterToDelete] = useState<ChapterDto>();

  const chapters = course?.chapters;

  if (isLoading) {
    return <Spinner />;
  }

  const showChapters = chapters && chapters.length > 0;
  const showEmptyState = chapters?.length === 0 && !showCreateChapterForm;

  return (
    <>
      {chapterToDelete && (
        <DeleteChapterAlertDialog
          chapterToDelete={chapterToDelete}
          setChapterToDelete={setChapterToDelete}
        />
      )}

      <div className="flex flex-col gap-6">
        {showChapters &&
          chapters.map((chapter, index) => (
            <Chapter
              key={chapter.id}
              chapter={chapter}
              setChapterToDelete={setChapterToDelete}
              index={index}
            />
          ))}

        {showEmptyState && (
          <EmptyStateCard
            icon={<FileTerminal size={ICON_SIZE.LG} />}
            headerContent="No chapters were found"
            paragraphContent="Try adding one."
          />
        )}
      </div>
    </>
  );
};
