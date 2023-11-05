/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable unicorn/prevent-abbreviations */
import { type InformationPageDto } from "@/features/information-page/types";
import { ShopLayout } from "@/features/shop";
import { request } from "@/shared/utils";

export default function CustomPage({
  page,
}: {
  page: InformationPageDto | null;
}) {
  return (
    <ShopLayout
      classNames={{
        root: "min-h-screen",
        children: "flex flex-col items-center gap-6 grow py-6",
      }}
    >
      {page && (
        <>
          <h1 className="text-3xl font-bold">{page.title}</h1>
          <div
            className=" max-w-none w-full"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </>
      )}
    </ShopLayout>
  );
}

export const getServerSideProps = async (ctx: { params: { slug: string } }) => {
  try {
    if (!ctx?.params?.slug) {
      throw new Error("No slug provided");
    }
    const slug = ctx.params.slug;

    const page = await request<InformationPageDto | null>(
      `/information-page/${slug}`,
    );
    return { props: { page } };
  } catch {
    // eslint-disable-next-line unicorn/no-null
    return { props: { page: null } };
  }
};
