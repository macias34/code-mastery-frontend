import { ResetPasswordForm } from "@/features/auth";
import { ShopLayout } from "@/features/shop";
import { withNoRoleAuthorization } from "@/shared/utils";

function ResetPasswordPage() {
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

export default withNoRoleAuthorization(ResetPasswordPage, {
  redirectDestination: "/",
});
