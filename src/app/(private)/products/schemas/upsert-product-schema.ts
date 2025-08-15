import z from "zod";

export const upsertProductSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string(),
  price: z.string().min(0, "Preço deve ser maior ou igual a zero"),
  sku: z.string().min(1, "SKU é obrigatório"),
  userId: z.string().optional(),
  categoryId: z.string().optional(),
});

export type UpsertProductFormData = z.infer<typeof upsertProductSchema>;
