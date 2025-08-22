"use server";

import { z } from "zod";
import { db } from "@/drizzle/db";
import { productTable, stockMovementsTable } from "@/drizzle/schema";
import { and, eq, sql, sum, countDistinct, desc, gte, lte } from "drizzle-orm";
import { actionClient } from "@/lib/safe-action";
import { requireActionAuth } from "@/lib/auth-utils";

const GetDashboardSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const getDashboard = actionClient
  .inputSchema(GetDashboardSchema)
  .action(async ({ parsedInput }) => {
    const { from, to } = parsedInput;
    const session = await requireActionAuth();
    const userId = session.user.id;

    try {
      // Executar todas as consultas em paralelo usando Promise.all
      const [
        totalProductsResult,
        lowStockProductsResult,
        outOfStockProductsResult,
        stockQuantityResult,
        latestStockMovementsResult,
        monthStockMovementsResult,
      ] = await Promise.all([
        // 1. Total de produtos
        db
          .select({ count: countDistinct(productTable.id) })
          .from(productTable)
          .where(eq(productTable.userId, userId)),

        // 2. Produtos com estoque baixo (< 10)
        db
          .select({
            productId: productTable.id,
            currentStock: sum(
              sql<number>`CASE
                WHEN ${stockMovementsTable.movementType} = 'in' THEN ${stockMovementsTable.quantity}
                ELSE -${stockMovementsTable.quantity}
              END`
            ).mapWith(Number),
          })
          .from(productTable)
          .innerJoin(
            stockMovementsTable,
            eq(stockMovementsTable.productId, productTable.id)
          )
          .where(eq(productTable.userId, userId))
          .groupBy(productTable.id)
          .having(({ currentStock }) => sql`${currentStock} < 10`),

        db
          .select({
            productId: productTable.id,
            currentStock: sum(
              sql<number>`CASE
                WHEN ${stockMovementsTable.movementType} = 'in' THEN ${stockMovementsTable.quantity}
                ELSE -${stockMovementsTable.quantity}
              END`
            ).mapWith(Number),
          })
          .from(productTable)
          .innerJoin(
            stockMovementsTable,
            eq(stockMovementsTable.productId, productTable.id)
          )
          .where(eq(productTable.userId, userId))
          .groupBy(productTable.id)
          .having(({ currentStock }) => sql`${currentStock} <= 0`),

        db
          .select({
            quantity: sum(
              sql<number>`CASE
                WHEN ${stockMovementsTable.movementType} = 'in' THEN ${stockMovementsTable.quantity}
                ELSE -${stockMovementsTable.quantity}
              END`
            ).mapWith(Number),
          })
          .from(stockMovementsTable)
          .leftJoin(
            productTable,
            eq(stockMovementsTable.productId, productTable.id)
          )
          .where(eq(productTable.userId, userId)),

        db.query.stockMovementsTable.findMany({
          where: eq(stockMovementsTable.userId, userId),
          limit: 10,
          with: {
            product: true,
            user: true,
          },
          orderBy: (table) => desc(table.createdAt),
        }),

        // Dados agrupados por data para o gráfico
        db
          .select({
            date: sql<string>`DATE(${stockMovementsTable.createdAt})`,
            entrada: sum(
              sql<number>`CASE WHEN ${stockMovementsTable.movementType} = 'in' THEN ${stockMovementsTable.quantity} ELSE 0 END`
            ).mapWith(Number),
            saida: sum(
              sql<number>`CASE WHEN ${stockMovementsTable.movementType} = 'out' THEN ${stockMovementsTable.quantity} ELSE 0 END`
            ).mapWith(Number),
          })
          .from(stockMovementsTable)
          .where(
            and(
              eq(stockMovementsTable.userId, userId),
              gte(stockMovementsTable.createdAt, new Date(from)),
              lte(stockMovementsTable.createdAt, new Date(to))
            )
          )
          .groupBy(sql`DATE(${stockMovementsTable.createdAt})`)
          .orderBy(sql`DATE(${stockMovementsTable.createdAt})`),
      ]);

      const totalProducts = totalProductsResult[0]?.count || 0;
      const lowStockProducts = lowStockProductsResult.length || 0;
      const outOfStockProducts = outOfStockProductsResult.length || 0;
      const stockQuantity = stockQuantityResult[0]?.quantity || 0;
      const latestStockMovements = latestStockMovementsResult;
      const monthStockMovements = monthStockMovementsResult;

      return {
        success: true,
        totalProducts,
        lowStockProducts,
        outOfStockProducts,
        stockQuantity,
        latestStockMovements,
        monthStockMovements,
      };
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
      return {
        success: false,
        serverError: "Erro interno do servidor",
      };
    }
  });
