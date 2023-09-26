import React from "react";

import { Skeleton } from "@/shared/components/skeleton";

export const FormSkeleton = () => {
  return (
    <>
      <div className="flex gap-4 justify-start ">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-48" />
      </div>
      <Skeleton className="h-10 w-96" />
      <Skeleton className="h-10 w-96" />
      <Skeleton className="h-10 w-96" />
      <Skeleton className="h-10 w-96" />
    </>
  );
};
