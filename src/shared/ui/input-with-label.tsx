import { LabelProps } from "@radix-ui/react-label";
import { FC, ReactElement } from "react";

import { Input, InputProps } from "./input";
import { Label } from "./label";

interface InputWithLabelProps {
  name: string;
  labelContent: string;
  label?: LabelProps;
  input?: InputProps;
  error?: ReactElement | string;
}

export const InputWithLabel: FC<InputWithLabelProps> = ({
  name,
  labelContent,
  input,
  label,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} {...label}>
        {labelContent}
      </Label>
      <Input {...input} />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
