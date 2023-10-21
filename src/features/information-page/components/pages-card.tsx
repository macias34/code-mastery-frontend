import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
    <Card className="w-fit  mx-auto my-6">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col w-fit">
          <CardTitle className="w-fit">Information pages</CardTitle>
          <CardDescription className="w-fit">
            Explore and edit your information pages
          </CardDescription>
        </div>
        <CreatePageDialog />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        {error && <p className="text-red-500">{error.message}</p>}
        {isLoading &&
          Array.from({ length: 5 })
            .fill(0)
            .map((_, index) => <Skeleton key={index} className="w-36 h-6" />)}
        {pages &&
          pages.length > 0 &&
          pages.map((page) => <Page key={page.id} page={page} />)}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};
