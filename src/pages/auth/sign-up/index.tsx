import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

import { signUp } from "@/libs/auth";
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

const SignUpFormSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(5),
});

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

const SignUpPage = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
  });

  const { register, handleSubmit } = useForm<SignUpFormData>({
    mode: "onBlur",
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = (formData: SignUpFormData) => {
    mutate(formData);
  };

  return (
    <ShopLayout>
      <Card className="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your details below to create a new account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input {...register("username")} placeholder="Username" />
            <Input {...register("email")} placeholder="Email" type="email" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <Button className="mt-2">Sign up</Button>
          </form>
        </CardContent>
      </Card>
    </ShopLayout>
  );
};

export default SignUpPage;
