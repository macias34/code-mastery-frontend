import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUser } from "@/features/user";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  InputWithLabel,
  Spinner,
} from "@/shared/components";

import { useCreatePage } from "../api/create-page";

const CreatePageFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title should be at least 3 characters")
    .max(20, "Title should be 20 characters maximum"),
});

export type CreatePageFormFields = z.infer<typeof CreatePageFormSchema>;

export const CreatePageDialog = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm<CreatePageFormFields>({
    mode: "onBlur",
    resolver: zodResolver(CreatePageFormSchema),
    defaultValues: { title: "" },
  });

  const { mutate, isLoading } = useCreatePage();
  const { accessToken } = useUser();
  const onSubmit = () => {
    mutate({
      accessToken,
      createPageDto: {
        title: getValues("title"),
        content: "",
        slug: "",
        id: 0,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-fit">Create new page</Button>
      </DialogTrigger>
      <DialogContent className="border-slate-700">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWithLabel
            name="title"
            labelContent="Title"
            input={{
              ...register("title"),
            }}
            error={<ErrorMessage errors={errors} name="title" />}
          />
          <Button disabled={!isValid} type="submit" className="max-w-fit mt-2">
            {isLoading ? <Spinner className="h-6 w-6" /> : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
