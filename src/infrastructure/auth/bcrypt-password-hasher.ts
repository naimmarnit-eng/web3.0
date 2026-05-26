import bcrypt from "bcryptjs";

import type { PasswordHasher } from "@/application/ports/password-hasher";

export class BcryptPasswordHasher
  implements PasswordHasher
{
  async hash(value: string) {
    return bcrypt.hash(value, 12);
  }

  async compare(
    value: string,
    hash: string,
  ) {
    return bcrypt.compare(value, hash);
  }
}
