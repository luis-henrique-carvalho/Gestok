import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";

export async function getValidSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export const requireActionAuth = async () => {
  const session = await getValidSession();

  if (!session) {
    throw new Error("Não autorizado");
  }

  return session;
};

export async function requireFullAuth() {
  const session = await getValidSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}
