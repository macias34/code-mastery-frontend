import { GetServerSideProps } from "next";

import { withRoleAuthorization } from "@/features/auth";
import { ShopLayout } from "@/features/shop";
import { useUser } from "@/features/user";

export default function MyCoursesPage() {
  const { userData } = useUser();

  console.log(userData);

  return <ShopLayout>My courses </ShopLayout>;
}

export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  return withRoleAuthorization({ req, res });
};
