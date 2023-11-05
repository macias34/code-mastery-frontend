import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/shared/components";

import { usePages } from "../api";
import { CreatePageDialog } from "./create-page-dialog";
import { Page } from "./page";

export const PagesCard = () => {
  const { data: pages, isLoading, error } = usePages();
  return (
    <Card className="w-full max-w-5xl my-6 h-fit">
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex flex-col gap-1.5 w-fit">
          <CardTitle className="text-2xl">Pages</CardTitle>
          <CardDescription className="text-base">
            Create and manage pages
          </CardDescription>
        </div>
        <CreatePageDialog />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        {error && <p className="text-red-500">{error.message}</p>}
        {isLoading &&
          Array.from({ length: 5 })
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="w-full h-16" />
            ))}
        {pages &&
          pages.length > 0 &&
          pages.map((page) => <Page key={page.id} page={page} />)}
      </CardContent>
    </Card>
  );
};
