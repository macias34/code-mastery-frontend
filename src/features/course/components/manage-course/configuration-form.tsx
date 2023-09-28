import React from "react";

import { Button } from "@/shared/components/button";
import { InputWithLabel } from "@/shared/components/input-with-label";

import { useGetPathnameCourse } from "../../hooks";

export const ConfigurationForm = () => {
  const { courseUseQueryResult } = useGetPathnameCourse();

  const { data: course } = courseUseQueryResult;

  return (
    <form className="flex flex-col gap-6">
      <InputWithLabel
        label={{ size: "lg" }}
        labelContent="Course name"
        name="name"
        input={{
          placeholder: "Svelte course",
        }}
      />
      <InputWithLabel
        label={{ size: "lg" }}
        labelContent="Course description"
        name="description"
        input={{
          placeholder:
            "Svelte is a bleeding edge framework with lots of new features!",
        }}
      />
      <InputWithLabel
        label={{ size: "lg" }}
        labelContent="Course instructor"
        name="instructorName"
        input={{
          placeholder: "Dawid Żmudzki",
        }}
      />
      {/* <InputWithLabel
          label={{ size: "lg" }}
          labelContent="Course categories"
          name="instructorName"
        /> */}

      <Button size="lg" className="w-max self-end">
        Save
      </Button>
    </form>
  );
};
