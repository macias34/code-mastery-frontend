import { LabelProps } from "@radix-ui/react-label";
import { VariantProps } from "class-variance-authority";
import { FC, ReactElement } from "react";

import { PropsWithClassname } from "../types";
import { cn } from "../utils";
import { Input, InputProps } from "./input";
import { Label, labelVariants } from "./label";

export interface InputWithLabelProps extends PropsWithClassname {
  name: string;
  labelContent?: string;
  label?: LabelProps & VariantProps<typeof labelVariants>;
  input?: InputProps;
  error?: ReactElement | string;
}

export const InputWithLabel: FC<InputWithLabelProps> = ({
  name,
  labelContent,
  input,
  label,
  error,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={name} {...label}>
        {labelContent || label?.children}
      </Label>
      <Input {...input} />

      {error && <p className="text-red-500 text-xs pl-1">{error}</p>}
    </div>
  );
};
