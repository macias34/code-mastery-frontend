import Image from "next/image";
import Link from "next/link";

import { formatToDDMMYYYY } from "@/libs/dayjs";
import { Badge } from "@/shared/components/badge";
import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { API_URL } from "@/shared/constants";

import { type CourseDto } from "../types";

interface Props {
  course: CourseDto;
  buttonText?: string;
}

export const Course = ({ course, buttonText }: Props) => {
  console.log(course);
  return (
    <Card className="w-[350px] flex flex-col">
      <CardHeader className="p-0">
        <figure className="relative overflow-hidden h-40">
          <Image
            src={`${API_URL}/course/avatar/${course.id}`}
            alt={course.name}
            fill
            className="object-cover rounded-t-md"
          />
        </figure>
      </CardHeader>
      <CardContent className="pt-5">
        <Link
          href={`/course/${course.id}`}
          className="flex items-start justify-between"
        >
          <div className="w-3/5 ">
            <CardTitle className="break-words">{course.name}</CardTitle>
            <CardDescription>{course.instructorName}</CardDescription>
          </div>

          <Button>{buttonText ?? "See details"}</Button>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto h-max">
        <div className="self-start flex flex-col justify-around gap-y-2">
          <p className="font-semibold ">Price: {course.price.toFixed(2)} zł</p>
          <p>Last update: {formatToDDMMYYYY(course.updatedAt)}</p>
        </div>

        <div className="flex flex-col gap-y-3">
          {course.categories.length > 0 &&
            course.categories.map((category) => (
              <Link key={category.id} href={`/courses?category=${category.id}`}>
                <Badge className="py-1">{category.name}</Badge>
              </Link>
            ))}
          <Badge className="py-1">
            Participants: {course.participantsCount}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};
