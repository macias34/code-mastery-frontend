import React, { type FC, type PropsWithChildren } from "react";

import { useGetPathnameCourse } from "../../hooks";
import { Aside, type LinkItem } from "./aside";
import { Navbar } from "./navbar";

export const ManageCourseLayout: FC<PropsWithChildren> = ({ children }) => {
  const { courseUseQueryResult, id } = useGetPathnameCourse();
  const { data: course, isLoading } = courseUseQueryResult;
  if (isLoading || !course) {
    return (
      <main>
        <Navbar />
      </main>
    );
  }

  const rootPathname = `/dashboard/courses/${id}`;

  const linkGroups: LinkItem[] = [
    {
      children: "Home",
      href: rootPathname,
    },
    {
      children: "Configuration",
      href: rootPathname + "/configuration",
    },
    {
      children: "Content",
      href: rootPathname + "/content",
    },
    {
      children: "Students",
      href: rootPathname + "/students",
    },
    {
      children: "Pricing",
      href: rootPathname + "/pricing",
    },
  ];

  const { name } = course;

  return (
    <main className="flex flex-col">
      <Navbar courseName={name} />
      <div className="container flex gap-32 pt-16 pb-6 max-w-7xl">
        <Aside linkItems={linkGroups} />
        {children}
      </div>
    </main>
  );
};
