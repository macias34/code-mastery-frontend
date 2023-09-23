import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import { withRoleAuthorization } from "@/features/auth";
import { ShopLayout } from "@/features/shop";

export default function Dashboard() {
  const session = useSession();
  console.log(session);

  return <ShopLayout>dashboard</ShopLayout>;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return withRoleAuthorization({ req, res });
};
