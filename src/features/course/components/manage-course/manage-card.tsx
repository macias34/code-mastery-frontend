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
  childrenClassName?: string;
}

export const ManageCard: FC<ManageCardProps> = ({
  title,
  description,
  children,
  childrenClassName,
}) => {
  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && (
          <CardDescription className="text-base">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className={cn(childrenClassName)}>{children}</CardContent>
    </Card>
  );
};
