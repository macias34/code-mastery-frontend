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

const ChapterFormSchema = z.object({
  title: z
    .string()
    .min(3, "Chapter title should be at least 3 characters")
    .max(20, "Chapter title should be 20 characters maximum"),
});

type ChapterFormData = z.infer<typeof ChapterFormSchema>;

export enum ChapterFormVariant {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

interface ChapterFormProps extends PropsWithClassname {
  setShowChapterDialog: Dispatch<SetStateAction<boolean>>;
  variant: ChapterFormVariant;
  chapter?: ChapterDto;
}

export const ChapterForm: FC<ChapterFormProps> = ({
  setShowChapterDialog,
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
    setShowChapterDialog,
    variant,
  });

  const cardTitle =
    variant === ChapterFormVariant.CREATE ? "Create chapter" : "Edit chapter";

  const onSubmit = () => {
    if (variant === ChapterFormVariant.CREATE) {
      createChapter({ courseId, title }, chapterFormMutationOptions);
    }
    if (variant === ChapterFormVariant.EDIT && chapterId) {
      editChapter({ chapterId, title }, chapterFormMutationOptions);
    }
  };

  return (
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
          onClick={() => setShowChapterDialog(false)}
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
  );
};
