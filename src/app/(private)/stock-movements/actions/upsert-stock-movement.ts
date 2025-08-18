"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/drizzle/db";
import { stockMovementsTable } from "@/drizzle/schema";
import { upsertStockMovementSchema } from "../schemas/upsert-stock-movement-schema";

import { eq } from "drizzle-orm";

export const upsertStockMovement = actionClient
  .inputSchema(upsertStockMovementSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, serverError: "Não autorizado." };
    }

    try {
      const stockMovementData = {
        quantity: parsedInput.quantity,
        movementType: parsedInput.movementType,
        movementReason: parsedInput.movementReason,
        productId: parsedInput.productId,
        userId: session.user.id,
        updatedAt: new Date(),
      };

      if (parsedInput.id) {
        // Update existing stock movement
        await db
          .update(stockMovementsTable)
          .set(stockMovementData)
          .where(eq(stockMovementsTable.id, parsedInput.id));
      } else {
        // Create new stock movement
        await db.insert(stockMovementsTable).values(stockMovementData);
      }

      revalidatePath("/stock-movements");

      return { success: true, message: "Movimentação salva com sucesso!" };
    } catch (error: any) {
      console.error("Error upserting stock movement:", error);
      return {
        success: false,
        serverError: "Erro ao salvar movimentação de estoque.",
      };
    }
  });
