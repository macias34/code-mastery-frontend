import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, InputWithLabel } from "@/shared/components";

import { ManageCard } from "./manage-card";

const CreateChapterFormSchema = z.object({
  title: z
    .string()
    .min(3, "Chapter title should be at least 3 characters")
    .max(20, "Chapter title should be 20 characters maximum"),
});

type CreateChapterFormData = z.infer<typeof CreateChapterFormSchema>;

interface CreateChapterFormProps {
  setShowCreateChapterForm: Dispatch<SetStateAction<boolean>>;
}

export const CreateChapterForm: FC<CreateChapterFormProps> = ({
  setShowCreateChapterForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChapterFormData>({
    resolver: zodResolver(CreateChapterFormSchema),
    mode: "onBlur",
  });

  const onSubmit = (formData: CreateChapterFormData) => {
    console.log(formData);
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
          <Button variant="secondary">Create chapter</Button>
        </div>
      </form>
    </ManageCard>
  );
};
