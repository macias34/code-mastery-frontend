import { useRouter } from "next/router";

import { Navbar, useGetCourse } from "@/features/course";

export default function CourseDashboardPage() {
  const router = useRouter();
  const id = Number.parseInt(router.query?.id as string);

  const { data: course, isLoading } = useGetCourse(id, {
    enabled: !!id,
  });

  if (isLoading || !course) {
    return (
      <main>
        <Navbar />
      </main>
    );
  }

  const { name } = course;

  return (
    <main>
      <Navbar courseName={name} />
    </main>
  );
}
