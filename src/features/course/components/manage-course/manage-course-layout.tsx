import { Home, Pen, Settings } from "lucide-react";
import { type FC, type PropsWithChildren } from "react";

import { useGetPathnameCourse } from "@/features/course";
import { type AsideItem, DashboardLayout } from "@/features/dashboard";
import { ICON_SIZE } from "@/shared/constants";

export const ManageCourseLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data: course } = useGetPathnameCourse();
  const courseId = course?.id ?? -1;

  const baseHref = `/dashboard/courses/${courseId}`;

  const asideItems: AsideItem[] = [
    {
      children: "Home",
      href: baseHref + "/",
      icon: <Home size={ICON_SIZE.SMALL} />,
    },
    {
      children: "Content",
      href: baseHref + "/content",
      icon: <Pen size={ICON_SIZE.SMALL} />,
    },
    {
      children: "Configuration",
      href: baseHref + "/configuration",
      icon: <Settings size={ICON_SIZE.SMALL} />,
    },
  ];

  return (
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/dashboard/courses",
          label: "Go back to courses",
        },
        pageTitle: course?.name ?? "",
      }}
      asideItems={asideItems}
    >
      <section className="my-8 w-full max-w-5xl">{children}</section>
    </DashboardLayout>
  );
};
