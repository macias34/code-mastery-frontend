import { Skeleton } from "@/shared/components/skeleton";

export const ComboboxLoader = () => {
  return (
    <Skeleton className="flex px-3 text-sm items-center w-[200px] h-10 border-secondary-foreground border">
      Loading categories ...
    </Skeleton>
  );
};
