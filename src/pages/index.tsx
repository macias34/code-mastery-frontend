import { useSession } from "next-auth/react";

import { Button } from "@/shared/ui/button";
import { ShopLayout } from "@/shop";

export default function Home() {
  const session = useSession();
  console.log(session);
  const user = session.data?.user;

  return <ShopLayout>{user && user.name}</ShopLayout>;
}
