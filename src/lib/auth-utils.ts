import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";

export async function getValidSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function requireFullAuth() {
  const session = await getValidSession();

  return session;
}
