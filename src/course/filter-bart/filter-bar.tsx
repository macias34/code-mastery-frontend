import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { CategoriesCombobox } from "./categories-combobox";

export const FilterBar = () => {
  return (
    <div className="bg-accent  flex gap-5 py-3 px-10 flex-wrap justify-center items-center">
      <Input placeholder="Wyszukaj kursy" className="w-fit " />
      <Input placeholder="Min cena" className="w-fit " />
      <Input placeholder="Max cena" className="w-fit " />
      <Input placeholder="Nazwa instruktora" className="w-fit " />
      <CategoriesCombobox />
      <Button className="w-fit">Szukaj</Button>
    </div>
  );
};
