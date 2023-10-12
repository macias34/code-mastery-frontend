import { Loader } from "lucide-react";

import { useUser } from "@/features/user";
import { Button } from "@/shared/components";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/alert-dialog";

import { useDeletePage } from "../api";

interface Props {
  pageId: number;
}

export const DeletePageAlert = ({ pageId }: Props) => {
  const { mutate, isLoading } = useDeletePage();

  const { accessToken } = useUser();

  const handleAcceptButtonClick = () => {
    mutate({ id: pageId, accessToken });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-6 min-w-[100px]" variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this page?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAcceptButtonClick}>
            {isLoading ? <Loader className="mr-2" size={20} /> : "Yes"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
