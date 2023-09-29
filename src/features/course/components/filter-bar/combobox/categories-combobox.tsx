import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";

import { Button } from "@/shared/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/popover";
import { cn } from "@/shared/utils";

import { getAllCategories } from "../../../index";
import { ComboboxLoader } from "./combobox-loader";

export const CategoriesCombobox = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  const { data: categories, isLoading: areCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  if (areCategoriesLoading) {
    return <ComboboxLoader />;
  }

  return (
    <>
      {categories && (categories?.length ?? 0) > 0 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between border-secondary-foreground"
            >
              {selectedCategoryId
                ? categories.find(
                    (category) => category.id === selectedCategoryId,
                  )?.name
                : "All"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setSelectedCategoryId(0);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategoryId === 0 ? "opacity-100" : "opacity-0",
                    )}
                  />
                  All
                </CommandItem>
                {categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={(currentValue) => {
                      const selectedId = categories.find(
                        (category) =>
                          category.name.toLowerCase() ===
                          currentValue.toLowerCase(),
                      )?.id;
                      setSelectedCategoryId(selectedId ?? 0);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCategoryId === category.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};
