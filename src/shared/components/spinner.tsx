import { Loader2 } from "lucide-react";
import React, { FC } from "react";

import { cn } from "@/shared/utils";

interface SpinnerProps {
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <Loader2 className={cn("h-4 w-4 animate-spin", className)} />;
};
