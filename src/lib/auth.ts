import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";
import { user, session, account, verification } from "@/drizzle/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      users: user,
      sessions: session,
      accounts: account,
      verifications: verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
