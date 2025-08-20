"use server";

import { z } from "zod";
import { db } from "@/drizzle/db";
import { stockMovementsTable, productTable } from "@/drizzle/schema";
import { eq, desc, count, and } from "drizzle-orm";
import { actionClient } from "@/lib/safe-action";
import { requireActionAuth } from "@/lib/auth-utils";

const GetProductHistorySchema = z.object({
  productId: z.coerce.number().int().positive(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

export const getProductHistory = actionClient
  .inputSchema(GetProductHistorySchema)
  .action(async ({ parsedInput }) => {
    const { productId, page, limit } = parsedInput;

    try {
      const session = await requireActionAuth();
      const userId = session.user.id;

      const offset = (page - 1) * limit;

      // Verificar se o produto pertence ao usuário
      const product = await db.query.productTable.findFirst({
        where: and(
          eq(productTable.id, productId),
          eq(productTable.userId, userId)
        ),
        with: {
          category: true,
        },
      });

      if (!product) {
        return {
          success: false,
          data: null,
          message: "Produto não encontrado.",
        };
      }

      // Buscar movimentações do produto
      const movements = await db.query.stockMovementsTable.findMany({
        where: eq(stockMovementsTable.productId, productId),
        limit,
        offset,
        orderBy: (table) => desc(table.createdAt),
      });

      const totalCount = await db
        .select({ count: count() })
        .from(stockMovementsTable)
        .where(eq(stockMovementsTable.productId, productId));

      return {
        data: {
          product,
          movements,
          pagination: {
            page,
            limit,
            totalItems: totalCount[0].count,
            totalPages: Math.ceil(totalCount[0].count / limit),
          },
        },
        success: true,
        message: "Histórico buscado com sucesso!",
      };
    } catch (error) {
      console.error("Erro ao buscar histórico do produto:", error);
      return {
        success: false,
        data: null,
        message: "Ocorreu um erro ao buscar o histórico do produto.",
      };
    }
  });
