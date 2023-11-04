import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { PersonalDetailsInputs } from "@/features/auth";
import { useUpdateUser } from "@/features/profile/api";
import { useUser } from "@/features/user";
import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { InputWithLabel } from "@/shared/components/input-with-label";
import { Spinner } from "@/shared/components/spinner";

import { resetPersonalDetailsForm } from "../utils";

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
  const methods = useForm<InvoiceDetailsFormData>({
    mode: "onBlur",
    resolver: zodResolver(InvoiceDetailsFormSchema),
  });

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = methods;

  const { accessToken, userData } = useUser();

  const { mutate, isLoading } = useUpdateUser();

  useEffect(() => {
    if (userData) {
      resetPersonalDetailsForm(reset, userData);
    }
  }, [reset, userData]);

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
    <FormProvider {...methods}>
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
          <CardDescription>
            Make changes in your invoice details here. Click save when you are
            done.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 w-full">
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <PersonalDetailsInputs />

            <div className="flex gap-2 justify-between">
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
            <Button disabled={!isValid} className="max-w-fit mt-2">
              {isLoading ? <Spinner className="h-6 w-6" /> : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};
