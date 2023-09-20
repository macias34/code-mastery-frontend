import { ShopLayout } from "@/shop";
import { useUser } from "@/user";

export default function MyCoursesPage() {
  const { userData } = useUser();

  console.log(userData);

  return <ShopLayout>My courses </ShopLayout>;
}
