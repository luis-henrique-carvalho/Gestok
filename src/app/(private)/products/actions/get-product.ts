"use server";

import { z } from "zod";
import { db } from "@/drizzle/db";
import { productTable } from "@/drizzle/schema";
import { like, count, desc, and, eq } from "drizzle-orm";
import { actionClient } from "@/lib/safe-action";
import { requireActionAuth } from "@/lib/auth-utils";

const GetProductsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  searchName: z.string().optional().default(""),
});

export const getProducts = actionClient
  .inputSchema(GetProductsSchema)
  .action(async ({ parsedInput }) => {
    const { searchName, page, limit } = parsedInput;

    try {
      const session = await requireActionAuth();

      const userId = session.user.id;

      const filterCondition = searchName
        ? like(productTable.name, `%${searchName}%`)
        : undefined;

      const offset = (page - 1) * limit;

      const products = await db.query.productTable.findMany({
        where: and(filterCondition, eq(productTable.userId, userId)),
        limit,
        with: {
          category: true,
          user: {
            columns: { id: true, name: true, email: true },
          },
        },
        offset,
        orderBy: (table) => desc(table.updatedAt),
      });

      const totalCount = await db
        .select({ count: count() })
        .from(productTable)
        .where(and(filterCondition, eq(productTable.userId, userId)));

      return {
        data: products,
        success: true,
        page,
        limit,
        totalItems: totalCount[0].count,
        totalPages: Math.ceil(totalCount[0].count / limit),
        message: "Produtos buscados com sucesso!",
      };
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return {
        success: false,
        data: [],
        page,
        limit,
        totalItems: 0,
        totalPages: 0,
        message: "Ocorreu um erro ao buscar os produtos.",
      };
    }
  });
