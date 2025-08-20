"use server";

import { z } from "zod";
import { db } from "@/drizzle/db";
import { stockMovementsTable } from "@/drizzle/schema";
import { eq, desc, count } from "drizzle-orm";
import { actionClient } from "@/lib/safe-action";
import { requireActionAuth } from "@/lib/auth-utils";

const GetStockMovementsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

export const getStockMovements = actionClient
  .inputSchema(GetStockMovementsSchema)
  .action(async ({ parsedInput }) => {
    const { page, limit } = parsedInput;

    try {
      const session = await requireActionAuth();
      const userId = session.user.id;
      const offset = (page - 1) * limit;

      const stockMovements = await db.query.stockMovementsTable.findMany({
        where: eq(stockMovementsTable.userId, userId),
        limit,
        with: {
          product: true,
          user: true,
        },
        offset,
        orderBy: (table) => desc(table.createdAt),
      });

      const totalCount = await db
        .select({ count: count() })
        .from(stockMovementsTable)
        .where(eq(stockMovementsTable.userId, userId));

      return {
        stockMovements,
        success: true,
        pagination: {
          page,
          limit,
          totalItems: totalCount[0].count,
          totalPages: Math.ceil(totalCount[0].count / limit),
        },
      };
    } catch (error) {
      console.error("Erro ao buscar movimentações de estoque:", error);
      return {
        success: false,
        serverError: "Erro ao buscar movimentações de estoque.",
      };
    }
  });
