import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { InputWithLabel } from "@/shared/components/input-with-label";

const PersonalDetailsFormSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name should be at least 3 characters long"),
  lastName: z.string().min(3, "Last name should be at least 3 characters long"),
  postalCode: z
    .string()
    .min(2, "Postal code should be at least 2 characters long"),
  city: z.string().min(2, "City should be at least 2 characters long"),
  street: z.string().min(2, "Street should be at least 3 characters long"),
  phoneNumber: z
    .string()
    .min(2, "Phone number should be at least 2 characters long"),
});

export type PersonalDetailsFormData = z.infer<typeof PersonalDetailsFormSchema>;

export const PersonalDetailsChangeForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<PersonalDetailsFormData>({
    mode: "onBlur",
    resolver: zodResolver(PersonalDetailsFormSchema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
        <CardDescription>
          Make changes in your personal details here. Click save when you are
          done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex flex-col gap-4 w-full">
        <div className="flex gap-4 justify-between ">
          <InputWithLabel
            className="w-1/2"
            name="firstName"
            labelContent="First name"
            input={{
              type: "text",
              defaultValue: "John",
              ...register("firstName"),
            }}
            error={<ErrorMessage errors={errors} name="firstName" />}
          />
          <InputWithLabel
            className="w-1/2"
            name="lastName"
            labelContent="Last name"
            input={{
              type: "text",
              defaultValue: "Doe",
              ...register("lastName"),
            }}
            error={<ErrorMessage errors={errors} name="lastName" />}
          />
        </div>
        <InputWithLabel
          name="phoneNumber"
          labelContent="Phone Number"
          input={{
            type: "text",
            defaultValue: "607 772 121",
            ...register("phoneNumber"),
          }}
          error={<ErrorMessage errors={errors} name="phoneNumber" />}
        />
        <InputWithLabel
          name="postalCode"
          labelContent="Postal code"
          input={{
            type: "text",
            defaultValue: "10001",
            ...register("postalCode"),
          }}
          error={<ErrorMessage errors={errors} name="postalCode" />}
        />
        <InputWithLabel
          name="city"
          labelContent="City"
          input={{
            type: "text",
            defaultValue: "New York",
            ...register("city"),
          }}
          error={<ErrorMessage errors={errors} name="city" />}
        />
        <InputWithLabel
          name="street"
          labelContent="Street"
          input={{
            type: "text",
            defaultValue: "Wall Street",
            ...register("street"),
          }}
          error={<ErrorMessage errors={errors} name="street" />}
        />
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};
