import Image from "next/image";

import { type CourseDto } from "@/libs/course";
import { useEnvironment } from "@/libs/environment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface Props {
  course: CourseDto;
}

export const Course = ({ course }: Props) => {
  const { getApiUrl } = useEnvironment();
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={`${getApiUrl()}/course/avatar/${course.id}`}
          alt={course.name}
          width={100}
          height={100}
        />
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};
