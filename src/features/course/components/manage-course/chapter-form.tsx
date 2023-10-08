import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, InputWithLabel, Spinner } from "@/shared/components";

import { useCreateChapter, useEditChapter } from "../../api";
import {
  useChapterFormMutationOptions,
  useGetPathnameCourse,
} from "../../hooks";
import { ManageCard } from "./manage-card";

const ChapterFormSchema = z.object({
  title: z
    .string()
    .min(3, "Chapter title should be at least 3 characters")
    .max(20, "Chapter title should be 20 characters maximum"),
});

type ChapterFormData = z.infer<typeof ChapterFormSchema>;

export type ChapterFormVariant = "create" | "edit";

interface ChapterFormProps {
  setShowCreateChapterForm: Dispatch<SetStateAction<boolean>>;
  variant: ChapterFormVariant;
  chapterId?: number;
}

export const ChapterForm: FC<ChapterFormProps> = ({
  setShowCreateChapterForm,
  variant,
  chapterId,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChapterFormData>({
    resolver: zodResolver(ChapterFormSchema),
    mode: "onBlur",
  });

  const title = watch("title");
  const { data: course } = useGetPathnameCourse();
  const courseId = course?.id ?? -1;

  const { mutate: createChapter, isLoading: isCreateChapterLoading } =
    useCreateChapter();
  const { mutate: editChapter, isLoading: isEditChapterLoading } =
    useEditChapter();

  const isLoading = isCreateChapterLoading || isEditChapterLoading;

  const chapterFormMutationOptions = useChapterFormMutationOptions({
    title,
    setShowCreateChapterForm,
    variant,
  });

  const onSubmit = () => {
    if (variant === "create") {
      createChapter({ courseId, title }, chapterFormMutationOptions);
    }
    if (variant === "edit" && chapterId) {
      editChapter({ chapterId, title }, chapterFormMutationOptions);
    }
  };

  return (
    <ManageCard title="New chapter">
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
            onClick={() => setShowCreateChapterForm(false)}
            type="button"
            variant="destructive"
          >
            Cancel
          </Button>
          <Button className="w-32" variant="secondary">
            {isLoading ? <Spinner /> : "Create chapter"}
          </Button>
        </div>
      </form>
    </ManageCard>
  );
};
