import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getUsers() {
  try {
    const users = await db.select().from(userTable);
    return users;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw new Error("Falha ao buscar usuários");
  }
}

export async function getUserById(id: string) {
  try {
    const result = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));
    return result[0] || null;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw new Error("Falha ao buscar usuário");
  }
}
