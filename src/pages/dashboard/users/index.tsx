import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import { withRoleAuthorization } from "@/features/auth";
import { ShopLayout } from "@/features/shop";
import { useUsers } from "@/features/user/api";

export default function UsersDashboard() {
  const session = useSession();

  const { data, isLoading } = useUsers({
    userFilter: {
      email: "",
      username: "",
    },
    page: 0,
  });

  console.log(data);

  return <ShopLayout>dashboard</ShopLayout>;
}

// @TODO - add role authorization
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return withRoleAuthorization({ req, res });
};
