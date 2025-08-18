"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/drizzle/db";
import { stockMovementsTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

const deleteStockMovementSchema = z.object({
  id: z.number(),
});

export const deleteStockMovement = actionClient
  .inputSchema(deleteStockMovementSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, serverError: "Não autorizado." };
    }

    try {
      const result = await db
        .delete(stockMovementsTable)
        .where(
          and(
            eq(stockMovementsTable.id, parsedInput.id),
            eq(stockMovementsTable.userId, session.user.id)
          )
        )
        .returning();

      if (result.length === 0) {
        return {
          success: false,
          serverError: "Movimentação não encontrada",
        };
      }

      revalidatePath("/stock-movements");

      return {
        success: true,
        message: "Movimentação deletada com sucesso!",
      };
    } catch (error) {
      console.error("Error deleting stock movement:", error);
      return {
        success: false,
        serverError: "Erro ao deletar movimentação de estoque",
      };
    }
  });
