"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/drizzle/db";
import {
  productTable,
  stockMovementsTable,
  categoryTable,
} from "@/drizzle/schema";
import { eq, sql, like, and, desc, inArray } from "drizzle-orm";
import { requireActionAuth } from "@/lib/auth-utils";

const getInventorySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  query: z.string().optional().default(""),
});

export const getInventory = actionClient
  .inputSchema(getInventorySchema)
  .action(async ({ parsedInput }) => {
    const { query, page, limit } = parsedInput;

    try {
      const session = await requireActionAuth();
      const userId = session.user.id;

      const offset = (page - 1) * limit;

      const filterCondition = query
        ? like(productTable.name, `%${query}%`)
        : undefined;

      const totalItemsResult = await db
        .select({ id: productTable.id })
        .from(productTable)
        .innerJoin(
          stockMovementsTable,
          eq(productTable.id, stockMovementsTable.productId)
        )
        .innerJoin(categoryTable, eq(productTable.categoryId, categoryTable.id))
        .where(and(eq(productTable.userId, userId), filterCondition))
        .groupBy(productTable.id, categoryTable.name);

      const totalItems = totalItemsResult.length;

      const inventory = await db
        .select({
          id: productTable.id,
          name: productTable.name,
          categoryName: categoryTable.name,
          sku: productTable.sku,
          currentStock:
            sql<number>`COALESCE(SUM(CASE WHEN stock_movements.movement_type = 'in' THEN stock_movements.quantity ELSE -stock_movements.quantity END), 0)`.as(
              "current_stock"
            ),
        })
        .from(productTable)
        .innerJoin(
          stockMovementsTable,
          eq(productTable.id, stockMovementsTable.productId)
        )
        .innerJoin(categoryTable, eq(productTable.categoryId, categoryTable.id))
        .where(
          inArray(
            productTable.id,
            totalItemsResult.map((item) => item.id)
          )
        )
        .groupBy(productTable.id, categoryTable.name)
        .orderBy(desc(productTable.sku))
        .limit(limit)
        .offset(offset);

      return {
        success: true,
        inventory,
        pagination: {
          page,
          limit,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / limit),
        },
      };
    } catch (error) {
      console.error("Erro ao buscar inventário:", error);
      return { success: false, serverError: "Erro interno do servidor" };
    }
  });
