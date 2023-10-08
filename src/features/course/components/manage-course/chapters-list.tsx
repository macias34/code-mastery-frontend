import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from "@/shared/components";

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
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
            </Card>
          ))
        : "No chapters were found, try adding one!"}
    </div>
  );
};
