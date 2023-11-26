import dayjs from "dayjs";
import React from "react";

import { useCreateOrder } from "@/features/order";
import { UserRole, useInvalidateUser, useUser } from "@/features/user";
import { TOAST_SUCCESS_TITLE } from "@/libs/toast";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  toast,
} from "@/shared/components";

import { type CourseDto } from "../../types";

interface CourseDetailsProps {
  course: CourseDto;
}

export const CourseDetails = ({ course }: CourseDetailsProps) => {
  const {
    id,
    name,
    instructorName,
    participantsCount,
    price,
    createdAt,
    updatedAt,
    chapters,
    description,
    properties,
  } = course;
  const { mutate, isLoading } = useCreateOrder();
  const user = useUser();
  const { invalidate } = useInvalidateUser();

  const isBought =
    user.userData?.courses.some((userCourse) => userCourse.id === id) ||
    user.userData?.role === UserRole.ADMIN ||
    user.userData?.role === UserRole.WORKER;

  const instructorNameAbbreviation =
    instructorName?.slice(0, 2).toUpperCase() ?? "AD";

  const handleBuyNow = () => {
    mutate(
      {
        courseId: id,
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
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Something went wrong",
            duration: 5000,
          });
        },
        async onSettled() {
          await invalidate();
        },
      },
    );
  };

  return (
    <div className="md:col-span-2">
      <Card>
        <CardContent className="grid gap-4 pt-6">
          <h1 className="font-bold text-3xl lg:text-4xl">{name}</h1>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback className="bg-primary/90 text-white font-semibold cursor-pointer hover:bg-primary transition">
                {instructorNameAbbreviation}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-base">Instructed by {instructorName}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {participantsCount} participants
              </div>
            </div>
            <div className="ml-auto text-4xl font-bold">${price}</div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Created: {dayjs(createdAt).format("MMMM DD, YYYY")}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Last Updated: {dayjs(updatedAt).format("MMMM DD, YYYY")}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Chapters: {chapters.length}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Lessons:{" "}
              {chapters.reduce((accumulator, current) => {
                return accumulator + current.lessons.length;
              }, 0)}
            </p>
          </div>
          <p className="text-base leading-loose">{description}</p>
          <div className="flex items-center gap-2">
            {properties.map((property) => (
              <Badge key={property.id} variant="secondary" className="text-sm">
                {property.label}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end">
          {isBought ? (
            <Button disabled>Already bought</Button>
          ) : (
            <Button disabled={isLoading} onClick={() => handleBuyNow()}>
              Buy now
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
