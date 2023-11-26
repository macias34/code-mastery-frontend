import dayjs from "dayjs";
import React from "react";

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
} from "@/shared/components";

import { type CourseDto } from "../../types";

interface CourseDetailsProps {
  course: CourseDto;
}

export const CourseDetails = ({ course }: CourseDetailsProps) => {
  const {
    name,
    instructorName,
    participantsCount,
    price,
    createdAt,
    updatedAt,
    chapters,
    description,
  } = course;

  return (
    <div className="md:col-span-2">
      <Card>
        <CardContent className="grid gap-4 pt-6">
          <h1 className="font-bold text-3xl lg:text-4xl">{name}</h1>
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
  );
};
