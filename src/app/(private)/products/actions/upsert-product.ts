"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/drizzle/db";
import { productTable } from "@/drizzle/schema";
import { upsertProductSchema } from "../schemas/upsert-product-schema";
import { z } from "zod";

type UpsertProductInput = z.infer<typeof upsertProductSchema>;

export const upsertProduct = actionClient
  .inputSchema(upsertProductSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { success: false, serverError: "Não autorizado." };
    }

    try {
      await db
        .insert(productTable)
        .values({
          ...parsedInput,
          categoryId: Number(parsedInput.categoryId),
          userId: session.user.id,
        })
        .onConflictDoUpdate({
          target: productTable.id,
          set: {
            ...parsedInput,
            categoryId: Number(parsedInput.categoryId),
          },
        });

      await revalidatePath("/products");

      return { success: true, message: "Produto salvo com sucesso!" };
    } catch (error: any) {
      if (error.cause?.code === "23505") {
        const constraintName = error.cause.constraint_name as string;

        const constraintMapping: Record<
          string,
          { field: keyof UpsertProductInput; message: string }
        > = {
          products_sku_index: {
            field: "sku",
            message: `O SKU '${parsedInput.sku}' já está em uso.`,
          },
          products_name_unique: {
            field: "name",
            message: `O nome '${parsedInput.name}' já está em uso.`,
          },
        };

        const mappedError = constraintMapping[constraintName];

        if (mappedError) {
          return {
            success: false,
            fieldErrors: { [mappedError.field]: mappedError.message },
          };
        }
      }

      return { success: false, serverError: "Erro ao salvar produto." };
    }
  });
