import type { User } from "@/domain/entities/user";

export interface CreateUserInput {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
}

export interface UserRepository {
  findByEmail(
    email: string,
  ): Promise<User | null>;

  create(
    input: CreateUserInput,
  ): Promise<User>;
}