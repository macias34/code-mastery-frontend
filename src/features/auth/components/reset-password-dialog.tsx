import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  ButtonWithLoader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  InputWithLabel,
} from "@/shared/components";

import { useSendResetPasswordLink } from "../api";

const SendResetPasswordFormSchema = z.object({
  email: z.string().email(),
});

export type SendResetPasswordFormData = z.infer<
  typeof SendResetPasswordFormSchema
>;

export const ResetPasswordDialog = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SendResetPasswordFormData>({
    resolver: zodResolver(SendResetPasswordFormSchema),
  });

  const { mutate, isLoading } = useSendResetPasswordLink();

  function onSubmit(data: SendResetPasswordFormData) {
    mutate(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-muted-foreground text-xs transition hover:text-primary cursor-pointer">
          Forgot password?
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            Pass your email and we will send you a link to reset your password.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col justify-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputWithLabel
            name="email"
            labelContent="Email"
            input={{
              ...register("email"),
              type: "text",
              placeholder: "Enter your email",
            }}
            error={<ErrorMessage errors={errors} name="email" />}
          />
          <ButtonWithLoader
            className="w-fit self-end"
            disabled={!isValid}
            isLoading={isLoading}
          >
            Send link
          </ButtonWithLoader>
        </form>
      </DialogContent>
    </Dialog>
  );
};
