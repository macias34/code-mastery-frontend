import { Home, User } from "lucide-react";
import React, { Dispatch, FC, SetStateAction } from "react";

interface SignUpStepperProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export const SignUpStepper: FC<SignUpStepperProps> = ({ step, setStep }) => {
  return (
    <>
      {step === 1 && (
        <button
          type="button"
          title="Personal details"
          className="w-fit border-2 border-border p-1.5 rounded-full"
          onClick={() => setStep(0)}
        >
          <User size={20} />
        </button>
      )}

      {step === 0 && (
        <button
          type="button"
          title="Address"
          className="w-fit border-2 border-border p-1.5 rounded-full"
          onClick={() => setStep(1)}
        >
          <Home size={20} />
        </button>
      )}
    </>
  );
};
