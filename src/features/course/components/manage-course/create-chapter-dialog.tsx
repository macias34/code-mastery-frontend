import { Plus } from "lucide-react";
import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components";

export const CreateChapterDialog = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <Dialog open={showDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setShowDialog(true)}
          variant="secondary"
          className="w-fit mt-6"
        >
          <Plus size={16} className="mr-2" /> Chapter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Create Chapter</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
