"use server";

import { db } from "@/drizzle/db";
import { actionClient } from "@/lib/safe-action";

export const getCategories = actionClient.action(async () => {
  const categories = await db.query.categoryTable.findMany();

  return categories;
});
