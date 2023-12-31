import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";

import { DashboardLayout, ManageCard } from "@/features/dashboard";
import { usePage, useUpdatePage } from "@/features/information-page/api";
import { UserRole, useUser } from "@/features/user";
import { ButtonWithLoader, InputWithLabel } from "@/shared/components";
import { withRoleAuthorization } from "@/shared/utils";

const InformationPageFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title should be at least 1 characters")
    .max(50, "Title should be 50 characters maximum"),
  content: z.string().min(1),
});

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [{ size: ["small", "normal", "large", "huge"] }],
    [{ align: ["", "center", "right"] }],
    [
      { color: ["#222222", "#fcba1d", "#067df7", "#ef4444", "#16a34a"] },
      { background: [] },
    ],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export type InformationPageFormData = z.infer<typeof InformationPageFormSchema>;

export function EditInformationPage() {
  const router = useRouter();
  const slug = router.query.slug as string;
  const { data: page } = usePage(slug);
  const { mutate, isLoading } = useUpdatePage();

  const { accessToken } = useUser();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<InformationPageFormData>({
    resolver: zodResolver(InformationPageFormSchema),
  });

  const content = watch("content");

  const onSubmit = (formData: InformationPageFormData) => {
    if (page?.id) {
      mutate({
        accessToken,
        pageId: page.id,
        updatePageDto: formData,
      });
    }
  };

  useEffect(() => {
    if (page) {
      setValue("title", page.title);
      setValue("content", page.content);
    }
  }, [page, setValue]);

  return (
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/dashboard/pages",
          label: "Go back to pages",
        },
        pageTitle: `Edit page ${slug}`,
      }}
      classNames={{
        container: "justify-center items-center",
      }}
    >
      <ManageCard
        title="Edit page content"
        description="Manage page title and description."
      >
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputWithLabel
            labelContent="Page title"
            name="title"
            input={{
              ...register("title"),
              className: "w-fit",
            }}
            error={<ErrorMessage errors={errors} name="title" />}
          />
          <ReactQuill
            className="w-full text-[#222] bg-slate-200 min-h-[75vh] flex flex-col"
            modules={modules}
            value={content}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onChange={(value) => setValue("content", value)}
          />
          <ButtonWithLoader className=" w-32" isLoading={isLoading}>
            Save changes
          </ButtonWithLoader>
        </form>
      </ManageCard>
    </DashboardLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(EditInformationPage, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
