import { VerifyCredentials } from "@/application/use-cases/auth/verify-credentials";

import { BcryptPasswordHasher } from "@/infrastructure/auth/bcrypt-password-hasher";

import { DrizzleUserRepository } from "@/infrastructure/repositories/drizzle-user-repository";

const userRepository =
  new DrizzleUserRepository();

const passwordHasher =
  new BcryptPasswordHasher();

export const container = {
  userRepository,

  passwordHasher,

  verifyCredentials:
    new VerifyCredentials(
      userRepository,
      passwordHasher,
    ),
};