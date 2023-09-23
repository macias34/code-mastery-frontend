import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";

import { CategoriesCombobox } from "./combobox";

export const FilterBar = () => {
  return (
    <div className="bg-accent  flex gap-5 py-3 px-10 flex-wrap justify-center items-center ">
      <div className="flex flex-wrap justify-center items-center gap-5">
        <Input
          placeholder="Find by title"
          className="w-fit border-secondary-foreground grow"
        />
        <Input
          placeholder="Minimum price"
          className="w-fit border-secondary-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          min={0}
        />
        <Input
          placeholder="Maximum price"
          className="w-fit border-secondary-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          min={0}
        />
        <Input
          placeholder="Instuctor name"
          className="w-fit border-secondary-foreground"
        />
        <CategoriesCombobox />
      </div>

      <Button className="w-fit">Search</Button>
    </div>
  );
};
