import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getUsers() {
  try {
    const users = await db.select().from(user);
    return users;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw new Error("Falha ao buscar usuários");
  }
}

export async function getUserById(id: string) {
  try {
    const result = await db.select().from(user).where(eq(user.id, id));
    return result[0] || null;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw new Error("Falha ao buscar usuário");
  }
}
