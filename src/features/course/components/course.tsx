import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { useEnvironment } from "@/hooks";

import { type CourseDto } from "../types";

interface Props {
  course: CourseDto;
}

export const Course = ({ course }: Props) => {
  const { getApiUrl } = useEnvironment();
  return (
    <Card className="w-[350px] flex flex-col">
      <CardHeader className="p-0">
        <figure className="relative overflow-hidden h-40">
          <Image
            src={`${getApiUrl()}/course/avatar/${course.id}`}
            alt={course.name}
            fill
            className="object-cover rounded-t-md"
          />
        </figure>
      </CardHeader>
      <CardContent className="pt-5">
        <Link
          href={`/course/${course.id}`}
          className="flex items-center justify-between"
        >
          <div className="w-3/5 ">
            <CardTitle className="break-words">{course.name}</CardTitle>
            <CardDescription>{course.instructorName}</CardDescription>
          </div>

          <Button>Zobacz</Button>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto h-max">
        <p className="font-semibold">Cena: {course.price.toFixed(2)} zł</p>
        {course.categories.length > 0 &&
          course.categories.map((category) => (
            <Link key={category.id} href={`/courses?category=${category.id}`}>
              <Badge>{category.name}</Badge>
            </Link>
          ))}
        <Badge>Uczestnicy: {course.participantsCount}</Badge>
      </CardFooter>
    </Card>
  );
};
