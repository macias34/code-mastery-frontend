import { ShopLayout } from "@/features/shop";
import { useUser } from "@/features/user";

export default function MyCoursesPage() {
  const { userData } = useUser();

  console.log(userData);

  return <ShopLayout>My courses </ShopLayout>;
}
