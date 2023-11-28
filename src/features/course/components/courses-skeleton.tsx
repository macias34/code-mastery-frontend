/* eslint-disable unicorn/no-new-array */
import { Skeleton } from "@/shared/components";

export const CoursesSkeleton = () => {
  return new Array(8)
    .fill(0)
    .map((_, index) => (
      <Skeleton key={`SKELETON${index}`} className="w-full h-96" />
    ));
};
