import Link from "next/link";
import { useRouter } from "next/router";

import { useCreateOrder } from "@/features/order";
import { UserRole, useUser } from "@/features/user";
import { formatToDDMMYYYY } from "@/libs/dayjs";
import { TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components";
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

import { type CourseDto } from "../types";

interface Props {
  course: CourseDto;
  buttonText?: string;
}

export const ShopCourse = ({ course }: Props) => {
  const { mutate, isLoading } = useCreateOrder();
  const router = useRouter();
  const user = useUser();
  const handleBuyNow = () => {
    mutate(
      {
        courseId: course.id,
        userId: user.userData?.id ?? 1,
        accessToken: user.accessToken,
      },
      {
        onSuccess: () => {
          toast({
            title: TOAST_SUCCESS_TITLE,
            description: "Course bought successfully",
            duration: 5000,
          });
          void router.push("/my-courses");
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Something went wrong",
            duration: 5000,
          });
        },
      },
    );
  };

  const isBought =
    user.userData?.courses.some((userCourse) => userCourse.id === course.id) ||
    user.userData?.role === UserRole.ADMIN ||
    user.userData?.role === UserRole.WORKER;

  return (
    <Card className="w-[350px] flex flex-col">
      <CardHeader className="p-0">
        <figure className="relative overflow-hidden h-40">
          <img
            src={course.thumbnailSrc ?? ""}
            alt={course.name}
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
        </Link>
        <div className="flex gap-4 justify-end">
          {isBought || !user.accessToken ? (
            <Link href={`/course/${course.id}`}>
              <Button>Watch</Button>
            </Link>
          ) : (
            <Button disabled={isLoading} onClick={() => handleBuyNow()}>
              Buy now
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto h-max">
        <div className="self-start flex flex-col justify-around gap-y-2">
          <p className="font-semibold ">Price: {course.price} zł</p>
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
