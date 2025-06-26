import { z } from "zod";

export const createPostSchema = z.object({
  coverImg: z.string().url({ message: "coverImg must be a valid URL" }),
  title: z.string().min(1, { message: "Title is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  desc: z.string().optional(),
  content: z.string().min(1, { message: "Content is required" }),
});
