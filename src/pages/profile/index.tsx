import {
  AccountDetailsChangeForm,
  InvoiceDetailsChangeForm,
  PasswordChangeForm,
  PersonalDetailsChangeForm,
} from "@/features/profile/components";
import { ShopLayout } from "@/features/shop";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/tabs";
import { withRoleAuthorization } from "@/shared/utils";

function ProfilePage() {
  return (
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "flex flex-col items-center gap-6 grow py-6",
      }}
    >
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="personalDetails">Personal Details</TabsTrigger>
          <TabsTrigger value="invoiceDetails">Invoice Details</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountDetailsChangeForm />
        </TabsContent>
        <TabsContent value="password">
          <PasswordChangeForm />
        </TabsContent>
        <TabsContent value="personalDetails">
          <PersonalDetailsChangeForm />
        </TabsContent>
        <TabsContent value="invoiceDetails">
          <InvoiceDetailsChangeForm />
        </TabsContent>
      </Tabs>
    </ShopLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(ProfilePage, {
  userRolesToExclude: [],
  redirectDestination: "/auth",
});
