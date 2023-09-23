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
    .min(3, "Username should be at least 3 characters long")
    .max(20, "Username should be at max 20 characters long"),
  email: z.string().email(),
  password: z.string().min(5, "Password should be at least 5 characters long"),
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
