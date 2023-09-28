import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/components/button";
import { InputWithLabel } from "@/shared/components/input-with-label";

import { useGetPathnameCourse } from "../../hooks";

const ConfigurationFormSchema = z.object({
  name: z
    .string()
    .min(3, "Course name should be at least 3 characters")
    .max(50, "Course name should be 50 characters maximum"),
  description: z
    .string()
    .min(3, "Course description should be at least 3 characters")
    .max(50, "Course description should be 50 characters maximum"),
  instructorName: z
    .string()
    .min(3, "Instructor name should be at least 3 characters")
    .max(50, "Instructor name should be 50 characters maximum"),
});

type ConfigurationFormData = z.infer<typeof ConfigurationFormSchema>;

export const ConfigurationForm = () => {
  const { courseUseQueryResult } = useGetPathnameCourse();

  const { data: course } = courseUseQueryResult;

  const { setValue, register, handleSubmit } = useForm<ConfigurationFormData>({
    mode: "onBlur",
    resolver: zodResolver(ConfigurationFormSchema),
  });

  const onSubmit = (formData: ConfigurationFormData) => {};

  useEffect(() => {
    if (course) {
      const { name, description, instructorName } = course;
      setValue("name", name);
      setValue("description", description);
      setValue("instructorName", instructorName);
    }
  }, [course, setValue]);

  return (
    <form className="flex flex-col gap-6">
      <InputWithLabel
        label={{ size: "lg" }}
        labelContent="Course name"
        name="name"
        input={{ ...register("name"), placeholder: "Svelte course" }}
      />
      <InputWithLabel
        label={{ size: "lg" }}
        labelContent="Course description"
        name="description"
        input={{
          ...register("description"),
          placeholder:
            "Svelte is a bleeding edge framework with lots of new features!",
        }}
      />
      <InputWithLabel
        label={{ size: "lg" }}
        labelContent="Course instructor"
        name="instructorName"
        input={{
          ...register("instructorName"),
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
