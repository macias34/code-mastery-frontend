import { useRouter } from "next/router";

import { Aside, type LinkItem, Navbar, useGetCourse } from "@/features/course";

export default function CourseDashboardPage() {
  const { query } = useRouter();
  const id = Number.parseInt(query?.id as string);

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

  const pathname = `/dashboard/courses/${id}`;

  const linkGroups: LinkItem[] = [
    {
      children: "Content",
      href: pathname + "/content",
    },
    {
      children: "Students",
      href: pathname + "/students",
    },
    {
      children: "Pricing",
      href: pathname + "/pricing",
    },
  ];

  const { name } = course;

  return (
    <main className="flex flex-col">
      <Navbar courseName={name} />
      <div className="container py-6 max-w-7xl">
        <Aside linkItems={linkGroups} />
      </div>
    </main>
  );
}
