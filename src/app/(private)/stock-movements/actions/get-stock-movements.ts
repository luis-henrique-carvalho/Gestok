"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/drizzle/db";
import { stockMovementsTable, productTable } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

const getStockMovementsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

export const getStockMovements = actionClient
  .inputSchema(getStockMovementsSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, serverError: "Não autorizado." };
    }

    try {
      const stockMovements = await db
        .select({
          id: stockMovementsTable.id,
          quantity: stockMovementsTable.quantity,
          movementType: stockMovementsTable.movementType,
          movementReason: stockMovementsTable.movementReason,
          productId: stockMovementsTable.productId,
          userId: stockMovementsTable.userId,
          createdAt: stockMovementsTable.createdAt,
          updatedAt: stockMovementsTable.updatedAt,
          product: {
            id: productTable.id,
            name: productTable.name,
            sku: productTable.sku,
          },
        })
        .from(stockMovementsTable)
        .leftJoin(
          productTable,
          eq(stockMovementsTable.productId, productTable.id)
        )
        .where(eq(stockMovementsTable.userId, session.user.id))
        .orderBy(desc(stockMovementsTable.createdAt))
        .limit(parsedInput.limit)
        .offset(parsedInput.offset);

      const total = await db
        .select({ count: stockMovementsTable.id })
        .from(stockMovementsTable)
        .where(eq(stockMovementsTable.userId, session.user.id));

      return {
        success: true,
        data: {
          data: stockMovements,
          total: total.length,
          limit: parsedInput.limit,
          offset: parsedInput.offset,
        },
      };
    } catch (error) {
      console.error("Error getting stock movements:", error);
      return {
        success: false,
        serverError: "Erro ao buscar movimentações de estoque",
      };
    }
  });
