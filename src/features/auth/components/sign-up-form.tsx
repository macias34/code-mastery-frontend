import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FC, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/components/button";
import { Spinner } from "@/shared/components/spinner";

import { useSignUp } from "../api";
import { SignUpFormSchema } from "../utils";
import { AccountDetailsInputs } from "./account-details-inputs";
import { PersonalDetailsInputs } from "./personal-details-inputs";

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
        onSubmit={handleSubmit(onSubmit)}
      >
        {step === 0 && <AccountDetailsInputs />}
        {step === 1 && <PersonalDetailsInputs />}

        <Button type="button" onClick={switchStep} className="mt-2">
          {step === 0 && "Next step"}
          {step === 1 && "Previous step"}
        </Button>

        {step === 1 && (
          <Button
            title={isValid ? "" : "Please fill all fields correctly"}
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
