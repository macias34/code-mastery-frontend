import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  InputWithLabel,
  Spinner,
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
        <Button variant="outline">Forgot password?</Button>
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
          <Button type="submit" className="w-fit self-end" disabled={!isValid}>
            {isLoading ? <Spinner className="h-6 w-6" /> : "Send link"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
