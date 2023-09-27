import { useRouter } from "next/router";

import { DashboardLayout, useGetCourse } from "@/features/dashboard";

export default function CourseDashboardPage() {
  const router = useRouter();
  const id = Number.parseInt(router.query?.id as string);

  const { data: course } = useGetCourse(id, {
    enabled: !!id,
  });

  return <DashboardLayout>Course: {course?.id}</DashboardLayout>;
}
