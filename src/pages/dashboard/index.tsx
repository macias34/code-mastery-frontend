import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import { withRoleAuthorization } from "@/features/auth";
import { DashboardLayout } from "@/features/dashboard";

export default function Dashboard() {
  const session = useSession();
  console.log(session);

  return <DashboardLayout>dashboard</DashboardLayout>;
}

// @TODO - add role authorization

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return withRoleAuthorization({ req, res });
};
