import { Skeleton } from "@/shared/components/skeleton";

export const UserSkeleton = () => {
  return (
    <div className="flex gap-x-5">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div>
        <Skeleton className="w-20 h-4 my-1" />
        <Skeleton className="w-40 h-4 my-1" />
      </div>
      <Skeleton className="ml-auto w-20 h-10" />
    </div>
  );
};
