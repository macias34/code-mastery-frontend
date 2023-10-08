import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, InputWithLabel, Spinner } from "@/shared/components";
import { type PropsWithClassname } from "@/shared/types";

import { useCreateChapter, useEditChapter } from "../../api";
import {
  useChapterFormMutationOptions,
  useGetPathnameCourse,
} from "../../hooks";
import { type ChapterDto } from "../../types";
import { ManageCard } from "./manage-card";

const ChapterFormSchema = z.object({
  title: z
    .string()
    .min(3, "Chapter title should be at least 3 characters")
    .max(20, "Chapter title should be 20 characters maximum"),
});

type ChapterFormData = z.infer<typeof ChapterFormSchema>;

export type ChapterFormVariant = "create" | "edit";

interface ChapterFormProps extends PropsWithClassname {
  setShowChapterForm: Dispatch<SetStateAction<boolean>>;
  variant: ChapterFormVariant;
  chapter?: ChapterDto;
}

export const ChapterForm: FC<ChapterFormProps> = ({
  setShowChapterForm,
  variant,
  chapter,
}) => {
  const { mutate: createChapter, isLoading: isCreateChapterLoading } =
    useCreateChapter();
  const { mutate: editChapter, isLoading: isEditChapterLoading } =
    useEditChapter();

  const isLoading = isCreateChapterLoading || isEditChapterLoading;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChapterFormData>({
    resolver: zodResolver(ChapterFormSchema),
    mode: "onBlur",
    defaultValues: {
      title: chapter?.title ?? "",
    },
  });

  const title = watch("title");
  const { data: course } = useGetPathnameCourse();
  const chapterId = chapter?.id ?? -1;
  const courseId = course?.id ?? -1;

  const chapterFormMutationOptions = useChapterFormMutationOptions({
    setShowChapterForm,
    variant,
  });

  const cardTitle = variant === "create" ? "Create chapter" : "Edit chapter";

  const onSubmit = () => {
    if (variant === "create") {
      createChapter({ courseId, title }, chapterFormMutationOptions);
    }
    if (variant === "edit" && chapterId) {
      editChapter({ chapterId, title }, chapterFormMutationOptions);
    }
  };

  return (
    <ManageCard
      classNames={{
        container: "mt-6",
      }}
      title={cardTitle}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <InputWithLabel
          name="title"
          labelContent="Chapter title"
          input={{
            ...register("title"),
            placeholder: "Passing props between Svelte components",
          }}
          error={<ErrorMessage errors={errors} name="title" />}
        />
        <div className="flex gap-2 self-end">
          <Button
            onClick={() => setShowChapterForm(false)}
            type="button"
            variant="destructive"
          >
            Cancel
          </Button>
          <Button className="w-32" variant="secondary">
            {isLoading ? <Spinner /> : cardTitle}
          </Button>
        </div>
      </form>
    </ManageCard>
  );
};
