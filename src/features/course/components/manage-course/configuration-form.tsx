import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/components/button";
import { InputWithLabel } from "@/shared/components/input-with-label";

import { useGetPathnameCourse } from "../../hooks";

const configurationFormSchema = z.object({
  name: z
    .string()
    .min(3, "Course name should be at least 3 characters")
    .max(50, "Course name should be at least 3 characters"),
  description: z.string().min(3).max(2000),
  instructorName: z.string().min(3).max(50),
});

export const ConfigurationForm = () => {
  const { courseUseQueryResult } = useGetPathnameCourse();

  const { data: course } = courseUseQueryResult;

  const {} = useForm();

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
