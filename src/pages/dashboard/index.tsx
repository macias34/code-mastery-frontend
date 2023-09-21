import { useSession } from "next-auth/react";

import { ShopLayout } from "@/features/shop";

export default function Dashboard() {
  const session = useSession();
  console.log(session);

  return <ShopLayout>dashboard</ShopLayout>;
}
