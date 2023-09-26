import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { type z } from "zod";

import { PersonalDetailsInputs, PersonalDetailsSchema } from "@/features/auth";
import { useUpdateUser } from "@/features/profile";
import { useUser } from "@/features/user";
import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { Spinner } from "@/shared/components/spinner";

import { FormSkeleton } from "./form-skeleton";

export type PersonalDetailsFormData = z.infer<typeof PersonalDetailsSchema>;

export const PersonalDetailsChangeForm = () => {
  const methods = useForm<PersonalDetailsFormData>({
    mode: "onBlur",
    resolver: zodResolver(PersonalDetailsSchema),
  });

  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = methods;

  const { accessToken, userData } = useUser();
  const { mutate, isLoading } = useUpdateUser();

  useEffect(() => {
    if (userData && userData.personalDetails) {
      const { city, firstName, lastName, phoneNumber, postalCode, street } =
        userData.personalDetails;

      reset({
        city,
        firstName,
        lastName,
        phoneNumber,
        postalCode,
        street,
      });
    }
  }, [userData, reset]);

  const onSubmit = (formData: PersonalDetailsFormData) => {
    if (userData?.id) {
      mutate({
        updateUserDto: { personalDetails: formData },
        accessToken,
        userId: userData.id,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>
            Make changes in your personal details here. Click save when you are
            done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 flex flex-col gap-4 w-full">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {userData?.personalDetails ? (
              <PersonalDetailsInputs />
            ) : (
              <FormSkeleton />
            )}
            <Button disabled={!isValid} type="submit" className="max-w-fit">
              {isLoading ? <Spinner className="h-6 w-6" /> : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};
