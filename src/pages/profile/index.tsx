import { type GetServerSideProps } from "next";

import { withRoleAuthorization } from "@/features/auth";
import { ShopLayout } from "@/features/shop";

export default function ProfilePage() {
  return (
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "flex flex-col items-center gap-6 justify-center grow",
      }}
    >
      <h1>Your profile page</h1>
    </ShopLayout>
  );
}

export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  return withRoleAuthorization({ req, res });
};
