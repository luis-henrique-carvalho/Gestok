"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/drizzle/db";
import {
  productTable,
  stockMovementsTable,
  categoryTable,
} from "@/drizzle/schema";
import { eq, and, like, desc, count, sql, inArray } from "drizzle-orm";
import { requireActionAuth } from "@/lib/auth-utils";

const getInventorySchema = z.object({
  page: z.string().default("1"),
  limit: z.string().default("20"),
  searchName: z.string().default(""),
});

export const getInventory = actionClient
  .inputSchema(getInventorySchema)
  .action(async ({ parsedInput }) => {
    try {
      const session = await requireActionAuth();
      const userId = session.user.id;
      const pageNumber = parseInt(parsedInput.page);
      const limitNumber = parseInt(parsedInput.limit);
      const offset = (pageNumber - 1) * limitNumber;

      // Buscar produtos que têm stock movements
      const productsWithStock = await db
        .select({
          id: productTable.id,
          name: productTable.name,
          description: productTable.description,
          sku: productTable.sku,
          price: productTable.price,
          userId: productTable.userId,
          categoryId: productTable.categoryId,
          createdAt: productTable.createdAt,
          updatedAt: productTable.updatedAt,
          categoryName: categoryTable.name,
          currentStock: sql<number>`
            COALESCE(
              (
                SELECT SUM(
                  CASE
                    WHEN ${stockMovementsTable.movementType} = 'in' THEN ${stockMovementsTable.quantity}
                    WHEN ${stockMovementsTable.movementType} = 'out' THEN -${stockMovementsTable.quantity}
                  END
                )
                FROM ${stockMovementsTable}
                WHERE ${stockMovementsTable.productId} = ${productTable.id}
              ), 0
            )
          `,
        })
        .from(productTable)
        .innerJoin(
          stockMovementsTable,
          eq(stockMovementsTable.productId, productTable.id)
        )
        .leftJoin(categoryTable, eq(categoryTable.id, productTable.categoryId))
        .where(
          and(
            eq(productTable.userId, userId),
            parsedInput.searchName
              ? like(productTable.name, `%${parsedInput.searchName}%`)
              : undefined
          )
        )
        .groupBy(productTable.id, categoryTable.name)
        .orderBy(desc(productTable.updatedAt))
        .limit(limitNumber)
        .offset(offset);

      // Contar total de produtos com stock movements
      const totalCountResult = await db
        .select({ count: count() })
        .from(productTable)
        .innerJoin(
          stockMovementsTable,
          eq(stockMovementsTable.productId, productTable.id)
        )
        .where(
          and(
            eq(productTable.userId, userId),
            parsedInput.searchName
              ? like(productTable.name, `%${parsedInput.searchName}%`)
              : undefined
          )
        );

      const totalCount = totalCountResult[0].count;
      const totalPages = Math.ceil(totalCount / limitNumber);

      return {
        success: true,
        data: {
          data: productsWithStock,
          page: pageNumber,
          limit: limitNumber,
          totalPages,
          totalCount,
        },
      };
    } catch (error) {
      console.error("Erro ao buscar inventário:", error);
      return { success: false, serverError: "Erro interno do servidor" };
    }
  });
