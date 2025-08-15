"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/drizzle/db";
import { productTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const deleteProduct = actionClient
  .inputSchema(
    z.object({
      id: z.number(),
    })
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const product = await db.query.productTable.findFirst({
      where: eq(productTable.id, parsedInput.id),
    });

    if (!product) {
      throw new Error("Product not found");
    }

    try {
      await db.delete(productTable).where(eq(productTable.id, parsedInput.id));

      revalidatePath("/products");
    } catch (error) {
      throw error;
    }
  });
