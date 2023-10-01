import { ShopLayout } from "@/features/shop";
import { Spinner } from "@/shared/components";

export const DefaultLoadingElement = () => {
  return (
    <ShopLayout>
      <Spinner className="absolute top-1/2 left-1/2 h-8 w-8" />
    </ShopLayout>
  );
};
