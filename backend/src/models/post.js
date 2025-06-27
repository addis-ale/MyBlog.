import { z } from "zod";

export const createPostSchema = z.object({
  coverImg: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  desc: z.string().optional(),
  content: z.string().min(1, { message: "Content is required" }),
});
