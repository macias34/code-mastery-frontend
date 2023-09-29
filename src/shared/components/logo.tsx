import Image from "next/image";
import React, { FC } from "react";

import { cn } from "@/shared/utils";

import { PropsWithClassname } from "../types";

export const Logo: FC<PropsWithClassname> = ({ className }) => {
  return (
    <figure className={cn("relative h-6 aspect-[12/1]", className)}>
      <Image src={"/logo.png"} alt="CodeMastery logo" fill />
    </figure>
  );
};
