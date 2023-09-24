import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdateUser } from "@/features/profile/api";
import { useUser } from "@/features/user";
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
import { Spinner } from "@/shared/components/spinner";

const InvoiceDetailsFormSchema = z.object({
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
  nip: z.string().optional(),
  companyName: z.string().optional(),
});

export type InvoiceDetailsFormData = z.infer<typeof InvoiceDetailsFormSchema>;

export const InvoiceDetailsChangeForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<InvoiceDetailsFormData>({
    mode: "onBlur",
    resolver: zodResolver(InvoiceDetailsFormSchema),
  });

  const { accessToken, userData } = useUser();

  const { mutate, isLoading } = useUpdateUser();

  useEffect(() => {
    reset({
      city: userData?.invoiceDetails?.city,
      firstName: userData?.invoiceDetails?.firstName,
      lastName: userData?.invoiceDetails?.lastName,
      phoneNumber: userData?.invoiceDetails?.phoneNumber,
      postalCode: userData?.invoiceDetails?.postalCode,
      street: userData?.invoiceDetails?.street,
    });
  }, [userData, reset]);

  const onSubmit = (formData: InvoiceDetailsFormData) => {
    if (userData?.id) {
      mutate({
        updateUserDto: { invoiceDetails: formData },
        accessToken,
        userId: userData.id,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>
          Make changes in your invoice details here. Click save when you are
          done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex flex-col gap-4 w-full">
        <form
          className="space-y-2 flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)} // eslint-disable-line @typescript-eslint/no-misused-promises
        >
          <div className="flex gap-4 justify-between">
            <InputWithLabel
              className="w-1/2"
              name="firstName"
              labelContent="First name"
              input={{
                type: "text",
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
              ...register("phoneNumber"),
            }}
          />
          <InputWithLabel
            name="postalCode"
            labelContent="Postal code"
            input={{
              type: "text",
              ...register("postalCode"),
            }}
            error={<ErrorMessage errors={errors} name="postalCode" />}
          />
          <InputWithLabel
            name="city"
            labelContent="City"
            input={{
              type: "text",
              ...register("city"),
            }}
            error={<ErrorMessage errors={errors} name="city" />}
          />
          <InputWithLabel
            name="street"
            labelContent="Street"
            input={{
              type: "text",
              ...register("street"),
            }}
            error={<ErrorMessage errors={errors} name="street" />}
          />
          <div className="flex gap-4 justify-between">
            <InputWithLabel
              className="w-1/2"
              name="nip"
              labelContent="NIP (Optional)"
              input={{
                type: "text",
                ...register("nip"),
              }}
              error={<ErrorMessage errors={errors} name="nip" />}
            />
            <InputWithLabel
              className="w-1/2"
              name="companyName"
              labelContent="Company name (Optional)"
              input={{
                type: "text",
                ...register("companyName"),
              }}
              error={<ErrorMessage errors={errors} name="companyName" />}
            />
          </div>
          <Button disabled={!isValid} type="submit" className="max-w-fit">
            {isLoading ? <Spinner className="h-6 w-6" /> : "Save changes"}
          </Button>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
