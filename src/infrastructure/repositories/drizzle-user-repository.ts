import { eq } from "drizzle-orm";

import type {
  CreateUserInput,
  UserRepository,
} from "@/application/ports/user-repository";

import type { User } from "@/domain/entities/user";

import { db } from "@/infrastructure/db/client";

import { users } from "@/infrastructure/db/schema/users";

export class DrizzleUserRepository
  implements UserRepository
{
  async findByEmail(
    email: string,
  ): Promise<User | null> {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return result ?? null;
  }

  async create(
    input: CreateUserInput,
  ): Promise<User> {
    await db.insert(users).values(input);

    const user = await this.findByEmail(
      input.email,
    );

    if (!user) {
      throw new Error(
        "Failed to create user",
      );
    }

    return user;
  }
}