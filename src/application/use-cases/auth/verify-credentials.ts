import type { User } from "@/domain/entities/user";

import type { PasswordHasher } from "@/application/ports/password-hasher";

import type { UserRepository } from "@/application/ports/user-repository";

interface Input {
  email: string;
  password: string;
}

export class VerifyCredentials {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute(
    input: Input,
  ): Promise<User | null> {
    const user =
      await this.users.findByEmail(
        input.email,
      );

    if (!user) {
      return null;
    }

    const valid =
      await this.hasher.compare(
        input.password,
        user.passwordHash,
      );

    if (!valid) {
      return null;
    }

    return user;
  }
}
