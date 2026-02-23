import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(1, "El título del proyecto es obligatorio")
    .max(20, "El título no puede tener más de 20 caracteres"),
  description: z.string().optional(),
});

export type CreatedProjectSchema = z.infer<typeof createProjectSchema>;
