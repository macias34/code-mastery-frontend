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
import { Skeleton } from "@/shared/components/skeleton";
import { Spinner } from "@/shared/components/spinner";

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
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<PersonalDetailsFormData>({
    mode: "onBlur",
    resolver: zodResolver(PersonalDetailsFormSchema),
  });

  const { accessToken, userData } = useUser();

  const { mutate, isLoading } = useUpdateUser();

  useEffect(() => {
    reset({
      city: userData?.personalDetails?.city,
      firstName: userData?.personalDetails?.firstName,
      lastName: userData?.personalDetails?.lastName,
      phoneNumber: userData?.personalDetails?.phoneNumber,
      postalCode: userData?.personalDetails?.postalCode,
      street: userData?.personalDetails?.street,
    });
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
          className="space-y-2 flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)} // eslint-disable-line @typescript-eslint/no-misused-promises
        >
          {!userData?.personalDetails ? (
            <>
              <div className="flex gap-4 justify-start ">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-48" />
              </div>
              <Skeleton className="h-10 w-96" />
              <Skeleton className="h-10 w-96" />
              <Skeleton className="h-10 w-96" />
              <Skeleton className="h-10 w-96" />
            </>
          ) : (
            <>
              <div className="flex gap-4 justify-between ">
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
                error={<ErrorMessage errors={errors} name="phoneNumber" />}
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
            </>
          )}
          <Button disabled={!isValid} type="submit" className="max-w-fit">
            {isLoading ? <Spinner className="h-6 w-6" /> : "Save changes"}
          </Button>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
