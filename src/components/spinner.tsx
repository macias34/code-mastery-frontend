import { Loader2 } from "lucide-react";
import React, { FC } from "react";

import { cn } from "@/utils";

interface SpinnerProps {
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <Loader2 className={cn("h-4 w-4 animate-spin", className)} />;
};
