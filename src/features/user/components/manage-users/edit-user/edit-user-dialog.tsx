import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components";

import { EditUserForm } from "./edit-user-form";

interface Props {
  userId: number;
}

export const EditUserDialog = ({ userId }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6 ml-auto">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change user data</DialogTitle>
          <DialogDescription>Change user data and save it.</DialogDescription>
        </DialogHeader>
        <EditUserForm userId={userId} />
      </DialogContent>
    </Dialog>
  );
};
