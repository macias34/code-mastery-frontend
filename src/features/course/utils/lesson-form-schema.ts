import { z } from "zod";

const ACCEPTED_VIDEO_TYPES = new Set(["video/mp4", "video/x-m4v", "video/*"]);

export const LessonFormSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
  files: z
    .custom<FileList>()
    .refine((files) => files?.length == 1, "Video is required.")
    .refine(
      (files) => ACCEPTED_VIDEO_TYPES.has(files?.[0]?.type ?? ""),
      ".mp4 and other video files are accepted.",
    ),
});
