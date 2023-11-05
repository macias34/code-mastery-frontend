import { useSession } from "next-auth/react";
import Link from "next/link";

import { DashboardLayout } from "@/features/dashboard";
import { UserRole } from "@/features/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/shared/components";
import { withRoleAuthorization } from "@/shared/utils";

function Dashboard() {
  const session = useSession();
  console.log(session);

  return (
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/",
          label: "Go back to shop",
        },
        pageTitle: "Dashboard",
      }}
    >
      <section className="flex flex-col items-center justify-center w-full grow">
        <div className="grid gap-10 grid-cols-4 items-center">
          <Card className="rounded-lg hover:bg-slate-900 transition">
            <Link href="/dashboard/courses">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <svg
                  className=" text-blue-500 dark:text-blue-300"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m4 6 8-4 8 4" />
                  <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
                  <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
                  <path d="M18 5v17" />
                  <path d="M6 5v17" />
                  <circle cx="12" cy="9" r="2" />
                </svg>
                <CardTitle>Courses</CardTitle>
                <CardDescription>Manage your courses here.</CardDescription>
              </CardContent>
            </Link>
          </Card>
          <Card className="rounded-lg hover:bg-slate-900 transition">
            <Link href="/dashboard/users">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <svg
                  className=" text-green-500 dark:text-green-300"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage your users here.</CardDescription>
              </CardContent>
            </Link>
          </Card>
          <Card className="rounded-lg hover:bg-slate-900 transition">
            <Link href="/dashboard/pages">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <svg
                  className=" text-yellow-500 dark:text-yellow-300"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                  <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                  <path d="M15 2v5h5" />
                </svg>
                <CardTitle>Pages</CardTitle>
                <CardDescription>Manage your pages here.</CardDescription>
              </CardContent>
            </Link>
          </Card>
          <Card className="rounded-lg hover:bg-slate-900 transition">
            <Link href="/dashboard/orders">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <svg
                  className=" text-red-500 dark:text-red-300"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="10" x2="21" y1="6" y2="6" />
                  <line x1="10" x2="21" y1="12" y2="12" />
                  <line x1="10" x2="21" y1="18" y2="18" />
                  <path d="M4 6h1v4" />
                  <path d="M4 10h2" />
                  <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                </svg>
                <CardTitle>Orders</CardTitle>
                <CardDescription>Manage your orders here.</CardDescription>
              </CardContent>
            </Link>
          </Card>
        </div>
      </section>
    </DashboardLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(Dashboard, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
