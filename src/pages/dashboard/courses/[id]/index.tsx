import { useRouter } from "next/router";

import { DashboardLayout } from "@/features/dashboard";

export default function CourseDashboardPage() {
  const router = useRouter();
  const id = router.query?.id as string;

  return <DashboardLayout>Course: {id}</DashboardLayout>;
}
