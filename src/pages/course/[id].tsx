import dayjs from "dayjs";
import { useRouter } from "next/router";

import { useGetCourse } from "@/features/course";
import { ShopLayout } from "@/features/shop";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Spinner,
} from "@/shared/components";

export default function CoursePage() {
  const { query } = useRouter();
  const courseId = query?.id ? Number.parseInt(query.id as string) : -1;
  const { data: course, isLoading } = useGetCourse(courseId, {
    enabled: courseId > 0,
  });

  return (
    <ShopLayout>
      {isLoading && <Spinner />}
      {course && (
        <div className="grid gap-6 max-w-6xl px-4 mx-auto py-6 grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="grid gap-4 pt-6">
                <h1 className="font-bold text-3xl lg:text-4xl">
                  {course.name}
                </h1>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <img
                      alt="Avatar"
                      className="rounded-full"
                      height="64"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width="64"
                    />
                  </Avatar>
                  <div>
                    <div className="text-base">
                      Instructed by {course.instructorName}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {course.participantsCount} participants
                    </div>
                  </div>
                  <div className="ml-auto text-4xl font-bold">
                    ${course.price}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Created: {dayjs(course.createdAt).format("MMMM DD, YYYY")}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Last Updated:{" "}
                    {dayjs(course.updatedAt).format("MMMM DD, YYYY")}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Chapters: {course.chapters.length}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Lessons:{" "}
                    {course.chapters.reduce((accumulator, current) => {
                      return accumulator + current.lessons.length;
                    }, 0)}
                  </p>
                </div>
                <p className="text-base leading-loose">{course.description}</p>
                <div className="flex items-center gap-2">
                  <Badge color="primary" variant="secondary">
                    React
                  </Badge>
                  <Badge color="primary" variant="secondary">
                    JavaScript
                  </Badge>
                  <Badge color="primary" variant="secondary">
                    Web Development
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-end">
                <Button color="primary" variant="secondary">
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div></div>
        </div>
      )}
    </ShopLayout>
  );
}
