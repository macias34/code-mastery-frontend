import React, { type FC, type PropsWithChildren } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";
import { cn } from "@/shared/utils";

export interface ManageCardProps extends PropsWithChildren {
  title: string;
  description?: string;
  classNames?: {
    container?: string;
    children?: string;
  };
}

export const ManageCard: FC<ManageCardProps> = ({
  title,
  description,
  children,
  classNames,
}) => {
  return (
    <Card className={cn("w-full max-w-5xl my-6 h-fit", classNames?.container)}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && (
          <CardDescription className="text-base">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className={cn(classNames?.children)}>{children}</CardContent>
    </Card>
  );
};
