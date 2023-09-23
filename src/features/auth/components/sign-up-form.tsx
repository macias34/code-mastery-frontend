import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/components/button";
import { Spinner } from "@/shared/components/spinner";

import { useSignUp } from "../api";
import { SignUpAdressDetails } from "./sign-up-adress-details";
import { SignUpPersonalDetails } from "./sign-up-personal-details";

const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(20, "Username must contain 20 characters maximum"),
  email: z.string().email(),
  password: z.string().min(5, "Password must contain at least 5 characters"),
  firstName: z.string().min(3, "First Name must contain at least 3 characters"),
  lastName: z.string().min(3, "Last Name must contain at least 3 characters"),
  postalCode: z
    .string()
    .min(2, "Postal code must contain at least 2 characters"),
  city: z.string().min(2, "City must contain at least 2 characters"),
  street: z.string().min(2, "Street must contain at least 2 characters"),
  phoneNumber: z
    .string()
    .min(2, "Phone number must contain at least 2 characters"),
});

export type SignUpFormData = z.infer<typeof SignUpFormSchema>;

interface SignUpFormProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export const SignUpForm: FC<SignUpFormProps> = ({ step, setStep }) => {
  const { mutate, isLoading } = useSignUp();

  const methods = useForm<SignUpFormData>({
    mode: "onBlur",
    resolver: zodResolver(SignUpFormSchema),
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = (formData: SignUpFormData) => {
    mutate(formData);
  };

  const switchStep = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(0);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)} // eslint-disable-line @typescript-eslint/no-misused-promises
      >
        {step === 0 && <SignUpPersonalDetails />}
        {step === 1 && <SignUpAdressDetails />}

        <Button type="button" onClick={switchStep} className="mt-2">
          {step === 0 && "Next step"}
          {step === 1 && "Previous step"}
        </Button>

        {step === 1 && (
          <Button
            title={!isValid ? "Please fill all fields correctly" : ""}
            disabled={!isValid}
            className="mt-2"
          >
            {isLoading ? <Spinner className="h-6 w-6" /> : "Sign up"}
          </Button>
        )}
      </form>
    </FormProvider>
  );
};
