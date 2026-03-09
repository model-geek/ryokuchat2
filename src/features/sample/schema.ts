import { z } from "zod";

export const sampleSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
});

export type SampleInput = z.infer<typeof sampleSchema>;
