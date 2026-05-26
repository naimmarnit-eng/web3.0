import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

import { loginSchema } from "@/application/dto/auth.dto";

import { container } from "@/infrastructure/di/container";

import { authConfig } from "./auth.config";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const parsed =
          loginSchema.safeParse(
            credentials,
          );

        if (!parsed.success) {
          return null;
        }

        const user =
          await container.verifyCredentials.execute(
            parsed.data,
          );

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        };
      },
    }),
  ],
});
