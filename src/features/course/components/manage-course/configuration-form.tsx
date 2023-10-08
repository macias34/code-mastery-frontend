import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { Button, InputWithLabel, Spinner, toast } from "@/shared/components";

import { usePatchCourse } from "../../api";
import { useGetPathnameCourse, useInvalidatePathnameCourse } from "../../hooks";

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
  const { data: course } = useGetPathnameCourse();

  const { invalidateCourse } = useInvalidatePathnameCourse();
  const { mutate, isLoading } = usePatchCourse();

  const { setValue, register, handleSubmit } = useForm<ConfigurationFormData>({
    mode: "onBlur",
    resolver: zodResolver(ConfigurationFormSchema),
  });

  const onSubmit = (formData: ConfigurationFormData) => {
    mutate(formData, {
      onSuccess() {
        toast({
          title: TOAST_SUCCESS_TITLE,
          description: "Course configuration has been saved.",
        });
      },
      onError() {
        toast({
          title: TOAST_ERROR_TITLE,
          description: "Course configuration hasn't been saved.",
          variant: "destructive",
        });
      },
      async onSettled() {
        await invalidateCourse();
      },
    });
  };

  useEffect(() => {
    if (course) {
      const { name, description, instructorName } = course;
      setValue("name", name);
      setValue("description", description);
      setValue("instructorName", instructorName);
    }
  }, [course, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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

      <Button size="lg" className="self-end w-24">
        {isLoading ? <Spinner /> : "Save"}
      </Button>
    </form>
  );
};
