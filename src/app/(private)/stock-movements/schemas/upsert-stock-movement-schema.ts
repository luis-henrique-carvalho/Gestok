import z from "zod";

export const upsertStockMovementSchema = z.object({
  id: z.number().optional(),
  quantity: z.number().min(1, "Quantidade deve ser maior que zero"),
  movementType: z.enum(["in", "out"]),
  movementReason: z.enum([
    "supplier_purchase",
    "customer_sale",
    "stock_replenishment",
  ]),
  productId: z.number().min(1, "Produto é obrigatório"),
  userId: z.string().optional(),
});

export type UpsertStockMovementFormData = z.infer<
  typeof upsertStockMovementSchema
>;
