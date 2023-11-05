import Link from "next/link";

import { Button } from "@/shared/components";
import { FRONTEND_URL } from "@/shared/constants";

import { type InformationPageDto } from "../types";
import { DeletePageAlert } from "./delete-page-alert";

interface Props {
  page: InformationPageDto;
}

export const Page = ({ page }: Props) => {
  const link = `${FRONTEND_URL}/page/${page.slug}`;
  return (
    <div className="flex gap-x-5 items-center">
      <div>
        <p className="text-lg font-semibold">{page.title}</p>
        <Link href={link} className="text-muted-foreground text-sm">
          {link}
        </Link>
      </div>
      <div className="ml-auto flex justify-center gap-4 items-end ">
        <Link href={`/dashboard/pages/${page.slug}`}>
          <Button className="px-6 min-w-[100px]">Edit</Button>
        </Link>
        <DeletePageAlert pageId={page.id} />
      </div>
    </div>
  );
};
