import { Pencil, Trash } from "lucide-react";

import { Card, CardHeader, CardTitle, Spinner } from "@/shared/components";
import { ICON_SIZE } from "@/shared/constants";

import { useGetPathnameCourse } from "../../hooks";

export const ChaptersList = () => {
  const { data: course, isLoading } = useGetPathnameCourse();

  const chapters = course?.chapters;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-10">
      {chapters
        ? chapters.map((chapter, index) => (
            <Card key={chapter.id}>
              <CardHeader>
                <CardTitle>
                  <span className="font-bold">Chapter {index + 1}:</span>{" "}
                  {chapter.title}
                </CardTitle>

                <div className="flex">
                  <Pencil size={ICON_SIZE.SMALL} />
                  <Trash size={ICON_SIZE.SMALL} />
                </div>
              </CardHeader>
            </Card>
          ))
        : "No chapters were found, try adding one!"}
    </div>
  );
};
