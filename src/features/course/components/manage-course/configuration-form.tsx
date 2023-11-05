import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import {
  Button,
  InputWithLabel,
  Label,
  Spinner,
  toast,
} from "@/shared/components";

import { useOverrideProperties, usePatchCourse } from "../../api";
import { useGetPathnameCourse, useInvalidatePathnameCourse } from "../../hooks";
import { type OverridePropertyDto, type PropertyDto } from "../../types";

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
  customProperties: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
});

type ConfigurationFormData = z.infer<typeof ConfigurationFormSchema>;

export const ConfigurationForm = () => {
  const { data: course } = useGetPathnameCourse();
  const [customProperties, setCustomProperties] = useState<
    Omit<PropertyDto, "id">[]
  >([]);

  const { invalidateCourse } = useInvalidatePathnameCourse();
  const { mutate, isLoading } = usePatchCourse();
  const { mutateAsync: mutateProperties } = useOverrideProperties();

  const addEmptyCustomProperty = () => {
    const emptyProperty: Omit<PropertyDto, "id"> = { label: "", value: "" };
    setCustomProperties((previousState) => [...previousState, emptyProperty]);
  };

  const removePreviousCustomProperty = () => {
    setValue(`customProperties.${customProperties.length - 1}.label`, "");
    setValue(`customProperties.${customProperties.length - 1}.value`, "");
    setCustomProperties((previousState) => {
      const newState = [...previousState];
      newState.pop();
      return newState;
    });
  };

  const { setValue, register, handleSubmit } = useForm<ConfigurationFormData>({
    mode: "onBlur",
    resolver: zodResolver(ConfigurationFormSchema),
  });

  const onSubmit = (formData: ConfigurationFormData) => {
    console.log(formData);
    const propertiesToCreate: OverridePropertyDto[] =
      formData.customProperties.slice(0, customProperties.length);

    mutateProperties({
      properties: propertiesToCreate,
      courseId: course?.id ?? 0,
    })
      .then(() => {
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
      })
      .catch(() => {
        toast({
          title: TOAST_ERROR_TITLE,
          description: "Course configuration hasn't been saved.",
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    if (course) {
      course.properties.forEach((property, index) => {
        const { label, value } = property;
        setValue(`customProperties.${index}.label`, label);
        setValue(`customProperties.${index}.value`, value);
      });
      setCustomProperties(course.properties);
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

      <div className="flex flex-col gap-4">
        <Label className="text-md">Custom course properties</Label>
        {customProperties.map((property, index) => (
          <div key={index} className="flex gap-4">
            <InputWithLabel
              className="flex-1"
              label={{ size: "lg" }}
              labelContent="Label"
              name={`customProperties.${index}.label`}
              input={{
                ...register(`customProperties.${index}.label`),
                placeholder: "Label",
              }}
            />
            <InputWithLabel
              className="flex-1"
              label={{ size: "lg" }}
              labelContent="Value"
              name={`customProperties.${index}.value`}
              input={{
                ...register(`customProperties.${index}.value`),
                placeholder: "Value",
              }}
            />
          </div>
        ))}
        <div className="flex gap-4">
          <Button
            className="w-fit"
            type="button"
            onClick={addEmptyCustomProperty}
          >
            Add
          </Button>
          <Button
            className="w-fit"
            type="button"
            variant="destructive"
            onClick={removePreviousCustomProperty}
          >
            Remove previous
          </Button>
        </div>
      </div>

      <Button size="lg" className="self-end w-24">
        {isLoading ? <Spinner /> : "Save"}
      </Button>
    </form>
  );
};
