import { ResetPasswordForm } from "@/features/auth/components";
import { ShopLayout } from "@/features/shop";

export default function ResetPasswordPage() {
  return (
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "flex flex-col items-center gap-6 justify-center grow",
      }}
    >
      <ResetPasswordForm />
    </ShopLayout>
  );
}
