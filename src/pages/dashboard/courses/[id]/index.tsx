import { useRouter } from "next/router";

import { useGetCourse } from "@/features/course";

export default function CourseDashboardPage() {
  const router = useRouter();
  const id = Number.parseInt(router.query?.id as string);

  const { data: course } = useGetCourse(id, {
    enabled: !!id,
  });

  return <main>Course: {course?.id}</main>;
}
