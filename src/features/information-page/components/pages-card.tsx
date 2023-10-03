import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/shared/components";

import { usePages } from "../api";
import { Page } from "./page";

export const PagesCard = () => {
  const { data: pages, isLoading } = usePages();
  return (
    <Card className="w-3/4 max-w-lg mx-auto my-6">
      <CardHeader>
        <CardTitle>Information pages</CardTitle>
        <CardDescription>
          Explore and edit your information pages
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
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
