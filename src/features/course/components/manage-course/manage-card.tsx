import React, { type FC, type PropsWithChildren } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/card";

export interface ManageCardProps extends PropsWithChildren {
  title: string;
  description?: string;
}

export const ManageCard: FC<ManageCardProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && (
          <CardDescription className="text-base">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
