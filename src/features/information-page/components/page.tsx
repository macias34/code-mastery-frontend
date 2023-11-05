import Link from "next/link";

import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components";
import { FRONTEND_URL } from "@/shared/constants";

import { type InformationPageDto } from "../types";
import { DeletePageAlert } from "./delete-page-alert";

interface Props {
  page: InformationPageDto;
}

export const Page = ({ page }: Props) => {
  const link = `${FRONTEND_URL}/page/${page.slug}`;
  return (
    <Card className="transition bg-slate-950">
      <CardHeader className="flex flex-row items-center gap-1 space-y-0 group justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle> {page.title}</CardTitle>
          <CardDescription>
            <Link href={link} className="text-muted-foreground text-sm">
              {link}
            </Link>
          </CardDescription>
        </div>
        <div className="flex gap-4">
          <Link href={`/dashboard/pages/${page.slug}`}>
            <Button className="px-6 min-w-[100px]">Edit</Button>
          </Link>
          <DeletePageAlert pageId={page.id} />
        </div>
      </CardHeader>
    </Card>
  );
};
