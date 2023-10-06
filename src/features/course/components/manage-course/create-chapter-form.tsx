import { type Dispatch, type FC, type SetStateAction } from "react";

import { Button, InputWithLabel } from "@/shared/components";

import { ManageCard } from "./manage-card";

interface CreateChapterFormProps {
  showCreateChapterForm: boolean;
  setShowCreateChapterForm: Dispatch<SetStateAction<boolean>>;
}

export const CreateChapterForm: FC<CreateChapterFormProps> = ({
  showCreateChapterForm,
  setShowCreateChapterForm,
}) => {
  return (
    <ManageCard title="New chapter">
      <form className="flex flex-col gap-6">
        <InputWithLabel
          name="title"
          labelContent="Chapter title"
          input={{ placeholder: "Passing props between Svelte components" }}
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
