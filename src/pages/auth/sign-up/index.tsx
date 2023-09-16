import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { ShopLayout } from "@/shop";

const SignUpPage = () => {
  return (
    <ShopLayout>
      <Card className="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your details below to create a new account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input placeholder="Username" />
          <Input placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="mt-2">Sign up</Button>
        </CardContent>
      </Card>
    </ShopLayout>
  );
};

export default SignUpPage;
