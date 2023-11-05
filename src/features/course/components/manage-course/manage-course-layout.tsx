import { type FC, type PropsWithChildren } from "react";

import { useGetPathnameCourse } from "@/features/course";
import { DashboardLayout } from "@/features/dashboard";

export const ManageCourseLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data: course } = useGetPathnameCourse();

  return (
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/dashboard/courses",
          label: "Go back to courses",
        },
        pageTitle: course?.name ?? "",
      }}
    >
      {children}
    </DashboardLayout>
  );
};
