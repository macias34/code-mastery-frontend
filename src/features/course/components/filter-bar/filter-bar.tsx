import { useFormContext } from "react-hook-form";

import { Card, Label } from "@/shared/components";
import { Input } from "@/shared/components/input";

import { type CourseFilter } from "../../types";

export const FilterBar = () => {
  const { register } = useFormContext<CourseFilter>();
  return (
    <section className="container mx-auto">
      <Card className="p-10">
        <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-start">
          <div>
            <Label htmlFor="search-title">Title</Label>
            <Input
              id="search-title"
              placeholder="Search by title"
              type="text"
              {...register("name")}
            />
          </div>
          <div>
            <Label htmlFor="min-price">Minimum Price</Label>
            <Input
              id="min-price"
              placeholder="0"
              type="number"
              {...register("minPrice", { valueAsNumber: true })}
            />
          </div>
          <div>
            <Label htmlFor="max-price">Maximum Price</Label>
            <Input
              id="max-price"
              placeholder="1000"
              type="number"
              min={0}
              {...register("maxPrice", { valueAsNumber: true })}
            />
          </div>
        </form>
      </Card>
    </section>
  );
};
